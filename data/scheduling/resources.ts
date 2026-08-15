import { getCrews } from "@/data/crews";
import { getActiveEmployees } from "@/data/employees";
import { getActiveVehicles } from "@/data/vehicles";

export async function getCrewResources(crewId: string) {
  const crews = await getCrews();
  const employees = await getActiveEmployees();
  const vehicles = await getActiveVehicles();

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