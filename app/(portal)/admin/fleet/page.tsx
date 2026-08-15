"use client";

import { useEffect, useState } from "react";
import { Truck, X } from "lucide-react";

import {
  getVehicles,
  updateVehicle,
  deactivateVehicle,
  type Vehicle,
} from "@/data/vehicles";

export default function AdminFleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedVehicle, setSelectedVehicle] =
    useState<Vehicle | null>(null);
  const [deactivating, setDeactivating] =
  useState(false);

  const [showDeactivateConfirm, setShowDeactivateConfirm] =
  useState(false);  

  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");
  const [editMileage, setEditMileage] = useState("");
  const [editMaintenance, setEditMaintenance] =
    useState("");

  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await getVehicles();

        setVehicles(data);
      } catch (error) {
        console.error(
          "Unable to load vehicles:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load vehicles."
        );
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const openVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);

    setEditName(vehicle.name);
    setEditType(vehicle.type);
    setEditMileage(
      vehicle.mileage.toString()
    );
    setEditMaintenance(vehicle.maintenance);

    setEditError("");
  };

  const handleSaveVehicle = async () => {
    if (!selectedVehicle) {
      return;
    }

    setEditError("");

    if (!editName.trim()) {
      setEditError("Vehicle name is required.");
      return;
    }

    if (!editType.trim()) {
      setEditError("Vehicle type is required.");
      return;
    }

    if (
      editMileage === "" ||
      Number(editMileage) < 0
    ) {
      setEditError(
        "Please enter a valid mileage."
      );
      return;
    }

    setSaving(true);

    try {
      const updatedVehicle =
        await updateVehicle({
          ...selectedVehicle,
          name: editName.trim(),
          type: editType.trim(),
          mileage: Number(editMileage),
          maintenance:
            editMaintenance.trim(),
        });

      setVehicles((current) =>
        current.map((vehicle) =>
          vehicle.id === updatedVehicle.id
            ? updatedVehicle
            : vehicle
        )
      );

      setSelectedVehicle(null);
    } catch (error) {
      console.error(
        "Unable to save vehicle:",
        error
      );

      setEditError(
        error instanceof Error
          ? error.message
          : "Unable to save vehicle."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivateVehicle = async () => {
  if (!selectedVehicle) {
    return;
  }

  setDeactivating(true);
  setEditError("");

  try {
    await deactivateVehicle(
      selectedVehicle.id
    );

    setVehicles((current) =>
      current.map((vehicle) =>
        vehicle.id === selectedVehicle.id
          ? {
              ...vehicle,
              active: false,
            }
          : vehicle
      )
    );

    setSelectedVehicle(null);
    setShowDeactivateConfirm(false);
  } catch (error) {
    console.error(
      "Unable to deactivate vehicle:",
      error
    );

    setEditError(
      error instanceof Error
        ? error.message
        : "Unable to deactivate vehicle."
    );
  } finally {
    setDeactivating(false);
  }
};

  return (
    <div>
      {/* Header */}

      <div>
        <h2 className="text-2xl font-bold text-brand-blue">
          Fleet Management
        </h2>

        <p className="mt-2 text-gray-600">
          Manage HLD fleet vehicles and vehicle
          information.
        </p>
      </div>

      {/* Loading */}

      {loading && (
        <div className="mt-8 rounded-xl border bg-white p-6">
          <p className="text-gray-600">
            Loading vehicles...
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

      {/* Vehicle Table */}

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
                    Vehicle
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Type
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Mileage
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Maintenance
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    onClick={() =>
                      openVehicle(vehicle)
                    }
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-brand-blue">
                        {vehicle.id}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                          <Truck
                            size={18}
                            className="text-brand-blue"
                          />
                        </div>

                        <span className="font-medium">
                          {vehicle.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {vehicle.type}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {vehicle.mileage.toLocaleString()}{" "}
                      miles
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {vehicle.maintenance ||
                        "Not scheduled"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={
                          vehicle.active
                            ? "rounded-full bg-green-100 px-3 py-1 text-sm text-green-700"
                            : "rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                        }
                      >
                        {vehicle.active
                          ? "Active"
                          : "Retired"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}

      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-brand-blue">
                  Edit Vehicle
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Vehicle ID:{" "}
                  {selectedVehicle.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedVehicle(null)
                }
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="p-6">
              {editError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm text-red-700">
                    {editError}
                  </p>
                </div>
              )}

              <div className="grid gap-5">
                {/* Name */}

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Vehicle Name
                  </label>

                  <input
                    type="text"
                    value={editName}
                    onChange={(event) =>
                      setEditName(
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                  />
                </div>

                {/* Type */}

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Vehicle Type
                  </label>

                  <input
                    type="text"
                    value={editType}
                    onChange={(event) =>
                      setEditType(
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                  />
                </div>

                {/* Mileage */}

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Mileage
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={editMileage}
                    onChange={(event) =>
                      setEditMileage(
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                  />
                </div>

                {/* Maintenance */}

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Next Maintenance
                  </label>

                  <input
                    type="text"
                    value={editMaintenance}
                    onChange={(event) =>
                      setEditMaintenance(
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}

            <div className="flex justify-between border-t px-6 py-4">
  <button
    type="button"
    onClick={() =>
      setShowDeactivateConfirm(true)
    }
    disabled={
      !selectedVehicle.active ||
      saving ||
      deactivating
    }
    className="
      rounded-lg
      border
      border-red-200
      px-4
      py-2
      font-medium
      text-red-600
      hover:bg-red-50
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
  >
    Retire Vehicle
  </button>

  <div className="flex gap-3">
    <button
      type="button"
      onClick={() =>
        setSelectedVehicle(null)
      }
      className="
        rounded-lg
        border
        px-4
        py-2
        hover:bg-gray-50
      "
    >
      Cancel
    </button>

    <button
      type="button"
      onClick={handleSaveVehicle}
      disabled={saving}
      className="
        rounded-lg
        bg-brand-blue
        px-4
        py-2
        font-medium
        text-white
        hover:opacity-90
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {saving
        ? "Saving..."
        : "Save Changes"}
    </button>
  </div>
</div>
{showDeactivateConfirm &&
  selectedVehicle && (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900">
            Retire Vehicle
          </h3>

          <p className="mt-3 text-gray-600">
            Are you sure you want to retire{" "}
            <span className="font-semibold">
              {selectedVehicle.name}
            </span>
            ?
          </p>

          <p className="mt-2 text-sm text-gray-500">
            The vehicle will remain in HOP so
            historical scheduling records are
            preserved.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={() =>
              setShowDeactivateConfirm(false)
            }
            disabled={deactivating}
            className="
              rounded-lg
              border
              px-4
              py-2
              hover:bg-gray-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDeactivateVehicle}
            disabled={deactivating}
            className="
              rounded-lg
              bg-red-600
              px-4
              py-2
              font-medium
              text-white
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {deactivating
              ? "Retiring..."
              : "Yes, Retire Vehicle"}
          </button>
        </div>
      </div>
    </div>
  )}
    
    </div>
    </div>
      )}
    </div>
  );
}