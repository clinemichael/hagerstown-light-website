"use client";

import { useState } from "react";

import Card from "@/components/common/Card";
import { upsertVehInspection, type VehInspection } from "@/data/safety";
import { VEH_LEFT, VEH_RIGHT } from "@/lib/safetyConstants";
import { Field, SectionHeader, TextArea, TextInput, withDefaults } from "./fields";

const empty = {
  name: "",
  unit: "",
  mileage: "",
  date: "",
  misc_notes: "",
  operator_name: "",
  operator_signature: "",
  results: {} as Record<string, "pass" | "fail">,
};

function PfGroup({
  groups,
  side,
  results,
  onSet,
}: {
  groups: typeof VEH_LEFT;
  side: "l" | "r";
  results: Record<string, "pass" | "fail">;
  onSet: (key: string, value: "pass" | "fail") => void;
}) {
  return (
    <div className="space-y-5">
      {groups.map((g, gi) => (
        <div key={g.title}>
          <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
            {g.title}
          </p>
          <div className="space-y-1">
            {g.items.map((item, ii) => {
              const key = `veh_${side}_${gi}_${ii}`;
              const value = results[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between gap-3 text-sm border-b border-gray-100 py-1.5"
                >
                  <span className="text-gray-700">{item}</span>
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => onSet(key, "pass")}
                      className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                        value === "pass"
                          ? "bg-green-600 text-white border-green-600"
                          : "border-gray-300 text-gray-500 hover:border-green-400"
                      }`}
                    >
                      Pass
                    </button>
                    <button
                      type="button"
                      onClick={() => onSet(key, "fail")}
                      className={`px-2.5 py-1 rounded text-xs font-semibold border ${
                        value === "fail"
                          ? "bg-red-600 text-white border-red-600"
                          : "border-gray-300 text-gray-500 hover:border-red-400"
                      }`}
                    >
                      Fail
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function VehicleInspectionForm({
  editing,
  onSaved,
}: {
  editing?: VehInspection | null;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(withDefaults(empty, editing));
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setPF = (key: string, value: "pass" | "fail") => {
    setForm((f) => {
      const next = { ...f.results };
      if (next[key] === value) delete next[key];
      else next[key] = value;
      return { ...f, results: next };
    });
  };

  const failCount = Object.values(form.results).filter((v) => v === "fail").length;

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertVehInspection({ ...form, id: editing?.id });
      if (!editing) setForm({ ...empty });
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="Vehicle Inspection" />
        <div className="grid sm:grid-cols-4 gap-4">
          <Field label="Unit #">
            <TextInput value={form.unit} onChange={(v) => set("unit", v)} />
          </Field>
          <Field label="Vehicle Name">
            <TextInput value={form.name} onChange={(v) => set("name", v)} />
          </Field>
          <Field label="Mileage">
            <TextInput value={form.mileage} onChange={(v) => set("mileage", v)} />
          </Field>
          <Field label="Date">
            <TextInput type="date" value={form.date} onChange={(v) => set("date", v)} />
          </Field>
        </div>
        {failCount > 0 && (
          <p className="mt-3 text-sm font-semibold text-red-600">
            {failCount} item(s) marked Fail
          </p>
        )}
      </Card>

      <Card>
        <div className="grid sm:grid-cols-2 gap-8">
          <PfGroup groups={VEH_LEFT} side="l" results={form.results} onSet={setPF} />
          <PfGroup groups={VEH_RIGHT} side="r" results={form.results} onSet={setPF} />
        </div>
      </Card>

      <Card>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Misc Notes" full>
            <TextArea value={form.misc_notes} onChange={(v) => set("misc_notes", v)} />
          </Field>
          <Field label="Operator Printed Name">
            <TextInput value={form.operator_name} onChange={(v) => set("operator_name", v)} />
          </Field>
          <Field label="Operator Signature (type name to confirm)">
            <TextInput value={form.operator_signature} onChange={(v) => set("operator_signature", v)} />
          </Field>
        </div>
      </Card>

      <div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-blue text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : editing ? "Update Inspection" : "Save Inspection"}
        </button>
      </div>
    </div>
  );
}
