import { supabase } from "@/lib/supabase";

export type ScheduledJobRecord = {
  id: string;
  workOrder: string;
  jobName: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  crewId: string;
  crewName: string;
  employeeIds: string[];
  vehicleIds: string[];
  createdAt: string;
  updatedAt: string;
};

type ScheduledJobRow = {
  id: string;
  work_order: string;
  job_name: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  crew_id: string;
  crew_name: string;
  employee_ids: string[] | null;
  vehicle_ids: string[] | null;
  created_at: string;
  updated_at: string;
};

function mapScheduledJob(
  row: ScheduledJobRow
): ScheduledJobRecord {
  return {
    id: row.id,
    workOrder: row.work_order,
    jobName: row.job_name,
    scheduledDate: row.scheduled_date,
    startTime: row.start_time,
    endTime: row.end_time,
    crewId: row.crew_id,
    crewName: row.crew_name,
    employeeIds: row.employee_ids ?? [],
    vehicleIds: row.vehicle_ids ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getScheduledJobs(): Promise<
  ScheduledJobRecord[]
> {
  const { data, error } = await supabase
    .from("scheduled_jobs")
    .select("*")
    .order("scheduled_date")
    .order("start_time");

  if (error) {
    console.error(
      "Unable to load scheduled jobs:",
      error
    );

    throw new Error(error.message);
  }

  return (data ?? []).map(mapScheduledJob);
}

export async function createScheduledJob(
  job: Omit<
    ScheduledJobRecord,
    "id" | "createdAt" | "updatedAt"
  >
): Promise<ScheduledJobRecord> {
  const { data, error } = await supabase
    .from("scheduled_jobs")
    .insert({
      work_order: job.workOrder,
      job_name: job.jobName,
      scheduled_date: job.scheduledDate,
      start_time: job.startTime,
      end_time: job.endTime,
      crew_id: job.crewId,
      crew_name: job.crewName,
      employee_ids: job.employeeIds,
      vehicle_ids: job.vehicleIds,
    })
    .select()
    .single();

  if (error) {
    console.error(
      "Unable to create scheduled job:",
      error
    );

    throw new Error(error.message);
  }

  return mapScheduledJob(data);
}

export async function updateScheduledJob(
  id: string,
  job: Partial<
    Omit<
      ScheduledJobRecord,
      "id" | "createdAt" | "updatedAt"
    >
  >
): Promise<ScheduledJobRecord> {
  const updateData: Record<string, unknown> = {};

  if (job.workOrder !== undefined) {
    updateData.work_order = job.workOrder;
  }

  if (job.jobName !== undefined) {
    updateData.job_name = job.jobName;
  }

  if (job.scheduledDate !== undefined) {
    updateData.scheduled_date =
      job.scheduledDate;
  }

  if (job.startTime !== undefined) {
    updateData.start_time = job.startTime;
  }

  if (job.endTime !== undefined) {
    updateData.end_time = job.endTime;
  }

  if (job.crewId !== undefined) {
    updateData.crew_id = job.crewId;
  }

  if (job.crewName !== undefined) {
    updateData.crew_name = job.crewName;
  }

  if (job.employeeIds !== undefined) {
    updateData.employee_ids =
      job.employeeIds;
  }

  if (job.vehicleIds !== undefined) {
    updateData.vehicle_ids =
      job.vehicleIds;
  }

  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("scheduled_jobs")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(
      "Unable to update scheduled job:",
      error
    );

    throw new Error(error.message);
  }

  return mapScheduledJob(data);
}

export async function deleteScheduledJob(
  id: string
): Promise<void> {
  const { error } = await supabase
    .from("scheduled_jobs")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(
      "Unable to delete scheduled job:",
      error
    );

    throw new Error(error.message);
  }
}