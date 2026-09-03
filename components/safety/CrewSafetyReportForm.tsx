"use client";

import { useState } from "react";

import Card from "@/components/common/Card";
import { upsertCrewReport, type CrewReport } from "@/data/safety";
import { CREW_SECTIONS } from "@/lib/safetyConstants";
import { CheckboxChips, Field, SectionHeader, TextArea, TextInput, withDefaults } from "./fields";

type SectionState = Record<string, { checked: string[]; other: string }>;

const emptySections: SectionState = Object.fromEntries(
  CREW_SECTIONS.map((s) => [s.key, { checked: [], other: "" }])
);

const empty = {
  wo: "",
  date: "",
  name: "",
  job_type: "",
  job_location: "",
  crew_members: "",
  truck_types: "",
  special_tools: "",
  comments: "",
  sections: emptySections,
  deficiency_comments: "",
};

export default function CrewSafetyReportForm({
  editing,
  onSaved,
}: {
  editing?: CrewReport | null;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    ...withDefaults(empty, editing),
    sections: { ...emptySections, ...(editing?.sections ?? {}) },
  });
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const setSection = (key: string, patch: Partial<{ checked: string[]; other: string }>) => {
    setForm((f) => ({
      ...f,
      sections: {
        ...f.sections,
        [key]: { ...f.sections[key], ...patch },
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertCrewReport({ ...form, id: editing?.id });
      if (!editing) setForm({ ...empty, sections: { ...emptySections } });
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="Crew Safety Report" />
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Work Order #">
            <TextInput value={form.wo} onChange={(v) => set("wo", v)} />
          </Field>
          <Field label="Date">
            <TextInput type="date" value={form.date} onChange={(v) => set("date", v)} />
          </Field>
          <Field label="Inspector Name">
            <TextInput value={form.name} onChange={(v) => set("name", v)} />
          </Field>
          <Field label="Job Type">
            <TextInput value={form.job_type} onChange={(v) => set("job_type", v)} />
          </Field>
          <Field label="Job Location">
            <TextInput value={form.job_location} onChange={(v) => set("job_location", v)} />
          </Field>
          <Field label="Truck Types">
            <TextInput value={form.truck_types} onChange={(v) => set("truck_types", v)} />
          </Field>
          <Field label="Crew Members" full>
            <TextInput value={form.crew_members} onChange={(v) => set("crew_members", v)} />
          </Field>
          <Field label="Special Tools" full>
            <TextInput value={form.special_tools} onChange={(v) => set("special_tools", v)} />
          </Field>
        </div>
      </Card>

      {CREW_SECTIONS.map((section) => (
        <Card key={section.key} title={section.title}>
          <div className="space-y-3">
            <CheckboxChips
              options={section.items}
              selected={form.sections[section.key]?.checked ?? []}
              onChange={(v) => setSection(section.key, { checked: v })}
            />
            <TextInput
              placeholder="Other / notes for this section"
              value={form.sections[section.key]?.other ?? ""}
              onChange={(v) => setSection(section.key, { other: v })}
            />
          </div>
        </Card>
      ))}

      <Card>
        <div className="grid gap-4">
          <Field label="Comments" full>
            <TextArea value={form.comments} onChange={(v) => set("comments", v)} />
          </Field>
          <Field label="Deficiency Comments" full>
            <TextArea value={form.deficiency_comments} onChange={(v) => set("deficiency_comments", v)} />
          </Field>
        </div>
      </Card>

      <div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-blue text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : editing ? "Update Report" : "Save Report"}
        </button>
      </div>
    </div>
  );
}
