"use client";

import { useState } from "react";

import Card from "@/components/common/Card";
import { upsertVehAccidentReport, type VehAccidentReport } from "@/data/safety";
import {
  VA_CAUSES,
  VA_ILLUMINATION,
  VA_ROAD_CONDITION,
  VA_ROAD_SURFACE,
  VA_SPEED_LIMIT,
  VA_TYPE,
  VA_WEATHER,
  YES_NO,
} from "@/lib/safetyConstants";
import {
  CheckboxChips,
  FaultRow,
  Field,
  SectionHeader,
  Select,
  SignOffRow,
  TextArea,
  TextInput,
} from "./fields";

const empty: Record<string, unknown> = {
  accident_date: "", accident_time: "", driver_name: "", employee_number: "", location: "",
  city_vehicle_no: "", city_vehicle_year: "", city_vehicle_model: "", city_vehicle_make: "", city_vehicle_other_desc: "",
  other_vehicle_tag: "", other_vehicle_year: "", other_vehicle_model: "", other_vehicle_make: "", other_vehicle_other_desc: "",
  other_driver_name: "", other_driver_address: "", other_driver_phone: "",
  ins_co: "", ins_agent: "", ins_policy_no: "",
  witness1: "", witness2: "", injury1: "", injury2: "",
  city_vehicle_damage: "", other_vehicle_damage: "", property_damage: "",
  illumination: "", weather: "", accident_type: "", road_surface: "", road_condition: "", speed_limit: "",
  cause: [] as string[], driver_description: "",
  driver_role_fault: "", driver_role_preventable: "",
  police_report_by: "", citations_issued: "", other_comments: "",
  driver_signature: "", preparer_signature: "", driver_report_date: "",
  supervisor_role_fault: "", supervisor_role_preventable: "", supervisor_comments: "",
  supervisor_signature: "", supervisor_date: "", was_driver_interviewed: "",
  manager_role_fault: "", manager_role_preventable: "", manager_assessment: "",
  disciplinary_action: "", manager_signature: "", manager_date: "",
  agree_facts: "", agree_facts_explain: "", agree_role: "", agree_role_explain: "",
  review_comments: "", review_signature: "", review_date: "",
  committee_notes: "", committee_review_date: "", committee_chairman_signature: "",
};

