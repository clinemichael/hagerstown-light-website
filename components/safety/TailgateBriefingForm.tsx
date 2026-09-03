"use client";

import { useState } from "react";

import Card from "@/components/common/Card";
import { upsertTgBriefing, type TgBriefing } from "@/data/safety";
import {
  CREW,
  DELIVERY_POINTS,
  HAZARDS,
  LINEUPS,
  PPE,
  GLOVES,
  SAFETY_FEEDERS,
  SUBSTATIONS,
  VEHICLES,
} from "@/lib/safetyConstants";
import { CheckboxChips, Field, SectionHeader, Select, TextArea, TextInput, withDefaults } from "./fields";

const empty = {
  task_description: "",
  job_address: "",
  date_time: "",
  work_order: "",
  hospital: "MERITUS",
  emergency: "911",
  person_in_charge: "",
  crew_present: [] as string[],
  vehicles_present: [] as string[],
  hazards: [] as string[],
  work_procedures: "",
  special_precautions: "",
  substation: "",
  feeder: "",
  pole: "",
  delivery_point: "",
  recloser_disabled: false,
  hot_line_tag: false,
  ppe: [] as string[],
  work_gloves: [] as string[],
  reviewed_by: "",
  reviewed_date_time: "",
  additional_notes: "",
};

export default function TailgateBriefingForm({
  editing,
  onSaved,
}: {
  editing?: TgBriefing | null;
  onSaved: () => void;
}) {
  const [form, setForm] = useState(withDefaults(empty, editing));
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const applyLineup = (person: string) => {
    const lineup = LINEUPS[person];
    set("person_in_charge", person);
    set("crew_present", lineup ? lineup.crew : []);
    set("vehicles_present", lineup ? lineup.trucks : []);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertTgBriefing({ ...form, id: editing?.id });
      if (!editing) setForm({ ...empty });
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="Job Briefing Requirements" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Task Description" full>
            <TextArea value={form.task_description} onChange={(v) => set("task_description", v)} />
          </Field>
          <Field label="Job Address">
            <TextInput value={form.job_address} onChange={(v) => set("job_address", v)} />
          </Field>
          <Field label="Date / Time">
            <TextInput type="datetime-local" value={form.date_time} onChange={(v) => set("date_time", v)} />
          </Field>
          <Field label="Work Order #">
            <TextInput value={form.work_order} onChange={(v) => set("work_order", v)} />
          </Field>
          <Field label="Hospital">
            <TextInput value={form.hospital} onChange={(v) => set("hospital", v)} />
          </Field>
          <Field label="Emergency #">
            <TextInput value={form.emergency} onChange={(v) => set("emergency", v)} />
          </Field>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Crew &amp; Vehicle Lineup" />
        <Field label="Person In Charge">
          <Select
            value={form.person_in_charge}
            onChange={applyLineup}
            options={CREW}
            placeholder="— select person in charge —"
          />
        </Field>

        <div className="mt-4">
          <Field label="Crew Present" full>
            <CheckboxChips options={CREW} selected={form.crew_present} onChange={(v) => set("crew_present", v)} />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Vehicles Present" full>
            <CheckboxChips
              options={VEHICLES}
              selected={form.vehicles_present}
              onChange={(v) => set("vehicles_present", v)}
            />
          </Field>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Job Location" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Substation">
            <Select value={form.substation} onChange={(v) => set("substation", v)} options={SUBSTATIONS} />
          </Field>
          <Field label="Feeder">
            <Select value={form.feeder} onChange={(v) => set("feeder", v)} options={SAFETY_FEEDERS} />
          </Field>
          <Field label="Pole #">
            <TextInput value={form.pole} onChange={(v) => set("pole", v)} />
          </Field>
          <Field label="Delivery Point">
            <Select value={form.delivery_point} onChange={(v) => set("delivery_point", v)} options={DELIVERY_POINTS} />
          </Field>
        </div>

        <div className="flex gap-6 mt-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.recloser_disabled}
              onChange={(e) => set("recloser_disabled", e.target.checked)}
            />
            Recloser Disabled
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.hot_line_tag}
              onChange={(e) => set("hot_line_tag", e.target.checked)}
            />
            Hot Line Tag Applied
          </label>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Hazards, PPE &amp; Procedures" />
        <div className="space-y-4">
          <Field label="Hazards Present" full>
            <CheckboxChips options={HAZARDS} selected={form.hazards} onChange={(v) => set("hazards", v)} />
          </Field>
          <Field label="Required PPE" full>
            <CheckboxChips options={PPE} selected={form.ppe} onChange={(v) => set("ppe", v)} />
          </Field>
          <Field label="Work Gloves" full>
            <CheckboxChips options={GLOVES} selected={form.work_gloves} onChange={(v) => set("work_gloves", v)} />
          </Field>
          <Field label="Work Procedures" full>
            <TextArea value={form.work_procedures} onChange={(v) => set("work_procedures", v)} rows={3} />
          </Field>
          <Field label="Special Precautions" full>
            <TextArea value={form.special_precautions} onChange={(v) => set("special_precautions", v)} rows={2} />
          </Field>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Review" />
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Reviewed By">
            <TextInput value={form.reviewed_by} onChange={(v) => set("reviewed_by", v)} />
          </Field>
          <Field label="Reviewed Date / Time">
            <TextInput type="datetime-local" value={form.reviewed_date_time} onChange={(v) => set("reviewed_date_time", v)} />
          </Field>
          <Field label="Additional Notes" full>
            <TextArea value={form.additional_notes} onChange={(v) => set("additional_notes", v)} />
          </Field>
        </div>
      </Card>

      <div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-brand-blue text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : editing ? "Update Briefing" : "Save Briefing"}
        </button>
      </div>
    </div>
  );
}
