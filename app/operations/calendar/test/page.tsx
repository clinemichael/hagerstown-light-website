"use client";

import { findSchedulingConflicts } from "../conflicts";
import { scheduledJobs } from "../data";
import { ScheduledJob } from "../types";

const employeeNames: Record<string, string> = {
  "1001": "John Smith",
  "1002": "Mike Johnson",
  "1003": "Chris Davis",
  "1004": "Robert Wilson",
  "1005": "James Brown",
};

const vehicleNames: Record<string, string> = {
  "truck-101": "Truck 101",
  "truck-102": "Truck 102",
  "truck-103": "Truck 103",
};

export default function CalendarConflictTest() {
  const employeeConflictJob: ScheduledJob = {
    id: "test-employee",
    jobNumber: "TEST-001",
    jobName: "Employee Conflict Test",

    date: "2026-08-10",
    startTime: "10:00",
    endTime: "14:00",

    crewId: "crew-2",
    crewName: "Line Crew 2",

    employeeIds: ["1001"],
    vehicleIds: [],
  };

  const vehicleConflictJob: ScheduledJob = {
    id: "test-vehicle",
    jobNumber: "TEST-002",
    jobName: "Vehicle Conflict Test",

    date: "2026-08-10",
    startTime: "09:00",
    endTime: "11:00",

    crewId: "crew-2",
    crewName: "Line Crew 2",

    employeeIds: [],
    vehicleIds: ["truck-101"],
  };

  const employeeConflicts = findSchedulingConflicts(
    employeeConflictJob,
    scheduledJobs,
    employeeNames,
    vehicleNames
  );

  const vehicleConflicts = findSchedulingConflicts(
    vehicleConflictJob,
    scheduledJobs,
    employeeNames,
    vehicleNames
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Scheduling Conflict Test
        </h1>

        <p className="mt-2 text-gray-600">
          Temporary test page for the Operations Calendar.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">
          Employee Conflict Test
        </h2>

        <p className="mt-2">
          Trying to schedule <strong>John Smith</strong> from
          10:00 AM–2:00 PM.
        </p>

        <div className="mt-4">
          {employeeConflicts.length === 0 ? (
            <p className="text-green-600 font-semibold">
              ✓ No conflicts found
            </p>
          ) : (
            <div className="space-y-2">
              {employeeConflicts.map((conflict, index) => (
                <div
                  key={index}
                  className="rounded-md bg-red-50 p-4 text-red-700"
                >
                  <strong>Employee Conflict:</strong>{" "}
                  {conflict.resourceName} is already scheduled
                  on {conflict.conflictingJob.jobNumber}{" "}
                  ({conflict.conflictingJob.startTime}–
                  {conflict.conflictingJob.endTime}).
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">
          Vehicle Conflict Test
        </h2>

        <p className="mt-2">
          Trying to schedule <strong>Truck 101</strong> from
          9:00 AM–11:00 AM.
        </p>

        <div className="mt-4">
          {vehicleConflicts.length === 0 ? (
            <p className="text-green-600 font-semibold">
              ✓ No conflicts found
            </p>
          ) : (
            <div className="space-y-2">
              {vehicleConflicts.map((conflict, index) => (
                <div
                  key={index}
                  className="rounded-md bg-red-50 p-4 text-red-700"
                >
                  <strong>Vehicle Conflict:</strong>{" "}
                  {conflict.resourceName} is already scheduled
                  on {conflict.conflictingJob.jobNumber}{" "}
                  ({conflict.conflictingJob.startTime}–
                  {conflict.conflictingJob.endTime}).
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}