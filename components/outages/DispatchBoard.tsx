"use client";

import { useMemo, useState } from "react";

import Card from "@/components/common/Card";
import {
  clearStormCalls,
  updateStormCall,
  type StormCall,
} from "@/data/outages";
import {
  CREWS,
  FEEDERS,
  INCIDENT_COLORS,
  INCIDENT_TYPES,
  STATUSES,
  type IncidentType,
} from "@/lib/outageConstants";

function addressOf(call: StormCall) {
  return [
    call.house_num,
    call.street,
    call.unit ? `Unit ${call.unit}` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function fmtTime(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DispatchBoard({
  calls,
  canEdit,
  canReset,
  onCallsChanged,
}: {
  calls: StormCall[];
  canEdit: boolean;
  canReset: boolean;
  onCallsChanged: () => void;
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [feeder, setFeeder] = useState("");
  const [completeFilter, setCompleteFilter] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = calls.slice();

    if (type) list = list.filter((c) => c.incident_type === type);
    if (status) list = list.filter((c) => c.status === status);
    if (feeder) list = list.filter((c) => c.feeder === feeder);
    if (completeFilter === "open")
      list = list.filter((c) => !c.complete);
    if (completeFilter === "complete")
      list = list.filter((c) => c.complete);

    if (search.trim()) {
      const needle = search.trim().toLowerCase();
      list = list.filter((c) => {
        const haystack = [
          c.call_num,
          c.customer_name,
          c.phone,
          addressOf(c),
          c.comments,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(needle);
      });
    }

    return list;
  }, [calls, type, status, feeder, completeFilter, search]);

  const handleFieldChange = async (
    call: StormCall,
    field: keyof StormCall,
    value: string | boolean
  ) => {
    setBusyId(call.id);

    const patch: Partial<StormCall> = { [field]: value };

    if (field === "complete") {
      patch.completed_at = value ? new Date().toISOString() : null;
      if (value && call.status !== "COMPLETE") {
        patch.status = "COMPLETE";
      }
    }

    try {
      await updateStormCall(call.id, patch);
      onCallsChanged();
    } finally {
      setBusyId(null);
    }
  };

  const handleReset = async () => {
    if (
      !confirm(
        "This clears every logged call for everyone using this board. Continue?"
      )
    ) {
      return;
    }

    await clearStormCalls();
    onCallsChanged();
  };

  return (
    <Card title="Dispatch Board">
      <div className="flex justify-between items-center -mt-2 mb-4">
        <div />
        {canReset && (
          <button
            onClick={handleReset}
            className="text-sm text-red-600 border border-red-200 rounded-lg px-3 py-1.5 hover:bg-red-50"
          >
            Clear all calls
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-6 gap-3 mb-4">
        <input
          type="text"
          placeholder="Address, name, phone, call #..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All types</option>
          {INCIDENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={feeder}
          onChange={(e) => setFeeder(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All feeders</option>
          {FEEDERS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <select
          value={completeFilter}
          onChange={(e) => setCompleteFilter(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">All</option>
          <option value="open">Open only</option>
          <option value="complete">Complete only</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-gray-400 border-b border-gray-200">
              <th className="py-2 pr-3">Call</th>
              <th className="py-2 pr-3">Received</th>
              <th className="py-2 pr-3">Type</th>
              <th className="py-2 pr-3">Address</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2 pr-3">Crew</th>
              <th className="py-2 pr-3">Feeder</th>
              <th className="py-2 pr-3">Notes</th>
              <th className="py-2 pr-3 text-center">Done</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((call) => {
              const colors =
                INCIDENT_COLORS[
                  call.incident_type as IncidentType
                ] ?? INCIDENT_COLORS.Other;
              const disabled = !canEdit || busyId === call.id;

              return (
                <tr
                  key={call.id}
                  className={`border-b border-gray-100 ${
                    call.complete ? "opacity-50" : ""
                  }`}
                >
                  <td className="py-2 pr-3 font-mono text-gray-500">
                    #{call.call_num}
                  </td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {fmtTime(call.received)}
                  </td>
                  <td className="py-2 pr-3">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
                    >
                      {call.incident_type}
                    </span>
                  </td>
                  <td className="py-2 pr-3">
                    {addressOf(call) || "—"}
                  </td>
                  <td className="py-2 pr-3">
                    <select
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                      value={call.status}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange(
                          call,
                          "status",
                          e.target.value
                        )
                      }
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-3">
                    <select
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                      value={call.crew}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange(
                          call,
                          "crew",
                          e.target.value
                        )
                      }
                    >
                      {CREWS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-3">
                    <select
                      className="rounded border border-gray-300 px-2 py-1 text-xs"
                      value={call.feeder ?? ""}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange(
                          call,
                          "feeder",
                          e.target.value
                        )
                      }
                    >
                      <option value="">—</option>
                      {FEEDERS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-3">
                    <input
                      type="text"
                      className="w-32 rounded border border-gray-300 px-2 py-1 text-xs"
                      defaultValue={call.notes ?? ""}
                      disabled={disabled}
                      onBlur={(e) =>
                        handleFieldChange(
                          call,
                          "notes",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="py-2 pr-3 text-center">
                    <input
                      type="checkbox"
                      checked={call.complete}
                      disabled={disabled}
                      onChange={(e) =>
                        handleFieldChange(
                          call,
                          "complete",
                          e.target.checked
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-10">
            No calls match the current filters.
          </p>
        )}
      </div>
    </Card>
  );
}
