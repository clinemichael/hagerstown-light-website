"use client";

import { Users, Truck, UserRound } from "lucide-react";

const crews = [
  {
    name: "Line Crew 1",
    lead: "Lead Lineman",
    members: ["Lineman", "Lineman"],
    trucks: ["Truck 12", "Truck 18"],
    status: "Available",
    assignment: "No current assignment",
  },
  {
    name: "Line Crew 2",
    lead: "Lead Lineman",
    members: ["Lineman", "Lineman"],
    trucks: ["Truck 21", "Truck 24", "Truck 26"],
    status: "Available",
    assignment: "No current assignment",
  },
  {
    name: "Service Crew",
    lead: "Crew Member",
    members: ["Crew Member"],
    trucks: ["Service Truck 1"],
    status: "Available",
    assignment: "No current assignment",
  },
];

export default function CrewPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue">Crews</h1>

          <p className="text-gray-600 mt-1">
            Manage crew assignments, personnel, and vehicles.
          </p>
        </div>

        <button
          type="button"
          className="
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
          + Create Crew
        </button>
      </div>

      {/* Crew Cards */}
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {crews.map((crew) => (
          <div
            key={crew.name}
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-6
              shadow-sm
              hover:shadow-md
              transition
            "
          >
            {/* Crew Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-brand-blue">
                  {crew.name}
                </h3>

                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Users size={16} />
                  {crew.members.length + 1} members
                </div>
              </div>

              <span
                className="
                  text-xs
                  font-semibold
                  px-3
                  py-1
                  rounded-full
                  bg-green-100
                  text-green-700
                "
              >
                {crew.status}
              </span>
            </div>

            {/* Lead */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    bg-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <UserRound
                    size={18}
                    className="text-brand-blue"
                  />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Lead</p>

                  <p className="font-semibold">{crew.lead}</p>
                </div>
              </div>
            </div>

            {/* Crew Members */}
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Users
                  size={17}
                  className="text-gray-400"
                />

                <h4 className="font-semibold text-gray-700">
                  Crew Members
                </h4>
              </div>

              <div className="space-y-2">
                {crew.members.map((member, index) => (
                  <div
                    key={`${crew.name}-${index}`}
                    className="
                      flex
                      items-center
                      gap-3
                      text-sm
                      text-gray-600
                    "
                  >
                    <div
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-gray-300
                      "
                    />

                    {member}
                  </div>
                ))}
              </div>
            </div>

            {/* Trucks */}
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Truck
                  size={17}
                  className="text-gray-400"
                />

                <h4 className="font-semibold text-gray-700">
                  Assigned Trucks
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {crew.trucks.map((truck) => (
                  <span
                    key={truck}
                    className="
                      px-3
                      py-1
                      text-sm
                      font-medium
                      bg-gray-100
                      text-gray-700
                      rounded-lg
                    "
                  >
                    {truck}
                  </span>
                ))}
              </div>
            </div>

            {/* Assignment */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Current Assignment
              </p>

              <p className="mt-1 font-medium text-gray-700">
                {crew.assignment}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-5">
              <button
                type="button"
                className="
                  flex-1
                  border
                  border-gray-200
                  rounded-lg
                  py-2
                  text-sm
                  font-semibold
                  text-brand-blue
                  hover:bg-blue-50
                  transition
                "
              >
                View Crew
              </button>

              <button
                type="button"
                className="
                  flex-1
                  border
                  border-gray-200
                  rounded-lg
                  py-2
                  text-sm
                  font-semibold
                  text-gray-600
                  hover:bg-gray-50
                  transition
                "
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}