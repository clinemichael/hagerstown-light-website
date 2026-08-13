import { ScheduledJob } from "./types";

export const scheduledJobs: ScheduledJob[] = [
  {
    id: "job-001",
    jobNumber: "WO-1001",
    jobName: "Main Street Pole Replacement",

    date: "2026-08-10",
    startTime: "08:00",
    endTime: "12:00",

    crewId: "crew-1",
    crewName: "Line Crew 1",

    employeeIds: ["1001", "1002", "1003"],
    vehicleIds: ["truck-101", "truck-102"],
  },

  {
    id: "job-002",
    jobNumber: "WO-1002",
    jobName: "Service Disconnect",

    date: "2026-08-10",
    startTime: "13:00",
    endTime: "15:00",

    crewId: "crew-3",
    crewName: "Service Crew",

    employeeIds: ["1004", "1005"],
    vehicleIds: ["truck-103"],
  },
];