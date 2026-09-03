"use client";

import { useEffect, useState } from "react";

import {
  getAllSafetyRecords,
  type HistoryRecord,
} from "@/data/safety";

import CrewSafetyReportForm from "./CrewSafetyReportForm";
import EmployeeAccidentForm from "./EmployeeAccidentForm";
import SafetyHistory from "./SafetyHistory";
import TailgateBriefingForm from "./TailgateBriefingForm";
import VehicleAccidentForm from "./VehicleAccidentForm";
import VehicleInspectionForm from "./VehicleInspectionForm";

type Ribbon = "daily" | "incident" | "history";
type Tab = "tailgate" | "vehicle" | "crew" | "vehaccident" | "empaccident";

const DAILY_TABS: { id: Tab; label: string }[] = [
  { id: "tailgate", label: "Tailgate Briefing" },
  { id: "vehicle", label: "Vehicle Inspection" },
  { id: "crew", label: "Crew Safety Report" },
];

const INCIDENT_TABS: { id: Tab; label: string }[] = [
  { id: "vehaccident", label: "Vehicle Accident" },
  { id: "empaccident", label: "Employee Accident" },
];

export default function SafetyForms() {
  const [ribbon, setRibbon] = useState<Ribbon>("daily");
  const [tab, setTab] = useState<Tab>("tailgate");
  const [records, setRecords] = useState<HistoryRecord[]>([]);
  const [editing, setEditing] = useState<HistoryRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const data = await getAllSafetyRecords();
      setRecords(data);
    } catch (error) {
      console.error("Unable to load safety records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const openTab = (target: Tab) => {
    setEditing(null);
    setTab(target);
    setRibbon(DAILY_TABS.some((t) => t.id === target) ? "daily" : "incident");
  };

  const handleSelectHistory = (item: HistoryRecord) => {
    setEditing(item);
    setTab(item.type as Tab);
    setRibbon(DAILY_TABS.some((t) => t.id === item.type) ? "daily" : "incident");
  };

  const handleSaved = () => {
    setEditing(null);
    refresh();
  };

  const ribbonTabs = ribbon === "daily" ? DAILY_TABS : INCIDENT_TABS;

  return (
    <div className="mt-6">
      <div className="flex gap-1 border-b border-gray-200 mb-4">
        {[
          { id: "daily" as Ribbon, label: "Daily Forms" },
          { id: "incident" as Ribbon, label: "Incident Reports" },
          { id: "history" as Ribbon, label: "History" },
        ].map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setRibbon(r.id);
              if (r.id === "daily") setTab("tailgate");
              if (r.id === "incident") setTab("vehaccident");
            }}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition ${
              ribbon === r.id
                ? "bg-brand-blue text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {ribbon !== "history" && (
        <div className="flex gap-2 mb-6">
          {ribbonTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => openTab(t.id)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                tab === t.id
                  ? "bg-brand-gold/10 border-brand-gold text-brand-dark font-semibold"
                  : "border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {t.label}
            </button>
          ))}
          {editing && (
            <span className="ml-2 self-center text-xs font-semibold px-2 py-1 rounded-full bg-amber-100 text-amber-700">
              Editing existing record
            </span>
          )}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400 py-10 text-center">Loading safety records...</p>
      ) : ribbon === "history" ? (
        <SafetyHistory records={records} onSelect={handleSelectHistory} />
      ) : (
        <>
          {tab === "tailgate" && (
            <TailgateBriefingForm
              editing={editing?.type === "tailgate" ? (editing.record as never) : null}
              onSaved={handleSaved}
            />
          )}
          {tab === "vehicle" && (
            <VehicleInspectionForm
              editing={editing?.type === "vehicle" ? (editing.record as never) : null}
              onSaved={handleSaved}
            />
          )}
          {tab === "crew" && (
            <CrewSafetyReportForm
              editing={editing?.type === "crew" ? (editing.record as never) : null}
              onSaved={handleSaved}
            />
          )}
          {tab === "vehaccident" && (
            <VehicleAccidentForm
              editing={editing?.type === "vehaccident" ? (editing.record as never) : null}
              onSaved={handleSaved}
            />
          )}
          {tab === "empaccident" && (
            <EmployeeAccidentForm
              editing={editing?.type === "empaccident" ? (editing.record as never) : null}
              onSaved={handleSaved}
            />
          )}
        </>
      )}
    </div>
  );
}