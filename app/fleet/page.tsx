"use client";

import { Search, Truck } from "lucide-react";
import { useState } from "react";

const vehicles = [
  {
    id: "T-12",
    number: "Truck 12",
    type: "Bucket Truck",
    makeModel: "International 4300",
    status: "Available",
    crew: "Line Crew 1",
  },
  {
    id: "T-18",
    number: "Truck 18",
    type: "Bucket Truck",
    makeModel: "Freightliner M2",
    status: "Assigned",
    crew: "Line Crew 1",
  },
  {
    id: "T-21",
    number: "Truck 21",
    type: "Line Truck",
    makeModel: "International MV",
    status: "Available",
    crew: "Line Crew 2",
  },
  {
    id: "T-24",
    number: "Truck 24",
    type: "Bucket Truck",
    makeModel: "Freightliner 108SD",
    status: "Assigned",
    crew: "Line Crew 2",
  },
  {
    id: "T-26",
    number: "Truck 26",
    type: "Service Truck",
    makeModel: "Ford F-550",
    status: "Available",
    crew: "Line Crew 2",
  },
  {
    id: "ST-01",
    number: "Service Truck 1",
    type: "Service Truck",
    makeModel: "Ford F-250",
    status: "Available",
    crew: "Service Crew",
  },
];

export default function FleetPage() {
  const [search, setSearch] = useState("");

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchTerm = search.toLowerCase();

    return (
      vehicle.number.toLowerCase().includes(searchTerm) ||
      vehicle.type.toLowerCase().includes(searchTerm) ||
      vehicle.makeModel.toLowerCase().includes(searchTerm) ||
      vehicle.crew.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue">
            Fleet
          </h1>

          <p className="text-gray-600 mt-1">
            Manage HLD vehicles and fleet availability.
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
          <Truck size={18} />
          Add Vehicle
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
            placeholder="Search fleet..."
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

      {/* Fleet List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Vehicle
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Type
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Make / Model
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Assigned Crew
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-800">
                      {vehicle.number}
                    </div>

                    <div className="text-xs text-gray-400 mt-1">
                      {vehicle.id}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {vehicle.type}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {vehicle.makeModel}
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
                          vehicle.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {vehicle.crew}
                  </td>
                </tr>
              ))}

              {filteredVehicles.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No vehicles found.
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