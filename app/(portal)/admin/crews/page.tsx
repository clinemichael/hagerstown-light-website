"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Truck,
  X,
} from "lucide-react";

import {
  getCrews,
  updateCrew,
  deactivateCrew,
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

export default function AdminCrewsPage() {
  const [crews, setCrews] =
    useState<Crew[]>([]);

  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedCrew, setSelectedCrew] =
    useState<Crew | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editLeadId, setEditLeadId] =
    useState("");

  const [editMemberIds, setEditMemberIds] =
    useState<string[]>([]);

  const [editVehicleIds, setEditVehicleIds] =
    useState<string[]>([]);

  const [editStatus, setEditStatus] =
    useState<CrewStatus>("Available");

  const [editAssignment, setEditAssignment] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [editError, setEditError] =
    useState("");

  const [showDeactivateConfirm, setShowDeactivateConfirm] =
    useState(false);

  const [deactivating, setDeactivating] =
    useState(false);

  useEffect(() => {
    const loadCrewData = async () => {
      try {
        setLoading(true);
        setError("");

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
          "Unable to load crews:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load crews."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCrewData();
  }, []);

  const openEditCrew = (crew: Crew) => {
    setSelectedCrew(crew);

    setEditName(crew.name);
    setEditLeadId(crew.leadId);
    setEditMemberIds(crew.memberIds);
    setEditVehicleIds(crew.vehicleIds);
    setEditStatus(crew.status);
    setEditAssignment(crew.assignment);

    setEditError("");
  };

  const closeEditCrew = () => {
    if (saving) {
      return;
    }

    setSelectedCrew(null);
    setEditError("");
  };

  const toggleMember = (
    employeeId: string
  ) => {
    setEditMemberIds((current) =>
      current.includes(employeeId)
        ? current.filter(
            (id) => id !== employeeId
          )
        : [...current, employeeId]
    );
  };

  const toggleVehicle = (
    vehicleId: string
  ) => {
    setEditVehicleIds((current) =>
      current.includes(vehicleId)
        ? current.filter(
            (id) => id !== vehicleId
          )
        : [...current, vehicleId]
    );
  };

  const handleSaveCrew = async () => {
    if (!selectedCrew) {
      return;
    }

    setEditError("");

    if (!editName.trim()) {
      setEditError(
        "Crew name is required."
      );
      return;
    }

    if (!editLeadId) {
      setEditError(
        "Please select a crew lead."
      );
      return;
    }

    if (
      !editMemberIds.includes(
        editLeadId
      )
    ) {
      setEditError(
        "The crew lead must also be a crew member."
      );
      return;
    }

    if (!editStatus) {
      setEditError(
        "Please select a crew status."
      );
      return;
    }

    setSaving(true);

    try {
      await updateCrew(
        selectedCrew.id,
        {
          name: editName.trim(),
          leadId: editLeadId,
          memberIds: editMemberIds,
          vehicleIds: editVehicleIds,
          status: editStatus,
          assignment:
            editAssignment.trim() ||
            "No current assignment",
        }
      );

      const updatedCrew: Crew = {
        ...selectedCrew,
        name: editName.trim(),
        leadId: editLeadId,
        memberIds: editMemberIds,
        vehicleIds: editVehicleIds,
        status: editStatus,
        assignment:
          editAssignment.trim() ||
          "No current assignment",
      };

      setCrews((current) =>
        current.map((crew) =>
          crew.id === selectedCrew.id
            ? updatedCrew
            : crew
        )
      );

      setSelectedCrew(null);
    } catch (error) {
      console.error(
        "Unable to save crew:",
        error
      );

      setEditError(
        error instanceof Error
          ? error.message
          : "Unable to save crew."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivateCrew = async () => {
  if (!selectedCrew) {
    return;
  }

  setDeactivating(true);
  setEditError("");

  try {
    await deactivateCrew(
      selectedCrew.id
    );

    const refreshedCrews =
      await getCrews();

    setCrews(refreshedCrews);

    setSelectedCrew(null);
    setShowDeactivateConfirm(false);
  } catch (error) {
    console.error(
      "Unable to deactivate crew:",
      error
    );

    setEditError(
      error instanceof Error
        ? error.message
        : "Unable to deactivate crew."
    );
  } finally {
    setDeactivating(false);
  }
};

  const getEmployeeName = (
    employeeId: string
  ) => {
    return (
      employees.find(
        (employee) =>
          employee.id === employeeId
      )?.name ||
      "Unknown Employee"
    );
  };

  const getVehicleName = (
    vehicleId: string
  ) => {
    return (
      vehicles.find(
        (vehicle) =>
          vehicle.id === vehicleId
      )?.name ||
      "Unknown Vehicle"
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
      <div>
        <h1 className="text-2xl font-bold text-brand-blue">
          Crew Management
        </h1>

        <div className="mt-8 rounded-xl border bg-white p-6">
          <p className="text-gray-600">
            Loading crews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-blue">
          Crew Management
        </h1>

        <p className="mt-2 text-gray-600">
          Manage crews, personnel, vehicles,
          and crew status.
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

      {/* Crew Table */}

      {!error && (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Crew
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Lead
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Members
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Vehicles
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Assignment
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {crews.map((crew) => (
                  <tr
                    key={crew.id}
                    onClick={() =>
                      openEditCrew(crew)
                    }
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">
                          {crew.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          {crew.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {crew.leadId
                        ? getEmployeeName(
                            crew.leadId
                          )
                        : "No lead assigned"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users
                          size={16}
                          className="text-gray-400"
                        />

                        <span>
                          {crew.memberIds.length}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Truck
                          size={16}
                          className="text-gray-400"
                        />

                        <span>
                          {crew.vehicleIds.length}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm ${getStatusClasses(
                          crew.status
                        )}`}
                      >
                        {crew.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {crew.assignment ||
                        "No current assignment"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}

      {selectedCrew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
            {/* Modal Header */}

            <div className="flex items-start justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  Edit Crew
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Crew ID:{" "}
                  {selectedCrew.id}
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditCrew}
                disabled={saving}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="space-y-6 px-6 py-6">
              {editError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-700">
                    {editError}
                  </p>
                </div>
              )}

              {/* Name */}

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Crew Name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) =>
                    setEditName(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                />
              </div>

              {/* Lead */}

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Crew Lead
                </label>

                <select
                  value={editLeadId}
                  onChange={(e) =>
                    setEditLeadId(
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                >
                  <option value="">
                    Select crew lead
                  </option>

                  {employees.map(
                    (employee) => (
                      <option
                        key={employee.id}
                        value={employee.id}
                      >
                        {employee.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Members */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Crew Members
                </label>

                <div className="grid gap-2 rounded-lg border p-3 md:grid-cols-2">
                  {employees.map(
                    (employee) => (
                      <label
                        key={employee.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={editMemberIds.includes(
                            employee.id
                          )}
                          onChange={() =>
                            toggleMember(
                              employee.id
                            )
                          }
                          className="h-4 w-4"
                        />

                        <span className="text-sm">
                          {employee.name}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Vehicles */}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Assigned Vehicles
                </label>

                <div className="grid gap-2 rounded-lg border p-3 md:grid-cols-2">
                  {vehicles.map(
                    (vehicle) => (
                      <label
                        key={vehicle.id}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          checked={editVehicleIds.includes(
                            vehicle.id
                          )}
                          onChange={() =>
                            toggleVehicle(
                              vehicle.id
                            )
                          }
                          className="h-4 w-4"
                        />

                        <span className="text-sm">
                          {vehicle.name}
                        </span>

                        <span className="text-xs text-gray-400">
                          {vehicle.id}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Status */}

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Status
                </label>

                <select
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(
                      e.target
                        .value as CrewStatus
                    )
                  }
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Assigned">
                    Assigned
                  </option>

                  <option value="Unavailable">
                    Unavailable
                  </option>

                  <option value="On Leave">
                    On Leave
                  </option>

                  <option value="Training">
                    Training
                  </option>
                </select>
              </div>

              {/* Assignment */}

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Current Assignment
                </label>

                <input
                  type="text"
                  value={editAssignment}
                  onChange={(e) =>
                    setEditAssignment(
                      e.target.value
                    )
                  }
                  placeholder="No current assignment"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                />
              </div>
            </div>

            {/* Modal Footer */}

            <div className="flex items-center justify-between border-t px-6 py-4">
  <button
    type="button"
    onClick={() =>
      setShowDeactivateConfirm(true)
    }
    disabled={saving || deactivating}
    className="rounded-lg border border-red-200 px-4 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
  >
    Deactivate Crew
  </button>

  <div className="flex gap-3">
    <button
      type="button"
      onClick={closeEditCrew}
      disabled={saving || deactivating}
      className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
    >
      Cancel
    </button>

    <button
      type="button"
      onClick={handleSaveCrew}
      disabled={saving || deactivating}
      className="rounded-lg bg-brand-blue px-4 py-2 font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {saving
        ? "Saving..."
        : "Save Changes"}
    </button>
  </div>
</div>
</div>
        </div>
      )}
      {showDeactivateConfirm &&
  selectedCrew && (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="px-6 py-5">
          <h2 className="text-lg font-bold">
            Deactivate Crew
          </h2>

          <p className="mt-3 text-gray-600">
            Are you sure you want to deactivate{" "}
            <span className="font-semibold">
              {selectedCrew.name}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-gray-500">
            The crew will remain in HOP so
            historical scheduling records can
            be preserved.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={() =>
              setShowDeactivateConfirm(false)
            }
            disabled={deactivating}
            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDeactivateCrew}
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