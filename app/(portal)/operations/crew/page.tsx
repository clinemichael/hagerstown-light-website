"use client";

import {
  Users,
  UserCheck,
  Truck,
  CalendarDays,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  getCrews,
  type Crew,
  type CrewStatus,
} from "@/data/crews";

import {
  getActiveEmployees,
  type Employee,
} from "@/data/employees";

import {
  getActiveVehicles,
  type Vehicle,
} from "@/data/vehicles";

export default function CrewPage() {
  const [crews, setCrews] =
    useState<Crew[]>([]);

  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadCrewData = async () => {
      try {
        const [
          crewData,
          employeeData,
          vehicleData,
        ] = await Promise.all([
          getCrews(),
          getActiveEmployees(),
          getActiveVehicles(),
        ]);

        setCrews(crewData);
        setEmployees(employeeData);
        setVehicles(vehicleData);
      } catch (error) {
        console.error(
          "Unable to load crew data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadCrewData();
  }, []);

  const getEmployeeName = (
    employeeId: string
  ) => {
    return (
      employees.find(
        (employee) =>
          employee.id === employeeId
      )?.name || "Unknown Employee"
    );
  };

  const getVehicleName = (
    vehicleId: string
  ) => {
    return (
      vehicles.find(
        (vehicle) =>
          vehicle.id === vehicleId
      )?.name || "Unknown Vehicle"
    );
  };

  const getStatusClasses = (
    status: CrewStatus
  ) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";

      case "Assigned":
        return "bg-blue-100 text-blue-700";

      case "Unavailable":
      case "On Leave":
        return "bg-red-100 text-red-700";

      case "Training":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-gray-500">
          Loading crews...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">
            Operations Crews
          </h2>

          <p className="text-gray-600 mt-1">
            Manage crews, personnel, vehicles,
            and current assignments.
          </p>
        </div>
      </div>

      {/* Crew Cards */}

      {crews.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <Users
            size={40}
            className="mx-auto text-gray-300"
          />

          <p className="mt-3 font-semibold text-gray-700">
            No crews found
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Crew records will appear here once
            they are added to Supabase.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >
          {crews.map((crew) => {
            const memberIds = [
              crew.leadId,
              ...crew.memberIds,
            ];

            return (
              <div
                key={crew.id}
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
                {/* Crew Header */}

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        w-11
                        h-11
                        rounded-lg
                        bg-blue-50
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Users
                        size={22}
                        className="text-brand-blue"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        {crew.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Lead:{" "}
                        {getEmployeeName(
                          crew.leadId
                        )}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`
                      text-xs
                      font-semibold
                      px-2
                      py-1
                      rounded-full
                      ${getStatusClasses(
                        crew.status
                      )}
                    `}
                  >
                    {crew.status}
                  </span>
                </div>

                {/* Assignment */}

                <div className="mt-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Current Assignment
                  </p>

                  <p className="font-medium mt-1">
                    {crew.assignment ||
                      "No current assignment"}
                  </p>
                </div>

                {/* Members */}

                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <UserCheck
                      size={17}
                      className="text-gray-400"
                    />

                    <p className="text-sm font-semibold text-gray-700">
                      Crew Members
                    </p>
                  </div>

                  <div className="space-y-2">
                    {memberIds.map(
                      (employeeId) => (
                        <div
                          key={employeeId}
                          className="
                            flex
                            items-center
                            justify-between
                            rounded-lg
                            bg-gray-50
                            px-3
                            py-2
                          "
                        >
                          <span className="text-sm">
                            {getEmployeeName(
                              employeeId
                            )}
                          </span>

                          {employeeId ===
                            crew.leadId && (
                            <span className="text-xs font-semibold text-brand-blue">
                              Lead
                            </span>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Vehicles */}

                <div className="mt-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck
                      size={17}
                      className="text-gray-400"
                    />

                    <p className="text-sm font-semibold text-gray-700">
                      Assigned Vehicles
                    </p>
                  </div>

                  <div className="space-y-2">
                    {crew.vehicleIds.length ===
                    0 ? (
                      <p className="text-sm text-gray-400">
                        No vehicles assigned
                      </p>
                    ) : (
                      crew.vehicleIds.map(
                        (vehicleId) => (
                          <div
                            key={vehicleId}
                            className="
                              flex
                              items-center
                              justify-between
                              rounded-lg
                              bg-gray-50
                              px-3
                              py-2
                            "
                          >
                            <span className="text-sm">
                              {getVehicleName(
                                vehicleId
                              )}
                            </span>

                            <span className="text-xs text-gray-400">
                              {vehicleId}
                            </span>
                          </div>
                        )
                      )
                    )}
                  </div>
                </div>

                {/* Summary */}

                <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Users
                      size={16}
                      className="text-gray-400"
                    />

                    <div>
                      <p className="text-xs text-gray-500">
                        Members
                      </p>

                      <p className="font-semibold">
                        {memberIds.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={16}
                      className="text-gray-400"
                    />

                    <div>
                      <p className="text-xs text-gray-500">
                        Vehicles
                      </p>

                      <p className="font-semibold">
                        {crew.vehicleIds.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}