"use client";

import { Search, UserPlus } from "lucide-react";
import { useState } from "react";

const employees = [
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
  const [search, setSearch] = useState("");

  const filteredEmployees = employees.filter((employee) => {
    const searchTerm = search.toLowerCase();

    return (
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.id.toLowerCase().includes(searchTerm) ||
      employee.title.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
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
    </div>
  );
}