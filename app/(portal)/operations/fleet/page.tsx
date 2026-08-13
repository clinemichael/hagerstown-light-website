"use client";

import {
  Truck,
  Users,
  Wrench,
  CalendarDays,
} from "lucide-react";

import { useState } from "react";

import { vehicles } from "@/data/vehicles";
import { crews } from "@/data/crews";

import {
  vehicleOperations,
  type VehicleStatus,
} from "@/data/vehicleOperations";

export default function FleetPage() {
  const [assignments, setAssignments] =
    useState(vehicleOperations);

  const updateStatus = (
    vehicleId: string,
    status: VehicleStatus
  ) => {
    setAssignments((current) =>
      current.map((item) =>
        item.vehicleId === vehicleId
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };

  const updateCrew = (
    vehicleId: string,
    crewId: string
  ) => {
    setAssignments((current) =>
      current.map((item) =>
        item.vehicleId === vehicleId
          ? {
              ...item,
              crewId,
              status:
                crewId && item.status === "Available"
                  ? "Assigned"
                  : item.status,
            }
          : item
      )
    );
  };

  const getCrew = (crewId: string) => {
    return crews.find(
      (crew) => crew.id === crewId
    );
  };

  const getStatusClasses = (
    status: VehicleStatus
  ) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";

      case "Assigned":
        return "bg-blue-100 text-blue-700";

      case "Maintenance":
        return "bg-yellow-100 text-yellow-700";

      case "Out of Service":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">
            Operations Fleet
          </h2>

          <p className="text-gray-600 mt-1">
            Manage truck status and crew assignments.
          </p>
        </div>
      </div>

      {/* Fleet Cards */}

      <div
        className="
          grid
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-5
        "
      >
        {vehicles.map((vehicle) => {
          const assignment =
            assignments.find(
              (item) =>
                item.vehicleId === vehicle.id
            ) || {
              vehicleId: vehicle.id,
              status:
                "Available" as VehicleStatus,
              crewId: "",
            };

          const crew = getCrew(
            assignment.crewId
          );

          return (
            <div
              key={vehicle.id}
              className="
                bg-white
                border
                border-gray-200
                rounded-xl
                p-5
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              {/* Vehicle Header */}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      w-10
                      h-10
                      rounded-lg
                      bg-blue-50
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Truck
                      size={21}
                      className="text-brand-blue"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {vehicle.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {vehicle.type}
                    </p>

                    <p className="text-xs text-gray-400 mt-0.5">
                      ID: {vehicle.id}
                    </p>
                  </div>
                </div>

                {/* Status */}

                <span
                  className={`
                    text-xs
                    font-semibold
                    px-2
                    py-1
                    rounded-full
                    ${getStatusClasses(
                      assignment.status
                    )}
                  `}
                >
                  {assignment.status}
                </span>
              </div>

              {/* Vehicle Information */}

              <div className="mt-5 space-y-4">

                {/* Mileage */}

                <div className="flex items-center gap-3">
                  <Truck
                    size={17}
                    className="text-gray-400"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Mileage
                    </p>

                    <p className="font-medium">
                      {vehicle.mileage.toLocaleString()}{" "}
                      miles
                    </p>
                  </div>
                </div>

                {/* Maintenance */}

                <div className="flex items-center gap-3">
                  <Wrench
                    size={17}
                    className="text-gray-400"
                  />

                  <div>
                    <p className="text-xs text-gray-500">
                      Next Maintenance
                    </p>

                    <p className="font-medium">
                      {vehicle.maintenance}
                    </p>
                  </div>
                </div>

                {/* Crew Assignment */}

                <div className="flex items-center gap-3">
                  <Users
                    size={17}
                    className="text-gray-400"
                  />

                  <div className="flex-1">
                    <p className="text-xs text-gray-500">
                      Assigned Crew
                    </p>

                    <p className="font-medium">
                      {crew?.name ||
                        "No crew assigned"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Control */}

              <div className="mt-5">
                <label className="block text-xs font-semibold text-gray-500 mb-2">
                  Truck Status
                </label>

                <select
                  value={assignment.status}
                  onChange={(event) =>
                    updateStatus(
                      vehicle.id,
                      event.target
                        .value as VehicleStatus
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    bg-white
                    outline-none
                    focus:ring-2
                    focus:ring-blue-100
                    focus:border-brand-blue
                  "
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Assigned">
                    Assigned
                  </option>

                  <option value="Maintenance">
                    Maintenance
                  </option>

                  <option value="Out of Service">
                    Out of Service
                  </option>
                </select>
              </div>

              {/* Crew Assignment Control */}

              <div className="mt-4">
                <label className="block text-xs font-semibold text-gray-500 mb-2">
                  Assign Crew
                </label>

                <select
                  value={assignment.crewId}
                  onChange={(event) =>
                    updateCrew(
                      vehicle.id,
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    bg-white
                    outline-none
                    focus:ring-2
                    focus:ring-blue-100
                    focus:border-brand-blue
                  "
                >
                  <option value="">
                    No crew assigned
                  </option>

                  {crews.map((crew) => (
                    <option
                      key={crew.id}
                      value={crew.id}
                    >
                      {crew.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Maintenance Warning */}

              {assignment.status ===
                "Maintenance" && (
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-yellow-50
                    border
                    border-yellow-200
                    px-3
                    py-2
                  "
                >
                  <CalendarDays
                    size={16}
                    className="text-yellow-600"
                  />

                  <p className="text-xs text-yellow-700">
                    Truck is scheduled for
                    maintenance.
                  </p>
                </div>
              )}

              {/* Out of Service Warning */}

              {assignment.status ===
                "Out of Service" && (
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-red-50
                    border
                    border-red-200
                    px-3
                    py-2
                  "
                >
                  <Truck
                    size={16}
                    className="text-red-600"
                  />

                  <p className="text-xs text-red-700">
                    Truck is currently out of
                    service.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}