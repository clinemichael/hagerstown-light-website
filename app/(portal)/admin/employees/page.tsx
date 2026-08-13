"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Employee = {
  employee_id: string;
  name: string;
  title: string;
  phone: string;
  status: string;
  role: string | null;
  active: boolean | null;
  email: string | null;
};

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployees = async () => {
            // Load employee list
      const {
        data,
        error,
      } = await supabase.rpc("get_admin_employee_list");

      if (error) {
        console.error("Unable to load employees:", error);
        setError(error.message);
        setLoading(false);
        return;
      }

      setEmployees(data ?? []);
      setLoading(false);
    };

    loadEmployees();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Employee Management
          </h1>

          <p className="mt-2 text-gray-600">
            Manage HLD employee information and portal access.
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg bg-brand-blue px-4 py-2 font-medium text-white hover:opacity-90"
        >
          + Add Employee
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-8 rounded-xl border bg-white p-6">
          <p className="text-gray-600">
            Loading employees...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Employee Table */}
      {!loading && !error && (
        <div className="mt-8 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">
                    ID
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Employee
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Title
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Portal
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {employees.map((employee) => (
                  <tr
                    key={employee.employee_id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      {employee.employee_id}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {employee.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {employee.title}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {employee.email ?? "—"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {employee.phone}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          employee.status === "Active"
                            ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                            : "rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                        }
                      >
                        {employee.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {employee.active ? (
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                          Active
                        </span>
                      ) : employee.active === false ? (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                          Disabled
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Not Created
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}