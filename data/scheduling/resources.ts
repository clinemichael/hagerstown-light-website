import { crews } from "@/data/crews";
import { employees } from "@/data/employees";
import { vehicles } from "@/data/vehicles";

export function getCrewResources(crewId: string) {
  const crew = crews.find((item) => item.id === crewId);

  if (!crew) {
    return null;
  }

  const employeeIds = [
    crew.leadId,
    ...crew.memberIds,
  ];

  const employeeNames = Object.fromEntries(
    employees.map((employee) => [
      employee.id,
      employee.name,
    ])
  );

  const vehicleNames = Object.fromEntries(
    vehicles.map((vehicle) => [
      vehicle.id,
      vehicle.name,
    ])
  );

  return {
    crewId: crew.id,
    crewName: crew.name,
    employeeIds,
    vehicleIds: crew.vehicleIds,
    employeeNames,
    vehicleNames,
  };
}