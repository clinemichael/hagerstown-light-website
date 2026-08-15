"use client";

import {
  Truck,
  Users,
  Wrench,
  CalendarDays,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  getActiveVehicles,
  type Vehicle,
} from "@/data/vehicles";

import {
  getCrews,
  type Crew,
} from "@/data/crews";

import {
  getVehicleOperations,
  updateVehicleOperation,
  type VehicleOperation,
  type VehicleStatus,
} from "@/data/vehicleOperations";

export default function FleetPage() {
  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  const [crews, setCrews] =
    useState<Crew[]>([]);

  const [assignments, setAssignments] =
    useState<VehicleOperation[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [savingVehicle, setSavingVehicle] =
    useState<string | null>(null);

  useEffect(() => {
    const loadFleetData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          vehicleData,
          crewData,
          operationData,
        ] = await Promise.all([
          getActiveVehicles(),
          getCrews(),
          getVehicleOperations(),
        ]);

        setVehicles(vehicleData);
        setCrews(crewData);
        setAssignments(operationData);
      } catch (error) {
        console.error(
          "Unable to load fleet data:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load fleet data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadFleetData();
  }, []);

  const updateStatus = async (
    vehicleId: string,
    status: VehicleStatus
  ) => {
    const currentAssignment =
      assignments.find(
        (item) =>
          item.vehicleId === vehicleId
      );

    const previousStatus =
      currentAssignment?.status ??
      "Available";

    setSavingVehicle(vehicleId);
    setError("");

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

    try {
      const updated =
        await updateVehicleOperation(
          vehicleId,
          {
            status,
          }
        );

      setAssignments((current) =>
        current.map((item) =>
          item.vehicleId === vehicleId
            ? updated
            : item
        )
      );
    } catch (error) {
      console.error(
        "Unable to update vehicle status:",
        error
      );

      setAssignments((current) =>
        current.map((item) =>
          item.vehicleId === vehicleId
            ? {
                ...item,
                status: previousStatus,
              }
            : item
        )
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to update vehicle status."
      );
    } finally {
      setSavingVehicle(null);
    }
  };

  const updateCrew = async (
    vehicleId: string,
    crewId: string
  ) => {
    const currentAssignment =
      assignments.find(
        (item) =>
          item.vehicleId === vehicleId
      );

    const previousCrewId =
      currentAssignment?.crewId ?? "";

    const previousStatus =
      currentAssignment?.status ??
      "Available";

    const newStatus =
      crewId &&
      previousStatus === "Available"
        ? "Assigned"
        : previousStatus;

    setSavingVehicle(vehicleId);
    setError("");

    setAssignments((current) =>
      current.map((item) =>
        item.vehicleId === vehicleId
          ? {
              ...item,
              crewId,
              status: newStatus,
            }
          : item
      )
    );

    try {
      const updated =
        await updateVehicleOperation(
          vehicleId,
          {
            crewId,
            status: newStatus,
          }
        );

      setAssignments((current) =>
        current.map((item) =>
          item.vehicleId === vehicleId
            ? updated
            : item
        )
      );
    } catch (error) {
      console.error(
        "Unable to update crew assignment:",
        error
      );

      setAssignments((current) =>
        current.map((item) =>
          item.vehicleId === vehicleId
            ? {
                ...item,
                crewId: previousCrewId,
                status: previousStatus,
              }
            : item
        )
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to update crew assignment."
      );
    } finally {
      setSavingVehicle(null);
    }
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

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-blue">
            Operations Fleet
          </h2>

          <p className="mt-1 text-gray-600">
            Manage truck status and crew
            assignments.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-gray-600">
            Loading fleet...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-brand-blue">
          Operations Fleet
        </h2>

        <p className="mt-1 text-gray-600">
          Manage truck status and crew
          assignments.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Fleet Cards */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
        "
      >
        {vehicles.map((vehicle) => {
          const assignment =
            assignments.find(
              (item) =>
                item.vehicleId ===
                vehicle.id
            ) || {
              vehicleId: vehicle.id,
              status:
                "Available" as VehicleStatus,
              crewId: "",
            };

          const crew = getCrew(
            assignment.crewId
          );

          const isSaving =
            savingVehicle ===
            vehicle.id;

          return (
            <div
              key={vehicle.id}
              className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
              "
            >
              {/* Vehicle Header */}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg
                      bg-blue-50
                    "
                  >
                    <Truck
                      size={21}
                      className="text-brand-blue"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">
                      {vehicle.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {vehicle.type}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      ID: {vehicle.id}
                    </p>
                  </div>
                </div>

                {/* Status */}

                <span
                  className={`
                    rounded-full
                    px-2
                    py-1
                    text-xs
                    font-semibold
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
                      {vehicle.maintenance ||
                        "Not scheduled"}
                    </p>
                  </div>
                </div>

                {/* Crew */}

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
                <label className="mb-2 block text-xs font-semibold text-gray-500">
                  Truck Status
                </label>

                <select
                  value={assignment.status}
                  disabled={isSaving}
                  onChange={(event) =>
                    updateStatus(
                      vehicle.id,
                      event.target
                        .value as VehicleStatus
                    )
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-brand-blue
                    focus:ring-2
                    focus:ring-blue-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
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

              {/* Crew Assignment */}

              <div className="mt-4">
                <label className="mb-2 block text-xs font-semibold text-gray-500">
                  Assign Crew
                </label>

                <select
                  value={assignment.crewId}
                  disabled={isSaving}
                  onChange={(event) =>
                    updateCrew(
                      vehicle.id,
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    py-2
                    text-sm
                    outline-none
                    focus:border-brand-blue
                    focus:ring-2
                    focus:ring-blue-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
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

              {/* Saving Indicator */}

              {isSaving && (
                <p className="mt-3 text-xs text-gray-500">
                  Saving...
                </p>
              )}

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
                    border
                    border-yellow-200
                    bg-yellow-50
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
                    border
                    border-red-200
                    bg-red-50
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