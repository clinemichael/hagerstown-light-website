"use client";

import { useEffect, useState } from "react";
import { Zap, AlertTriangle, Users, CloudSun } from "lucide-react";

import Card from "@/components/common/Card";
import { getStormCalls } from "@/data/outages";
import { getCrews } from "@/data/crews";
import type { CurrentWeather } from "@/lib/weather";
import StatusBadge from "./StatusBadge";

type Status = "normal" | "warning" | "critical";

type StatusItem = {
  title: string;
  description: string;
  icon: typeof Zap;
  status: Status;
};

export default function OperationsStatus() {
  const [items, setItems] = useState<StatusItem[] | null>(null);

  useEffect(() => {
    const load = async () => {
      const [calls, crews, weatherRes] = await Promise.allSettled([
        getStormCalls(),
        getCrews(),
        fetch("/api/weather").then((r) =>
          r.ok ? (r.json() as Promise<CurrentWeather>) : null
        ),
      ]);

      const openCalls =
        calls.status === "fulfilled"
          ? calls.value.filter((c) => !c.complete)
          : [];
      const noPowerOpen = openCalls.filter(
        (c) => c.incident_type === "No Power"
      ).length;

      const systemStatus: Status =
        noPowerOpen > 0 ? "critical" : openCalls.length > 0 ? "warning" : "normal";

      const crewList = crews.status === "fulfilled" ? crews.value : [];
      const assignedCrews = crewList.filter(
        (c) => c.status === "Assigned"
      ).length;

      const weather =
        weatherRes.status === "fulfilled" ? weatherRes.value : null;

      setItems([
        {
          title: "System Status",
          description:
            systemStatus === "normal"
              ? "Electric system operating normally"
              : systemStatus === "warning"
                ? `${openCalls.length} open outage call(s)`
                : `${noPowerOpen} no-power call(s) active`,
          icon: Zap,
          status: systemStatus,
        },
        {
          title: "Current Outages",
          description:
            openCalls.length === 0
              ? "No active outages reported"
              : `${openCalls.length} open outage call(s)`,
          icon: AlertTriangle,
          status: openCalls.length > 0 ? "warning" : "normal",
        },
        {
          title: "Crew Status",
          description: `${assignedCrews} of ${crewList.length} crew(s) assigned today`,
          icon: Users,
          status: "normal",
        },
        {
          title: "Weather",
          description: weather
            ? `${weather.shortForecast} — ${weather.temperature}°${weather.temperatureUnit}`
            : "Weather unavailable",
          icon: CloudSun,
          status: "normal",
        },
      ]);
    };

    load();
  }, []);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-brand-blue mb-6">
        Operations Status
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {(items ?? []).map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <Icon size={32} className="text-brand-blue mb-4" />

              <h3 className="font-semibold text-lg">{item.title}</h3>

              <p className="text-gray-600 mt-2">{item.description}</p>

              <div className="mt-4">
                <StatusBadge status={item.status} />
              </div>
            </Card>
          );
        })}

        {!items && (
          <p className="text-gray-400 col-span-4">Loading operations status...</p>
        )}
      </div>
    </section>
  );
}
