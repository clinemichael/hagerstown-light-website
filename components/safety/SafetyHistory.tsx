"use client";

import { useMemo, useState } from "react";

import Card from "@/components/common/Card";
import type { HistoryRecord, SafetyFormType } from "@/data/safety";

const TYPE_LABELS: Record<SafetyFormType, string> = {
  tailgate: "Tailgate Briefing",
  vehicle: "Vehicle Inspection",
  crew: "Crew Safety Report",
  vehaccident: "Vehicle Accident",
  empaccident: "Employee Accident",
};

const TYPE_COLORS: Record<SafetyFormType, string> = {
  tailgate: "bg-sky-100 text-sky-700",
  vehicle: "bg-emerald-100 text-emerald-700",
  crew: "bg-amber-100 text-amber-700",
  vehaccident: "bg-red-100 text-red-700",
  empaccident: "bg-purple-100 text-purple-700",
};

function titleFor(item: HistoryRecord): string {
  const r = item.record;
  switch (item.type) {
    case "tailgate":
      return (r.job_address as string) || (r.task_description as string) || "Untitled briefing";
    case "vehicle":
      return r.unit ? `Unit #${r.unit}${r.name ? ` — ${r.name}` : ""}` : "Vehicle inspection";
    case "crew":
      return (r.job_location as string) || (r.name as string) || "Untitled safety report";
    case "vehaccident":
      return (r.location as string) || (r.driver_name as string) || "Untitled vehicle accident report";
    case "empaccident":
      return (r.employee_name as string) || (r.location as string) || "Untitled employee accident report";
  }
}

function subtitleFor(item: HistoryRecord): string {
  const r = item.record;
  switch (item.type) {
    case "tailgate":
      return `In charge: ${r.person_in_charge || "—"} · WO ${r.work_order || "—"}`;
    case "vehicle": {
      const results = (r.results as Record<string, string>) || {};
      const fails = Object.values(results).filter((v) => v === "fail").length;
      return `${r.date || ""} · Operator: ${r.operator_name || "—"}${fails ? ` · ${fails} item(s) failed` : ""}`;
    }
    case "crew":
      return `${r.date || ""} · WO ${r.wo || "—"} · ${r.job_type || ""}`;
    case "vehaccident":
      return `${r.accident_date || ""} · Driver: ${r.driver_name || "—"} · Vehicle #${r.city_vehicle_no || "—"}`;
    case "empaccident":
      return `${r.incident_date || ""} · ${r.department || ""} · Supervisor: ${r.supervisor_name || "—"}`;
  }
}

export default function SafetyHistory({
  records,
  onSelect,
}: {
  records: HistoryRecord[];
  onSelect: (item: HistoryRecord) => void;
}) {
  const [filter, setFilter] = useState<SafetyFormType | "">("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = records;
    if (filter) list = list.filter((r) => r.type === filter);
    if (search.trim()) {
      const needle = search.trim().toLowerCase();
      list = list.filter((r) =>
        `${titleFor(r)} ${subtitleFor(r)}`.toLowerCase().includes(needle)
      );
    }
    return list;
  }, [records, filter, search]);

  return (
    <Card title="History">
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as SafetyFormType | "")}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All form types</option>
          {Object.entries(TYPE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="divide-y divide-gray-100">
        {filtered.map((item) => (
          <button
            key={`${item.type}-${item.record.id}`}
            onClick={() => onSelect(item)}
            className="w-full text-left py-3 flex items-center justify-between gap-3 hover:bg-gray-50 px-2 -mx-2 rounded-lg"
          >
            <div>
              <p className="font-medium text-brand-dark">{titleFor(item)}</p>
              <p className="text-sm text-gray-500">{subtitleFor(item)}</p>
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${TYPE_COLORS[item.type]}`}
            >
              {TYPE_LABELS[item.type]}
            </span>
          </button>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            No records match the current filters.
          </p>
        )}
      </div>
    </Card>
  );
}
