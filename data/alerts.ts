import { supabase } from "@/lib/supabase";

export type AlertPriority = "info" | "warning" | "critical";

export type OperationsAlert = {
  id: string;
  title: string;
  description: string;
  priority: AlertPriority;
  active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export async function getActiveAlerts(): Promise<OperationsAlert[]> {
  const { data, error } = await supabase
    .from("operations_alerts")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Unable to load alerts:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getAllAlerts(): Promise<OperationsAlert[]> {
  const { data, error } = await supabase
    .from("operations_alerts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Unable to load alerts:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createAlert(alert: {
  title: string;
  description: string;
  priority: AlertPriority;
  created_by?: string;
}): Promise<OperationsAlert> {
  const { data, error } = await supabase
    .from("operations_alerts")
    .insert(alert)
    .select()
    .single();

  if (error) {
    console.error("Unable to create alert:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function setAlertActive(
  id: string,
  active: boolean
): Promise<void> {
  const { error } = await supabase
    .from("operations_alerts")
    .update({ active, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("Unable to update alert:", error);
    throw new Error(error.message);
  }
}

export async function deleteAlert(id: string): Promise<void> {
  const { error } = await supabase
    .from("operations_alerts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Unable to delete alert:", error);
    throw new Error(error.message);
  }
}
