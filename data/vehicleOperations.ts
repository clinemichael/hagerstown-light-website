export type VehicleStatus =
  | "Available"
  | "Assigned"
  | "Maintenance"
  | "Out of Service";

export type VehicleOperation = {
  vehicleId: string;
  status: VehicleStatus;
  crewId: string;
};

export const vehicleOperations: VehicleOperation[] = [
  {
    vehicleId: "T-12",
    status: "Available",
    crewId: "crew-001",
  },
  {
    vehicleId: "T-18",
    status: "Available",
    crewId: "crew-001",
  },
  {
    vehicleId: "T-21",
    status: "Assigned",
    crewId: "crew-002",
  },
  {
    vehicleId: "T-24",
    status: "Available",
    crewId: "crew-002",
  },
  {
    vehicleId: "T-26",
    status: "Available",
    crewId: "",
  },
  {
    vehicleId: "ST-01",
    status: "Available",
    crewId: "crew-003",
  },
];