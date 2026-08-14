import { supabase } from "@/lib/supabase";

export type EmployeeStatus =
  | "Active"
  | "Inactive";

export type Employee = {
  id: string;
  name: string;
  title: string;
  status: EmployeeStatus;
  phone: string;
};

/**
 * Get all employees.
 */
export async function getEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from("employees")
    .select("id, name, title, status, phone")
    .order("name");

  if (error) {
    console.error("Unable to load employees:", error);
    throw new Error(error.message);
  }

  return (data ?? []) as Employee[];
}

/**
 * Get active employees.
 */
export async function getActiveEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from("employees")
    .select("id, name, title, status, phone")
    .eq("status", "Active")
    .order("name");

  if (error) {
    console.error(
      "Unable to load active employees:",
      error
    );

    throw new Error(error.message);
  }

  return (data ?? []) as Employee[];
}

/**
 * Get one employee.
 */
export async function getEmployee(
  id: string
): Promise<Employee | null> {
  const { data, error } = await supabase
    .from("employees")
    .select("id, name, title, status, phone")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(
      "Unable to load employee:",
      error
    );

    throw new Error(error.message);
  }

  return data as Employee | null;
}
// Temporary compatibility export.
// Existing pages will continue using this until
// they are migrated to the Supabase data layer.
export const employees: Employee[] = [];