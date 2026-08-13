export type ScheduledJob = {
  id: string;
  jobNumber: string;
  jobName: string;

  date: string;
  startTime: string;
  endTime: string;

  crewId: string;
  crewName: string;

  employeeIds: string[];
  vehicleIds: string[];
};