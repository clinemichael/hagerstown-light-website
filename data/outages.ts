import { supabase } from "@/lib/supabase";

export type StormCall = {
  id: string;
  call_num: number;
  received: string;
  call_taker: string;
  customer_name: string | null;
  phone: string | null;
  house_num: string | null;
  street: string | null;
  unit: string | null;
  incident_type: string;
  special_condition: string | null;
  comments: string | null;
  xfmr: string | null;
  xfmr_pole: string | null;
  device: string | null;
  device_type: string | null;
  device_pole: string | null;
  feeder: string | null;
  status: string;
  crew: string;
  notes: string | null;
  complete: boolean;
  completed_at: string | null;
};

export type NewStormCall = {
  call_taker: string;
  customer_name: string;
  phone: string;
  house_num: string;
  street: string;
  unit: string;
  incident_type: string;
  special_condition: string;
  comments: string;
};

export async function getStormCalls(): Promise<StormCall[]> {
  const { data, error } = await supabase
    .from("storm_calls")
    .select("*")
    .order("received", { ascending: false });

  if (error) {
    console.error("Unable to load storm calls:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function createStormCall(
  call: NewStormCall
): Promise<StormCall> {
  const { data, error } = await supabase
    .from("storm_calls")
    .insert({
      ...call,
      status: "UNASSIGNED",
      crew: "UNASSIGNED",
      complete: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Unable to log call:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateStormCall(
  id: string,
  patch: Partial<StormCall>
): Promise<void> {
  const { error } = await supabase
    .from("storm_calls")
    .update(patch)
    .eq("id", id);

  if (error) {
    console.error("Unable to update call:", error);
    throw new Error(error.message);
  }
}

export async function clearStormCalls(): Promise<void> {
  const { error } = await supabase
    .from("storm_calls")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) {
    console.error("Unable to clear storm calls:", error);
    throw new Error(error.message);
  }
}

export async function getEventStart(): Promise<string> {
  const { data, error } = await supabase
    .from("storm_meta")
    .select("value")
    .eq("key", "event_start")
    .maybeSingle();

  if (error) {
    console.error("Unable to load event start:", error);
    return "";
  }

  const value = data?.value as { v?: string } | null;
  return value?.v ?? "";
}

export async function setEventStart(
  value: string
): Promise<void> {
  const { error } = await supabase
    .from("storm_meta")
    .upsert({ key: "event_start", value: { v: value } });

  if (error) {
    console.error("Unable to save event start:", error);
    throw new Error(error.message);
  }
}
