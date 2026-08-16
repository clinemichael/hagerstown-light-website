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
export async function updateCrew(
  crewId: string,
  updates: {
    name: string;
    leadId: string;
    memberIds: string[];
    vehicleIds: string[];
    status: CrewStatus;
    assignment: string;
  }
): Promise<void> {
  const { error: crewError } =
    await supabase
      .from("crews")
      .update({
        name: updates.name,
        lead_id: updates.leadId || null,
        status: updates.status,
        assignment:
          updates.assignment ||
          "No current assignment",
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", crewId);

  if (crewError) {
    console.error(
      "Unable to update crew:",
      crewError
    );

    throw new Error(crewError.message);
  }

  const { error: memberDeleteError } =
    await supabase
      .from("crew_members")
      .delete()
      .eq("crew_id", crewId);

  if (memberDeleteError) {
    console.error(
      "Unable to update crew members:",
      memberDeleteError
    );

    throw new Error(
      memberDeleteError.message
    );
  }

  if (updates.memberIds.length > 0) {
    const { error: memberInsertError } =
      await supabase
        .from("crew_members")
        .insert(
          updates.memberIds.map(
            (employeeId) => ({
              crew_id: crewId,
              employee_id: employeeId,
            })
          )
        );

    if (memberInsertError) {
      console.error(
        "Unable to save crew members:",
        memberInsertError
      );

      throw new Error(
        memberInsertError.message
      );
    }
  }

  const { error: vehicleDeleteError } =
    await supabase
      .from("crew_vehicles")
      .delete()
      .eq("crew_id", crewId);

  if (vehicleDeleteError) {
    console.error(
      "Unable to update crew vehicles:",
      vehicleDeleteError
    );

    throw new Error(
      vehicleDeleteError.message
    );
  }

  if (updates.vehicleIds.length > 0) {
    const { error: vehicleInsertError } =
      await supabase
        .from("crew_vehicles")
        .insert(
          updates.vehicleIds.map(
            (vehicleId) => ({
              crew_id: crewId,
              vehicle_id: vehicleId,
            })
          )
        );

    if (vehicleInsertError) {
      console.error(
        "Unable to save crew vehicles:",
        vehicleInsertError
      );

      throw new Error(
        vehicleInsertError.message
      );
    }
  }
}
export async function deactivateCrew(
  crewId: string
): Promise<void> {
  const { error } = await supabase
    .from("crews")
    .update({
      status: "Unavailable",
      updated_at: new Date().toISOString(),
    })
    .eq("id", crewId);

  if (error) {
    console.error(
      "Unable to deactivate crew:",
      error
    );

    throw new Error(error.message);
  }
}