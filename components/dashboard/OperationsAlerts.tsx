"use client";

import { useEffect, useState } from "react";

import { getActiveAlerts, type OperationsAlert } from "@/data/alerts";
import AlertCard from "./AlertCard";

export default function OperationsAlerts() {
  const [alerts, setAlerts] = useState<OperationsAlert[] | null>(null);

  useEffect(() => {
    getActiveAlerts()
      .then(setAlerts)
      .catch(() => setAlerts([]));
  }, []);

  if (alerts && alerts.length === 0) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-brand-blue mb-4">
        Operations Alerts
      </h2>

      <div className="space-y-3">
        {(alerts ?? []).map((alert) => (
          <AlertCard
            key={alert.id}
            title={alert.title}
            description={alert.description}
            priority={alert.priority}
          />
        ))}

        {!alerts && (
          <p className="text-gray-400 text-sm">Loading alerts...</p>
        )}
      </div>
    </section>
  );
}
