import { supabase } from "@/lib/supabase";

/* ─── shared ─────────────────────────────────── */

function makeId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function nullifyEmpty<T extends Record<string, unknown>>(
  obj: T,
  dateFields: string[]
): T {
  const out = { ...obj } as Record<string, unknown>;
  dateFields.forEach((f) => {
    if (out[f] === "") out[f] = null;
  });
  return out as T;
}

/* ─── types ──────────────────────────────────── */

export type TgBriefing = {
  id: string;
  created_at: string;
  task_description: string | null;
  job_address: string | null;
  date_time: string | null;
  work_order: string | null;
  hospital: string | null;
  emergency: string | null;
  person_in_charge: string | null;
  crew_present: string[];
  vehicles_present: string[];
  hazards: string[];
  work_procedures: string | null;
  special_precautions: string | null;
  substation: string | null;
  feeder: string | null;
  pole: string | null;
  delivery_point: string | null;
  recloser_disabled: boolean;
  hot_line_tag: boolean;
  ppe: string[];
  work_gloves: string[];
  reviewed_by: string | null;
  reviewed_date_time: string | null;
  additional_notes: string | null;
};

export type VehInspection = {
  id: string;
  created_at: string;
  date: string | null;
  unit: string | null;
  name: string | null;
  mileage: string | null;
  misc_notes: string | null;
  operator_name: string | null;
  operator_signature: string | null;
  results: Record<string, "pass" | "fail">;
};

export type CrewReport = {
  id: string;
  created_at: string;
  wo: string | null;
  date: string | null;
  name: string | null;
  job_type: string | null;
  job_location: string | null;
  crew_members: string | null;
  truck_types: string | null;
  special_tools: string | null;
  comments: string | null;
  sections: Record<string, { checked: string[]; other: string }>;
  deficiency_comments: string | null;
};

export type VehAccidentReport = Record<string, unknown> & {
  id: string;
  created_at: string;
};

export type EmpAccidentReport = Record<string, unknown> & {
  id: string;
  created_at: string;
};

export type SafetyFormType =
  | "tailgate"
  | "vehicle"
  | "crew"
  | "vehaccident"
  | "empaccident";

export type HistoryRecord = {
  type: SafetyFormType;
  record: Record<string, unknown>;
};

/* ─── tailgate briefings ─────────────────────── */

export async function getTgBriefings(): Promise<TgBriefing[]> {
  const { data, error } = await supabase
    .from("tg_briefings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function upsertTgBriefing(
  record: Partial<TgBriefing> & { id?: string }
): Promise<string> {
  const id = record.id || makeId("tg");
  const clean = nullifyEmpty({ ...record, id }, ["date_time", "reviewed_date_time"]);
  const { error } = await supabase.from("tg_briefings").upsert(clean);
  if (error) throw new Error(error.message);
  return id;
}

/* ─── vehicle inspections ────────────────────── */

export async function getVehInspections(): Promise<VehInspection[]> {
  const { data, error } = await supabase
    .from("veh_inspections")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function upsertVehInspection(
  record: Partial<VehInspection> & { id?: string }
): Promise<string> {
  const id = record.id || makeId("veh");
  const clean = nullifyEmpty({ ...record, id }, ["date"]);
  const { error } = await supabase.from("veh_inspections").upsert(clean);
  if (error) throw new Error(error.message);
  return id;
}

/* ─── crew safety reports ────────────────────── */

export async function getCrewReports(): Promise<CrewReport[]> {
  const { data, error } = await supabase
    .from("crew_reports")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function upsertCrewReport(
  record: Partial<CrewReport> & { id?: string }
): Promise<string> {
  const id = record.id || makeId("cr");
  const clean = nullifyEmpty({ ...record, id }, ["date"]);
  const { error } = await supabase.from("crew_reports").upsert(clean);
  if (error) throw new Error(error.message);
  return id;
}

/* ─── vehicle accident reports ───────────────── */

export async function getVehAccidentReports(): Promise<VehAccidentReport[]> {
  const { data, error } = await supabase
    .from("veh_accident_reports")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function upsertVehAccidentReport(
  record: Record<string, unknown> & { id?: string }
): Promise<string> {
  const id = (record.id as string) || makeId("va");
  const DATE_FIELDS = [
    "accident_date","driver_report_date","supervisor_date",
    "manager_date","review_date","committee_review_date",
  ];
  const clean = nullifyEmpty({ ...record, id }, DATE_FIELDS);
  const { error } = await supabase.from("veh_accident_reports").upsert(clean);
  if (error) throw new Error(error.message);
  return id;
}

/* ─── employee accident reports ──────────────── */

export async function getEmpAccidentReports(): Promise<EmpAccidentReport[]> {
  const { data, error } = await supabase
    .from("employee_accident_reports")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function upsertEmpAccidentReport(
  record: Record<string, unknown> & { id?: string }
): Promise<string> {
  const id = (record.id as string) || makeId("ea");
  const DATE_FIELDS = [
    "incident_date","date_reported","return_to_work_date",
    "employee_sign_date","supervisor_sign_date","committee_review_date",
  ];
  const clean = nullifyEmpty({ ...record, id }, DATE_FIELDS);
  const { error } = await supabase.from("employee_accident_reports").upsert(clean);
  if (error) throw new Error(error.message);
  return id;
}

/* ─── combined history ───────────────────────── */

export async function getAllSafetyRecords(): Promise<HistoryRecord[]> {
  const [tg, veh, crew, va, ea] = await Promise.all([
    getTgBriefings(),
    getVehInspections(),
    getCrewReports(),
    getVehAccidentReports(),
    getEmpAccidentReports(),
  ]);

  const combined: HistoryRecord[] = [
    ...tg.map((r) => ({ type: "tailgate" as const, record: r as Record<string, unknown> })),
    ...veh.map((r) => ({ type: "vehicle" as const, record: r as Record<string, unknown> })),
    ...crew.map((r) => ({ type: "crew" as const, record: r as Record<string, unknown> })),
    ...va.map((r) => ({ type: "vehaccident" as const, record: r })),
    ...ea.map((r) => ({ type: "empaccident" as const, record: r })),
  ];

  return combined.sort(
    (a, b) =>
      new Date(b.record.created_at as string).getTime() -
      new Date(a.record.created_at as string).getTime()
  );
}
