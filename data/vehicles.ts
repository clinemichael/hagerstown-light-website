import { supabase } from "@/lib/supabase";

export type Vehicle = {
  id: string;
  name: string;
  type: string;
  mileage: number;
  maintenance: string;
  active: boolean;
};

export async function getVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, name, type, mileage, maintenance, active"
    )
    .order("id");

  if (error) {
    console.error("Unable to load vehicles:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getActiveVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, name, type, mileage, maintenance, active"
    )
    .eq("active", true)
    .order("id");

  if (error) {
    console.error(
      "Unable to load active vehicles:",
      error
    );

    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createVehicle(
  vehicle: Vehicle
): Promise<Vehicle> {
  const { data, error } = await supabase
    .from("vehicles")
    .insert({
      id: vehicle.id,
      name: vehicle.name,
      type: vehicle.type,
      mileage: vehicle.mileage,
      maintenance: vehicle.maintenance,
      active: vehicle.active,
    })
    .select(
      "id, name, type, mileage, maintenance, active"
    )
    .single();

  if (error) {
    console.error(
      "Unable to create vehicle:",
      error
    );

    throw new Error(error.message);
  }

  return data;
}

export async function updateVehicle(
  vehicle: Vehicle
): Promise<Vehicle> {
  const { error } = await supabase
    .from("vehicles")
    .update({
      name: vehicle.name,
      type: vehicle.type,
      mileage: vehicle.mileage,
      maintenance: vehicle.maintenance,
      active: vehicle.active,
    })
    .eq("id", vehicle.id);

  if (error) {
    console.error(
      "Unable to update vehicle:",
      error
    );

    throw new Error(error.message);
  }

  return vehicle;
}
export async function deactivateVehicle(
  vehicleId: string
): Promise<void> {
  const { error } = await supabase
    .from("vehicles")
    .update({
      active: false,
    })
    .eq("id", vehicleId);

  if (error) {
    console.error(
      "Unable to deactivate vehicle:",
      error
    );

    throw new Error(error.message);
  }
}