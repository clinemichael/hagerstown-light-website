"use client";

import { Search, UserPlus, X } from "lucide-react";
import { useState } from "react";

type Employee = {
  id: string;
  name: string;
  title: string;
  status: "Active" | "Inactive";
  phone: string;
};

const initialEmployees: Employee[] = [
  {
    id: "1001",
    name: "John Smith",
    title: "Lead Lineman",
    status: "Active",
    phone: "301-555-0101",
  },
  {
    id: "1002",
    name: "Robert Jones",
    title: "Lineman",
    status: "Active",
    phone: "301-555-0102",
  },
  {
    id: "1003",
    name: "Michael Davis",
    title: "Lineman",
    status: "Active",
    phone: "301-555-0103",
  },
  {
    id: "1004",
    name: "James Wilson",
    title: "Apprentice Lineman",
    status: "Active",
    phone: "301-555-0104",
  },
  {
    id: "1005",
    name: "David Miller",
    title: "Service Technician",
    status: "Active",
    phone: "301-555-0105",
  },
  {
    id: "1006",
    name: "Chris Anderson",
    title: "Lineman",
    status: "Inactive",
    phone: "301-555-0106",
  },
];

export default function EmployeesPage() {
  const [employees, setEmployees] =
    useState<Employee[]>(initialEmployees);

  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeTitle, setEmployeeTitle] = useState("");
  const [employeeStatus, setEmployeeStatus] =
    useState<Employee["status"]>("Active");
  const [employeePhone, setEmployeePhone] = useState("");

  const resetForm = () => {
    setEmployeeId("");
    setEmployeeName("");
    setEmployeeTitle("");
    setEmployeeStatus("Active");
    setEmployeePhone("");
    setError("");
  };

  const closeForm = () => {
    resetForm();
    setShowAddForm(false);
  };

  const addEmployee = () => {
    const trimmedId = employeeId.trim();

    if (!trimmedId || !employeeName.trim() || !employeeTitle.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    const duplicateId = employees.some(
      (employee) =>
        employee.id.toLowerCase() === trimmedId.toLowerCase()
    );

    if (duplicateId) {
      setError(
        `Employee ID ${trimmedId} is already in use. Please enter a different Employee ID.`
      );
      return;
    }

    const newEmployee: Employee = {
      id: trimmedId,
      name: employeeName.trim(),
      title: employeeTitle.trim(),
      status: employeeStatus,
      phone: employeePhone.trim(),
    };

    setEmployees([...employees, newEmployee]);
    closeForm();
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = search.toLowerCase();

    return (
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.id.toLowerCase().includes(searchTerm) ||
      employee.title.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue">
            Employees
          </h1>

          <p className="text-gray-600 mt-1">
            Manage HLD operations personnel.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-brand-blue
            text-white
            font-semibold
            px-4
            py-2
            rounded-lg
            hover:opacity-90
            transition
          "
        >
          <UserPlus size={18} />
          Add Employee
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="
              w-full
              pl-10
              pr-4
              py-2.5
              border
              border-gray-200
              rounded-lg
              text-sm
              outline-none
              focus:ring-2
              focus:ring-blue-100
              focus:border-brand-blue
            "
          />
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Name
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Employee ID
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Title
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Phone
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">
                      {employee.name}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {employee.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {employee.title}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                        inline-flex
                        items-center
                        px-2.5
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${
                          employee.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {employee.phone}
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-brand-blue">
                  Add Employee
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add an employee to the operations portal.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={22} />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">
              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Employee ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Employee ID
                </label>

                <input
                  type="text"
                  value={employeeId}
                  onChange={(event) => {
                    setEmployeeId(event.target.value);
                    setError("");
                  }}
                  placeholder="Example: 1007"
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-100
                    focus:border-brand-blue
                  "
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  value={employeeName}
                  onChange={(event) =>
                    setEmployeeName(event.target.value)
                  }
                  placeholder="Example: John Smith"
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-100
                    focus:border-brand-blue
                  "
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>

                <input
                  type="text"
                  value={employeeTitle}
                  onChange={(event) =>
                    setEmployeeTitle(event.target.value)
                  }
                  placeholder="Example: Lineman"
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-100
                    focus:border-brand-blue
                  "
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  value={employeeStatus}
                  onChange={(event) =>
                    setEmployeeStatus(
                      event.target.value as Employee["status"]
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    bg-white
                  "
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={employeePhone}
                  onChange={(event) =>
                    setEmployeePhone(event.target.value)
                  }
                  placeholder="Example: 301-555-0107"
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-4
                    py-2.5
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-blue-100
                    focus:border-brand-blue
                  "
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                type="button"
                onClick={closeForm}
                className="
                  px-4
                  py-2
                  border
                  border-gray-200
                  rounded-lg
                  text-sm
                  font-semibold
                  text-gray-600
                  hover:bg-gray-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={addEmployee}
                disabled={
                  !employeeId.trim() ||
                  !employeeName.trim() ||
                  !employeeTitle.trim()
                }
                className="
                  px-4
                  py-2
                  bg-brand-blue
                  text-white
                  rounded-lg
                  text-sm
                  font-semibold
                  hover:opacity-90
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}