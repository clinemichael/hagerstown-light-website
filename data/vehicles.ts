import { supabase } from "@/lib/supabase";

export type Vehicle = {
  id: string;
  name: string;
  type: string;
  mileage: number;
  maintenance: string;
};

export async function getVehicles(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select(
      "id, name, type, mileage, maintenance"
    )
    .order("id");

  if (error) {
    console.error("Unable to load vehicles:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getActiveVehicles(): Promise<Vehicle[]> {
  return getVehicles();
}