export default function VehicleAccidentForm({
  editing,
  onSaved,
}: {
  editing?: VehAccidentReport | null;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Record<string, unknown>>({ ...empty, ...editing });
  const [saving, setSaving] = useState(false);

  const s = (key: string) => (form[key] as string) ?? "";
  const set = (key: string, value: unknown) => setForm((f) => ({ ...f, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertVehAccidentReport({ ...form, id: editing?.id as string | undefined });
      if (!editing) setForm({ ...empty });
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="Accident Information" />
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Accident Date"><TextInput type="date" value={s("accident_date")} onChange={(v) => set("accident_date", v)} /></Field>
          <Field label="Accident Time"><TextInput type="time" value={s("accident_time")} onChange={(v) => set("accident_time", v)} /></Field>
          <Field label="Location"><TextInput value={s("location")} onChange={(v) => set("location", v)} /></Field>
          <Field label="Driver Name"><TextInput value={s("driver_name")} onChange={(v) => set("driver_name", v)} /></Field>
          <Field label="Employee #"><TextInput value={s("employee_number")} onChange={(v) => set("employee_number", v)} /></Field>
        </div>
      </Card>

      <Card title="City Vehicle">
        <div className="grid sm:grid-cols-4 gap-4">
          <Field label="Vehicle #"><TextInput value={s("city_vehicle_no")} onChange={(v) => set("city_vehicle_no", v)} /></Field>
          <Field label="Year"><TextInput value={s("city_vehicle_year")} onChange={(v) => set("city_vehicle_year", v)} /></Field>
          <Field label="Make"><TextInput value={s("city_vehicle_make")} onChange={(v) => set("city_vehicle_make", v)} /></Field>
          <Field label="Model"><TextInput value={s("city_vehicle_model")} onChange={(v) => set("city_vehicle_model", v)} /></Field>
          <Field label="Other Description" full><TextInput value={s("city_vehicle_other_desc")} onChange={(v) => set("city_vehicle_other_desc", v)} /></Field>
          <Field label="Damage Description" full><TextArea value={s("city_vehicle_damage")} onChange={(v) => set("city_vehicle_damage", v)} /></Field>
        </div>
      </Card>

      <Card title="Other Vehicle &amp; Driver">
        <div className="grid sm:grid-cols-4 gap-4">
          <Field label="Tag #"><TextInput value={s("other_vehicle_tag")} onChange={(v) => set("other_vehicle_tag", v)} /></Field>
          <Field label="Year"><TextInput value={s("other_vehicle_year")} onChange={(v) => set("other_vehicle_year", v)} /></Field>
          <Field label="Make"><TextInput value={s("other_vehicle_make")} onChange={(v) => set("other_vehicle_make", v)} /></Field>
          <Field label="Model"><TextInput value={s("other_vehicle_model")} onChange={(v) => set("other_vehicle_model", v)} /></Field>
          <Field label="Other Description" full><TextInput value={s("other_vehicle_other_desc")} onChange={(v) => set("other_vehicle_other_desc", v)} /></Field>
          <Field label="Damage Description" full><TextArea value={s("other_vehicle_damage")} onChange={(v) => set("other_vehicle_damage", v)} /></Field>
          <Field label="Other Driver Name"><TextInput value={s("other_driver_name")} onChange={(v) => set("other_driver_name", v)} /></Field>
          <Field label="Other Driver Phone"><TextInput value={s("other_driver_phone")} onChange={(v) => set("other_driver_phone", v)} /></Field>
          <Field label="Other Driver Address" full><TextInput value={s("other_driver_address")} onChange={(v) => set("other_driver_address", v)} /></Field>
          <Field label="Insurance Co."><TextInput value={s("ins_co")} onChange={(v) => set("ins_co", v)} /></Field>
          <Field label="Insurance Agent"><TextInput value={s("ins_agent")} onChange={(v) => set("ins_agent", v)} /></Field>
          <Field label="Policy #"><TextInput value={s("ins_policy_no")} onChange={(v) => set("ins_policy_no", v)} /></Field>
        </div>
      </Card>

      <Card title="Witnesses, Injuries &amp; Property">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Witness 1"><TextInput value={s("witness1")} onChange={(v) => set("witness1", v)} /></Field>
          <Field label="Witness 2"><TextInput value={s("witness2")} onChange={(v) => set("witness2", v)} /></Field>
          <Field label="Injury 1"><TextInput value={s("injury1")} onChange={(v) => set("injury1", v)} /></Field>
          <Field label="Injury 2"><TextInput value={s("injury2")} onChange={(v) => set("injury2", v)} /></Field>
          <Field label="Property Damage" full><TextArea value={s("property_damage")} onChange={(v) => set("property_damage", v)} /></Field>
        </div>
      </Card>

      <Card title="Conditions &amp; Cause">
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Illumination"><Select value={s("illumination")} onChange={(v) => set("illumination", v)} options={VA_ILLUMINATION} /></Field>
          <Field label="Weather"><Select value={s("weather")} onChange={(v) => set("weather", v)} options={VA_WEATHER} /></Field>
          <Field label="Accident Type"><Select value={s("accident_type")} onChange={(v) => set("accident_type", v)} options={VA_TYPE} /></Field>
          <Field label="Road Surface"><Select value={s("road_surface")} onChange={(v) => set("road_surface", v)} options={VA_ROAD_SURFACE} /></Field>
          <Field label="Road Condition"><Select value={s("road_condition")} onChange={(v) => set("road_condition", v)} options={VA_ROAD_CONDITION} /></Field>
          <Field label="Speed Limit"><Select value={s("speed_limit")} onChange={(v) => set("speed_limit", v)} options={VA_SPEED_LIMIT} /></Field>
        </div>
        <div className="mt-4">
          <Field label="Cause" full>
            <CheckboxChips options={VA_CAUSES} selected={(form.cause as string[]) ?? []} onChange={(v) => set("cause", v)} />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Driver's Description of Accident" full>
            <TextArea value={s("driver_description")} onChange={(v) => set("driver_description", v)} rows={3} />
          </Field>
        </div>
      </Card>

      <Card title="Driver Report">
        <FaultRow
          fault={s("driver_role_fault")}
          onFault={(v) => set("driver_role_fault", v)}
          preventable={s("driver_role_preventable")}
          onPreventable={(v) => set("driver_role_preventable", v)}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Police Report By"><TextInput value={s("police_report_by")} onChange={(v) => set("police_report_by", v)} /></Field>
          <Field label="Citations Issued"><TextInput value={s("citations_issued")} onChange={(v) => set("citations_issued", v)} /></Field>
          <Field label="Other Comments" full><TextArea value={s("other_comments")} onChange={(v) => set("other_comments", v)} /></Field>
          <Field label="Preparer Signature"><TextInput value={s("preparer_signature")} onChange={(v) => set("preparer_signature", v)} /></Field>
        </div>
        <div className="mt-4">
          <SignOffRow
            signatureLabel="Driver Signature"
            signature={s("driver_signature")}
            onSignature={(v) => set("driver_signature", v)}
            dateLabel="Report Date"
            date={s("driver_report_date")}
            onDate={(v) => set("driver_report_date", v)}
          />
        </div>
      </Card>

      <Card title="Supervisor Review">
        <FaultRow
          fault={s("supervisor_role_fault")}
          onFault={(v) => set("supervisor_role_fault", v)}
          preventable={s("supervisor_role_preventable")}
          onPreventable={(v) => set("supervisor_role_preventable", v)}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Was Driver Interviewed?">
            <Select value={s("was_driver_interviewed")} onChange={(v) => set("was_driver_interviewed", v)} options={YES_NO} />
          </Field>
          <Field label="Supervisor Comments" full><TextArea value={s("supervisor_comments")} onChange={(v) => set("supervisor_comments", v)} /></Field>
        </div>
        <div className="mt-4">
          <SignOffRow
            signatureLabel="Supervisor Signature"
            signature={s("supervisor_signature")}
            onSignature={(v) => set("supervisor_signature", v)}
            date={s("supervisor_date")}
            onDate={(v) => set("supervisor_date", v)}
          />
        </div>
      </Card>

      <Card title="Manager Review">
        <FaultRow
          fault={s("manager_role_fault")}
          onFault={(v) => set("manager_role_fault", v)}
          preventable={s("manager_role_preventable")}
          onPreventable={(v) => set("manager_role_preventable", v)}
        />
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Manager Assessment" full><TextArea value={s("manager_assessment")} onChange={(v) => set("manager_assessment", v)} /></Field>
          <Field label="Disciplinary Action" full><TextArea value={s("disciplinary_action")} onChange={(v) => set("disciplinary_action", v)} /></Field>
        </div>
        <div className="mt-4">
          <SignOffRow
            signatureLabel="Manager Signature"
            signature={s("manager_signature")}
            onSignature={(v) => set("manager_signature", v)}
            date={s("manager_date")}
            onDate={(v) => set("manager_date", v)}
          />
        </div>
      </Card>

      <Card title="Agreement &amp; Safety Committee Review">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Driver Agrees with Facts?"><Select value={s("agree_facts")} onChange={(v) => set("agree_facts", v)} options={YES_NO} /></Field>
          <Field label="If No, Explain"><TextInput value={s("agree_facts_explain")} onChange={(v) => set("agree_facts_explain", v)} /></Field>
          <Field label="Driver Agrees with Role Assessment?"><Select value={s("agree_role")} onChange={(v) => set("agree_role", v)} options={YES_NO} /></Field>
          <Field label="If No, Explain"><TextInput value={s("agree_role_explain")} onChange={(v) => set("agree_role_explain", v)} /></Field>
          <Field label="Review Comments" full><TextArea value={s("review_comments")} onChange={(v) => set("review_comments", v)} /></Field>
        </div>
        <div className="mt-4">
          <SignOffRow
            signatureLabel="Reviewer Signature"
            signature={s("review_signature")}
            onSignature={(v) => set("review_signature", v)}
            date={s("review_date")}
            onDate={(v) => set("review_date", v)}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <Field label="Committee Notes" full><TextArea value={s("committee_notes")} onChange={(v) => set("committee_notes", v)} /></Field>
        </div>
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
