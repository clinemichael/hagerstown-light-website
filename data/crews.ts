export type CrewStatus =
  | "Available"
  | "Assigned"
  | "Unavailable"
  | "On Leave"
  | "Training";

export type Crew = {
  id: string;
  name: string;
  leadId: string;
  memberIds: string[];
  vehicleIds: string[];
  status: CrewStatus;
  assignment: string;
};

export const crews = [
  {
    id: "crew-001",
    name: "Line Crew 1",
    leadId: "1001",
    memberIds: ["1002", "1003"],
    vehicleIds: ["T-12", "T-18"],
    status: "On Leave",
    assignment: "No current assignment",
  },
  {
    id: "crew-002",
    name: "Line Crew 2",
    leadId: "1004",
    memberIds: ["1005"],
    vehicleIds: ["T-21", "T-24", "T-26"],
    status: "Available",
    assignment: "No current assignment",
  },
  {
    id: "crew-003",
    name: "Service Crew",
    leadId: "1005",
    memberIds: ["1003"],
    vehicleIds: ["ST-01"],
    status: "Available",
    assignment: "No current assignment",
  },
] satisfies Crew[];