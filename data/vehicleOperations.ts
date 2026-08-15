import { supabase } from "@/lib/supabase";

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

export async function getVehicleOperations(): Promise<
  VehicleOperation[]
> {
  const { data, error } = await supabase
    .from("vehicle_operations")
    .select("vehicle_id, status, crew_id")
    .order("vehicle_id");

  if (error) {
    console.error(
      "Unable to load vehicle operations:",
      error
    );

    throw new Error(error.message);
  }

  return (data ?? []).map((item) => ({
    vehicleId: item.vehicle_id,
    status: item.status as VehicleStatus,
    crewId: item.crew_id ?? "",
  }));
}

export async function updateVehicleOperation(
  vehicleId: string,
  updates: {
    status?: VehicleStatus;
    crewId?: string;
  }
): Promise<VehicleOperation> {
  const updateData = {
    ...(updates.status !== undefined && {
      status: updates.status,
    }),

    ...(updates.crewId !== undefined && {
      crew_id: updates.crewId || null,
    }),

    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("vehicle_operations")
    .update(updateData)
    .eq("vehicle_id", vehicleId)
    .select("vehicle_id, status, crew_id")
    .maybeSingle();

  if (error) {
    console.error(
      "Unable to update vehicle operation:",
      error
    );

    throw new Error(error.message);
  }

  if (!data) {
    throw new Error(
      `Vehicle operation ${vehicleId} was not found.`
    );
  }

  return {
    vehicleId: data.vehicle_id,
    status: data.status as VehicleStatus,
    crewId: data.crew_id ?? "",
  };
}