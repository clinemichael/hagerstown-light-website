"use client";

import { useEffect, useState } from "react";

import Card from "@/components/common/Card";
import { supabase } from "@/lib/supabase";
import {
  canManageOperations,
  isAdministrator,
  type PortalRole,
} from "@/lib/permissions";
import {
  getEventStart,
  getStormCalls,
  type StormCall,
} from "@/data/outages";
import { INCIDENT_TYPES } from "@/lib/outageConstants";

import CallIntakeForm from "./CallIntakeForm";
import DispatchBoard from "./DispatchBoard";
import EndOfEventPanel from "./EndOfEventPanel";
import OutageBarChart from "./OutageBarChart";

type Tab = "dashboard" | "log" | "dispatch" | "admin";

export default function OutagesPortal() {
  const [role, setRole] = useState<PortalRole>("Employee");
  const [calls, setCalls] = useState<StormCall[]>([]);
  const [eventStart, setEventStart] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [loading, setLoading] = useState(true);

  const canEdit = canManageOperations(role);
  const canAdmin = isAdministrator(role);

  const refresh = async () => {
    try {
      const [callData, start] = await Promise.all([
        getStormCalls(),
        getEventStart(),
      ]);
      setCalls(callData);
      setEventStart(start);
    } catch (error) {
      console.error("Unable to load outage data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile) {
        setRole(profile.role as PortalRole);
      }
    };

    loadRole();
    refresh();

    const poll = setInterval(refresh, 5000);
    return () => clearInterval(poll);
  }, []);

  const totalReceived = calls.length;
  const totalComplete = calls.filter((c) => c.complete).length;
  const totalRemaining = totalReceived - totalComplete;

  const byFeeder = new Map<string, { active: number; restored: number }>();
  calls.forEach((c) => {
    if (!c.feeder) return;
    const entry = byFeeder.get(c.feeder) ?? { active: 0, restored: 0 };
    if (c.complete) entry.restored++;
    else entry.active++;
    byFeeder.set(c.feeder, entry);
  });
  const feederRows = Array.from(byFeeder.entries())
    .map(([label, v]) => ({
      label,
      value: v.active + v.restored,
      colorClass: v.active > 0 ? "bg-red-500" : "bg-green-500",
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const byCrew = new Map<string, number>();
  calls.forEach((c) => {
    if (!c.crew || c.crew === "UNASSIGNED" || c.complete) return;
    byCrew.set(c.crew, (byCrew.get(c.crew) ?? 0) + 1);
  });
  const crewRows = Array.from(byCrew.entries())
    .map(([label, value]) => ({ label, value, colorClass: "bg-amber-500" }))
    .sort((a, b) => b.value - a.value);

  const tabs: { id: Tab; label: string; visible: boolean }[] = [
    { id: "dashboard", label: "Dashboard", visible: true },
    { id: "log", label: "Call Log", visible: canEdit },
    { id: "dispatch", label: "Dispatch Board", visible: true },
    { id: "admin", label: "Admin", visible: canAdmin },
  ];

  if (loading) {
    return (
      <p className="text-gray-400 py-10 text-center">
        Loading outage data...
      </p>
    );
  }

  return (
    <div>
      <div className="grid sm:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Total Incidents"
          value={totalReceived}
          detail={`${totalComplete} complete · ${totalRemaining} remaining`}
          accent="border-brand-gold"
        />
        {INCIDENT_TYPES.map((type) => {
          const forType = calls.filter((c) => c.incident_type === type);
          const complete = forType.filter((c) => c.complete).length;
          const accent =
            type === "No Power"
              ? "border-red-500"
              : type === "Partial Power"
                ? "border-amber-500"
                : "border-sky-500";
          return (
            <StatCard
              key={type}
              label={type}
              value={forType.length}
              detail={`${complete} done · ${forType.length - complete} left`}
              accent={accent}
            />
          );
        })}
      </div>

      <div className="flex gap-1 border-b border-gray-200 mb-6">
        {tabs
          .filter((t) => t.visible)
          .map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition ${
                tab === t.id
                  ? "bg-brand-blue text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {t.label}
            </button>
          ))}
      </div>

      {tab === "dashboard" && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card title="Outages by Feeder">
            <OutageBarChart rows={feederRows} />
          </Card>
          <Card title="Crew Workload">
            <OutageBarChart rows={crewRows} />
          </Card>
        </div>
      )}

      {tab === "log" && canEdit && (
        <div className="space-y-6">
          <CallIntakeForm
            onLogged={() => {
              refresh();
            }}
          />
        </div>
      )}

      {tab === "dispatch" && (
        <DispatchBoard
          calls={calls}
          canEdit={canEdit}
          canReset={canAdmin}
          onCallsChanged={refresh}
        />
      )}

      {tab === "admin" && canAdmin && (
        <EndOfEventPanel
          calls={calls}
          eventStart={eventStart}
          onEventClosed={refresh}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: number;
  detail: string;
  accent: string;
}) {
  return (
    <div className={`bg-white rounded-xl border-t-4 ${accent} border-x border-b border-gray-200 p-4`}>
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="text-3xl font-bold text-brand-dark mt-1">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{detail}</p>
    </div>
  );
}
