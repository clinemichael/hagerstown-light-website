export type Crew = {
  id: string;
  name: string;
  members: number;
  status: string;
};

export const crews: Crew[] = [
  {
    id: "crew-001",
    name: "Line Crew 1",
    members: 4,
    status: "Available",
  },
  {
    id: "crew-002",
    name: "Line Crew 2",
    members: 4,
    status: "Available",
  },
  {
    id: "crew-003",
    name: "Service Crew",
    members: 2,
    status: "Available",
  },
];