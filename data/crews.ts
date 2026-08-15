import { supabase } from "@/lib/supabase";

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

export async function getCrews(): Promise<Crew[]> {
  const { data: crewData, error: crewError } =
    await supabase
      .from("crews")
      .select("*")
      .order("id");

  if (crewError) {
    console.error(
      "Unable to load crews:",
      crewError
    );
    throw new Error(crewError.message);
  }

  if (!crewData) {
    return [];
  }

  const { data: memberData, error: memberError } =
    await supabase
      .from("crew_members")
      .select("crew_id, employee_id");

  if (memberError) {
    console.error(
      "Unable to load crew members:",
      memberError
    );
    throw new Error(memberError.message);
  }

  const { data: vehicleData, error: vehicleError } =
    await supabase
      .from("crew_vehicles")
      .select("crew_id, vehicle_id");

  if (vehicleError) {
    console.error(
      "Unable to load crew vehicles:",
      vehicleError
    );
    throw new Error(vehicleError.message);
  }

  return crewData.map((crew) => {
    const members =
      memberData?.filter(
        (item) => item.crew_id === crew.id
      ) ?? [];

    const vehicles =
      vehicleData?.filter(
        (item) => item.crew_id === crew.id
      ) ?? [];

    return {
      id: crew.id,
      name: crew.name,
      leadId: crew.lead_id,
      memberIds: members.map(
        (item) => item.employee_id
      ),
      vehicleIds: vehicles.map(
        (item) => item.vehicle_id
      ),
      status: crew.status as CrewStatus,
      assignment: crew.assignment,
    };
  });
}