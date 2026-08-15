export type Schedule = {
  id: string;
  workOrder: string;
  address: string;
  crewId: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
};

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