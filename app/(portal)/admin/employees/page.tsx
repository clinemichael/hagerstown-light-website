"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
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
  const [selectedEmployee, setSelectedEmployee] =
     useState<Employee | null>(null);
  const [editName, setEditName] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editStatus, setEditStatus] = useState("Active");
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [deactivating, setDeactivating] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] =
     useState(false);

    const handleSaveEmployee = async () => {
  if (!selectedEmployee) {
    return;
  }

  setEditError("");

  if (!editName.trim()) {
    setEditError("Employee name is required.");
    return;
  }

  if (!editTitle.trim()) {
    setEditError("Employee title is required.");
    return;
  }

  if (!editPhone.trim()) {
    setEditError("Employee phone number is required.");
    return;
  }

  if (!["Active", "Inactive"].includes(editStatus)) {
    setEditError("Please select a valid employee status.");
    return;
  }

  setSaving(true);
  setError("");

  const { error } = await supabase
    .from("employees")
    .update({
      name: editName,
      title: editTitle,
      phone: editPhone,
      status: editStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", selectedEmployee.employee_id);

  if (error) {
    console.error("Unable to save employee:", error);
    setError(error.message);
    setSaving(false);
    return;
  }

  const updatedEmployee: Employee = {
    ...selectedEmployee,
    name: editName,
    title: editTitle,
    phone: editPhone,
    status: editStatus,
  };

  setEmployees((current) =>
    current.map((employee) =>
      employee.employee_id === selectedEmployee.employee_id
        ? updatedEmployee
        : employee
    )
  );

  setSelectedEmployee(null);
  setSaving(false);
};

const handleDeactivateEmployee = async () => {
  if (!selectedEmployee) {
    return;
  }

  setDeactivating(true);
  setEditError("");

  const { error } = await supabase
    .from("employees")
    .update({
      status: "Inactive",
      updated_at: new Date().toISOString(),
    })
    .eq("id", selectedEmployee.employee_id);

  if (error) {
    console.error(
      "Unable to deactivate employee:",
      error
    );

    setEditError(error.message);
    setDeactivating(false);
    return;
  }

  setEmployees((current) =>
    current.map((employee) =>
      employee.employee_id === selectedEmployee.employee_id
        ? {
            ...employee,
            status: "Inactive",
          }
        : employee
    )
  );

  setSelectedEmployee(null);
  setShowDeactivateConfirm(false);
  setDeactivating(false);
};

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
  onClick={() => {
    setSelectedEmployee(employee);
    setEditName(employee.name);
    setEditTitle(employee.title);
    setEditPhone(employee.phone);
    setEditStatus(employee.status);
  }}
  className="cursor-pointer hover:bg-gray-50"
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
      {selectedEmployee && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
      {/* Modal Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold">
            Edit Employee
          </h2>

          <p className="text-sm text-gray-500">
            Employee ID: {selectedEmployee.employee_id}
          </p>
        </div>

      </div>

      {/* Modal Body */}
<div className="space-y-5 p-6">

  {editError && (
    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
      <p className="text-sm text-red-700">
        {editError}
      </p>
    </div>
  )}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Name
          </label>

          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Title
          </label>

          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)   }
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone
          </label>

          <input
            type="text"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Status
          </label>

          <select
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Modal Footer */}
      <button
  type="button"
  onClick={() => setShowDeactivateConfirm(true)}
  className="mr-auto rounded-lg border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50"
>
  Deactivate Employee
</button>
      <div className="flex justify-end gap-3 border-t px-6 py-4">
        <button
          type="button"
          onClick={() => setSelectedEmployee(null)}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Cancel
        </button>

         <button
  type="button"
  onClick={handleSaveEmployee}
  disabled={saving}
  className="rounded-lg bg-brand-blue px-4 py-2 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
>
  {saving ? "Saving..." : "Save Changes"}
</button>
      </div>
    </div>
  </div>
)}

{showDeactivateConfirm && selectedEmployee && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Deactivate Employee
        </h2>

        <p className="mt-3 text-gray-600">
          Are you sure you want to deactivate{" "}
          <span className="font-semibold">
            {selectedEmployee.name}
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-gray-500">
          The employee will remain in HOP so historical
          records are preserved.
        </p>
      </div>

      <div className="flex justify-end gap-3 border-t px-6 py-4">
        <button
          type="button"
          onClick={() => setShowDeactivateConfirm(false)}
          disabled={deactivating}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleDeactivateEmployee}
          disabled={deactivating}
          className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deactivating
            ? "Deactivating..."
            : "Yes, Deactivate"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}