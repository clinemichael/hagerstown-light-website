"use client";

import { useState } from "react";

import Card from "@/components/common/Card";
import { upsertEmpAccidentReport, type EmpAccidentReport } from "@/data/safety";
import {
  EA_BODY_PARTS,
  EA_CAUSES,
  EA_INJURY_TYPES,
  EA_PPE,
  YES_NO,
} from "@/lib/safetyConstants";
import {
  CheckboxChips,
  Field,
  SectionHeader,
  Select,
  SignOffRow,
  TextArea,
  TextInput,
} from "./fields";

const empty: Record<string, unknown> = {
  employee_name: "", employee_number: "", job_title: "", department: "",
  incident_date: "", incident_time: "", date_reported: "", supervisor_name: "", location: "",
  description: "", injury_types: [] as string[], body_parts: [] as string[],
  first_aid_given: "", medical_treatment_sought: "", treatment_facility: "",
  lost_work_time: "", return_to_work_date: "",
  witness1: "", witness2: "", equipment_involved: "",
  ppe_worn: [] as string[], contributing_factors: [] as string[], corrective_actions: "",
  employee_signature: "", employee_sign_date: "",
  supervisor_signature: "", supervisor_sign_date: "",
  supervisor_preventable: "", supervisor_assessment_comments: "",
  committee_review_date: "", committee_chairman_signature: "", committee_notes: "",
};

export default function EmployeeAccidentForm({
  editing,
  onSaved,
}: {
  editing?: EmpAccidentReport | null;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Record<string, unknown>>({ ...empty, ...editing });
  const [saving, setSaving] = useState(false);

  const s = (key: string) => (form[key] as string) ?? "";
  const arr = (key: string) => (form[key] as string[]) ?? [];
  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertEmpAccidentReport({ ...form, id: editing?.id as string | undefined });
      if (!editing) setForm({ ...empty });
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="Employee Accident Report" />
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Employee Name"><TextInput value={s("employee_name")} onChange={(v) => set("employee_name", v)} /></Field>
          <Field label="Employee #"><TextInput value={s("employee_number")} onChange={(v) => set("employee_number", v)} /></Field>
          <Field label="Job Title"><TextInput value={s("job_title")} onChange={(v) => set("job_title", v)} /></Field>
          <Field label="Department"><TextInput value={s("department")} onChange={(v) => set("department", v)} /></Field>
          <Field label="Supervisor Name"><TextInput value={s("supervisor_name")} onChange={(v) => set("supervisor_name", v)} /></Field>
          <Field label="Location"><TextInput value={s("location")} onChange={(v) => set("location", v)} /></Field>
          <Field label="Incident Date"><TextInput type="date" value={s("incident_date")} onChange={(v) => set("incident_date", v)} /></Field>
          <Field label="Incident Time"><TextInput type="time" value={s("incident_time")} onChange={(v) => set("incident_time", v)} /></Field>
          <Field label="Date Reported"><TextInput type="date" value={s("date_reported")} onChange={(v) => set("date_reported", v)} /></Field>
          <Field label="Description of Incident" full>
            <TextArea value={s("description")} onChange={(v) => set("description", v)} rows={3} />
          </Field>
        </div>
      </Card>

      <Card title="Injury">
        <div className="space-y-4">
          <Field label="Injury Type(s)" full>
            <CheckboxChips options={EA_INJURY_TYPES} selected={arr("injury_types")} onChange={(v) => set("injury_types", v)} />
          </Field>
          <Field label="Body Part(s)" full>
            <CheckboxChips options={EA_BODY_PARTS} selected={arr("body_parts")} onChange={(v) => set("body_parts", v)} />
          </Field>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <Field label="First Aid Given?"><Select value={s("first_aid_given")} onChange={(v) => set("first_aid_given", v)} options={YES_NO} /></Field>
          <Field label="Medical Treatment Sought?"><Select value={s("medical_treatment_sought")} onChange={(v) => set("medical_treatment_sought", v)} options={YES_NO} /></Field>
          <Field label="Treatment Facility"><TextInput value={s("treatment_facility")} onChange={(v) => set("treatment_facility", v)} /></Field>
          <Field label="Lost Work Time?"><Select value={s("lost_work_time")} onChange={(v) => set("lost_work_time", v)} options={YES_NO} /></Field>
          <Field label="Return to Work Date"><TextInput type="date" value={s("return_to_work_date")} onChange={(v) => set("return_to_work_date", v)} /></Field>
        </div>
      </Card>

      <Card title="Witnesses, Equipment &amp; PPE">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Witness 1"><TextInput value={s("witness1")} onChange={(v) => set("witness1", v)} /></Field>
          <Field label="Witness 2"><TextInput value={s("witness2")} onChange={(v) => set("witness2", v)} /></Field>
          <Field label="Equipment Involved" full><TextInput value={s("equipment_involved")} onChange={(v) => set("equipment_involved", v)} /></Field>
        </div>
        <div className="space-y-4 mt-4">
          <Field label="PPE Worn" full>
            <CheckboxChips options={EA_PPE} selected={arr("ppe_worn")} onChange={(v) => set("ppe_worn", v)} />
          </Field>
          <Field label="Contributing Factors" full>
            <CheckboxChips options={EA_CAUSES} selected={arr("contributing_factors")} onChange={(v) => set("contributing_factors", v)} />
          </Field>
          <Field label="Corrective Actions" full>
            <TextArea value={s("corrective_actions")} onChange={(v) => set("corrective_actions", v)} />
          </Field>
        </div>
      </Card>

      <Card title="Employee Sign-Off">
        <SignOffRow
          signatureLabel="Employee Signature"
          signature={s("employee_signature")}
          onSignature={(v) => set("employee_signature", v)}
          date={s("employee_sign_date")}
          onDate={(v) => set("employee_sign_date", v)}
        />
      </Card>

      <Card title="Supervisor Assessment">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Preventable?"><Select value={s("supervisor_preventable")} onChange={(v) => set("supervisor_preventable", v)} options={["Yes", "No", "Undetermined"]} /></Field>
          <Field label="Assessment Comments" full><TextArea value={s("supervisor_assessment_comments")} onChange={(v) => set("supervisor_assessment_comments", v)} /></Field>
        </div>
        <div className="mt-4">
          <SignOffRow
            signatureLabel="Supervisor Signature"
            signature={s("supervisor_signature")}
            onSignature={(v) => set("supervisor_signature", v)}
            date={s("supervisor_sign_date")}
            onDate={(v) => set("supervisor_sign_date", v)}
          />
        </div>
      </Card>

      <Card title="Safety Committee Review">
        <Field label="Committee Notes" full><TextArea value={s("committee_notes")} onChange={(v) => set("committee_notes", v)} /></Field>
        <div className="mt-4">
          <SignOffRow
            signatureLabel="Committee Chairman Signature"
            signature={s("committee_chairman_signature")}
            onSignature={(v) => set("committee_chairman_signature", v)}
            dateLabel="Committee Review Date"
            date={s("committee_review_date")}
            onDate={(v) => set("committee_review_date", v)}
          />
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
