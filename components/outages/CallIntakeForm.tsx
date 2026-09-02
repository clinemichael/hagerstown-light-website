"use client";

import { useState } from "react";

import Card from "@/components/common/Card";
import { createStormCall, type StormCall } from "@/data/outages";
import {
  CALL_TAKERS,
  INCIDENT_COLORS,
  INCIDENT_TYPES,
  SPECIAL_CONDITIONS,
  STREETS,
  type IncidentType,
} from "@/lib/outageConstants";

type CallIntakeFormProps = {
  onLogged: (call: StormCall) => void;
};

const emptyForm = {
  callTaker: "",
  customerName: "",
  phone: "",
  houseNum: "",
  street: "",
  unit: "",
  specialCondition: "",
  comments: "",
};

export default function CallIntakeForm({
  onLogged,
}: CallIntakeFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [incidentType, setIncidentType] =
    useState<IncidentType | "">("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (!form.callTaker) {
      setError("Select a call taker.");
      return;
    }

    if (!incidentType) {
      setError("Select an incident type.");
      return;
    }

    try {
      setSaving(true);

      const call = await createStormCall({
        call_taker: form.callTaker,
        customer_name: form.customerName.trim(),
        phone: form.phone.trim(),
        house_num: form.houseNum.trim(),
        street: form.street.trim(),
        unit: form.unit.trim(),
        incident_type: incidentType,
        special_condition: form.specialCondition,
        comments: form.comments.trim(),
      });

      onLogged(call);
      setForm(emptyForm);
      setIncidentType("");
    } catch {
      setError("Could not save call — try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Log New Call">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Call Taker
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              value={form.callTaker}
              onChange={(e) =>
                setForm({ ...form, callTaker: e.target.value })
              }
            >
              <option value="">Select...</option>
              {CALL_TAKERS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Customer Name
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Jane Doe"
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Phone #
            </label>
            <input
              type="tel"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="(301) 555-0100"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              House #
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="123"
              value={form.houseNum}
              onChange={(e) =>
                setForm({ ...form, houseNum: e.target.value })
              }
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Street Name
            </label>
            <input
              type="text"
              list="outage-street-list"
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              placeholder="Start typing..."
              value={form.street}
              onChange={(e) =>
                setForm({ ...form, street: e.target.value })
              }
            />
            <datalist id="outage-street-list">
              {STREETS.map((s) => (
                <option key={s} value={s} />
              ))}
            </datalist>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
            Unit / Apt #
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Optional"
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
            Incident Type
          </label>
          <div className="flex gap-2">
            {INCIDENT_TYPES.map((type) => {
              const active = incidentType === type;
              const colors = INCIDENT_COLORS[type];

              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setIncidentType(type)}
                  className={`flex-1 rounded-lg border-2 py-2 text-sm font-semibold transition ${
                    active
                      ? `${colors.border} ${colors.bg} ${colors.text}`
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Special Condition
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              value={form.specialCondition}
              onChange={(e) =>
                setForm({
                  ...form,
                  specialCondition: e.target.value,
                })
              }
            >
              <option value="">None reported</option>
              {SPECIAL_CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Received
            </label>
            <input
              type="text"
              disabled
              value="Auto — now"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
            Comments
          </label>
          <textarea
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            rows={2}
            placeholder="Anything else the dispatcher should know"
            value={form.comments}
            onChange={(e) =>
              setForm({ ...form, comments: e.target.value })
            }
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-blue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {saving ? "Logging..." : "Log Call"}
          </button>

          {error && (
            <span className="text-sm text-red-600">{error}</span>
          )}
        </div>
      </form>
    </Card>
  );
}
