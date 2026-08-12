import { ScheduledJob } from "./types";

export type SchedulingConflict = {
  type: "crew" | "employee" | "vehicle";
  resourceId: string;
  resourceName: string;
  conflictingJob: ScheduledJob;
};

function timesOverlap(
  startA: string,
  endA: string,
  startB: string,
  endB: string
) {
  return startA < endB && endA > startB;
}

export function findSchedulingConflicts(
  newJob: ScheduledJob,
  existingJobs: ScheduledJob[],
  employeeNames: Record<string, string>,
  vehicleNames: Record<string, string>
): SchedulingConflict[] {
  const conflicts: SchedulingConflict[] = [];

  for (const existingJob of existingJobs) {
    // Don't compare a job against itself when editing
    if (existingJob.id === newJob.id) {
      continue;
    }

    // Jobs on different dates cannot conflict
    if (existingJob.date !== newJob.date) {
      continue;
    }

    // If the times don't overlap, there is no conflict
    if (
      !timesOverlap(
        newJob.startTime,
        newJob.endTime,
        existingJob.startTime,
        existingJob.endTime
      )
    ) {
      continue;
    }

    // Check crew
    const crewConflict =
  newJob.crewId === existingJob.crewId;

if (newJob.crewId === existingJob.crewId) {
  conflicts.push({
    type: "crew",
    resourceId: newJob.crewId,
    resourceName: newJob.crewName,
    conflictingJob: existingJob,
  });

  // If the entire crew is already scheduled,
  // don't report the crew's individual employees
  // and vehicles as duplicate conflicts.
  continue;
}

    // Check employees
    for (const employeeId of newJob.employeeIds) {
      if (existingJob.employeeIds.includes(employeeId)) {
        conflicts.push({
          type: "employee",
          resourceId: employeeId,
          resourceName: employeeNames[employeeId] ?? employeeId,
          conflictingJob: existingJob,
        });
      }
    }

    // Check vehicles
    for (const vehicleId of newJob.vehicleIds) {
      if (existingJob.vehicleIds.includes(vehicleId)) {
        conflicts.push({
          type: "vehicle",
          resourceId: vehicleId,
          resourceName: vehicleNames[vehicleId] ?? vehicleId,
          conflictingJob: existingJob,
        });
      }
    }
  }

  return conflicts;
}