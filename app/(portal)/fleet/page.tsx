"use client";

import {
  CalendarDays,
  Gauge,
  Plus,
  Trash2,
  Truck,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";

import {
  vehicles as initialVehicles,
  type Vehicle,
} from "@/data/vehicles";

export default function FleetPage() {
  const [vehicles, setVehicles] =
    useState<Vehicle[]>(initialVehicles);

  const [showForm, setShowForm] = useState(false);
  const [editingVehicle, setEditingVehicle] =
    useState<Vehicle | null>(null);
  const [vehicleToDelete, setVehicleToDelete] =
    useState<Vehicle | null>(null);

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [mileage, setMileage] = useState("");
  const [maintenance, setMaintenance] = useState("");

  const resetForm = () => {
    setName("");
    setId("");
    setType("");
    setMileage("");
    setMaintenance("");
  };

  const closeForm = () => {
    resetForm();
    setEditingVehicle(null);
    setShowForm(false);
  };

  const openCreateForm = () => {
    resetForm();
    setEditingVehicle(null);
    setShowForm(true);
  };

  const openEditForm = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);

    setName(vehicle.name);
    setId(vehicle.id);
    setType(vehicle.type);
    setMileage(vehicle.mileage.toString());
    setMaintenance(vehicle.maintenance);

    setShowForm(true);
  };

  const saveVehicle = () => {
    if (
      !name.trim() ||
      !id.trim() ||
      !type.trim() ||
      !mileage.trim() ||
      !maintenance
    ) {
      return;
    }

    const updatedVehicle: Vehicle = {
      id: id.trim(),
      name: name.trim(),
      type: type.trim(),
      mileage: Number(mileage),
      maintenance,
    };

    if (editingVehicle) {
      setVehicles((current) =>
        current.map((vehicle) =>
          vehicle.id === editingVehicle.id
            ? updatedVehicle
            : vehicle
        )
      );
    } else {
      setVehicles((current) => [
        ...current,
        updatedVehicle,
      ]);
    }

    closeForm();
  };

  const deleteVehicle = () => {
    if (!vehicleToDelete) {
      return;
    }

    setVehicles((current) =>
      current.filter(
        (vehicle) =>
          vehicle.id !== vehicleToDelete.id
      )
    );

    setVehicleToDelete(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">
            Fleet
          </h2>

          <p className="text-gray-600 mt-1">
            Manage vehicle information, mileage, and maintenance.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="
            inline-flex
            items-center
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
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      {/* Vehicle List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                  Vehicle
                </th>

                <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                  ID
                </th>

                <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                  Type
                </th>

                <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                  Mileage
                </th>

                <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">
                  Next Maintenance
                </th>

                <th className="text-right px-5 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          w-9
                          h-9
                          rounded-lg
                          bg-blue-50
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Truck
                          size={18}
                          className="text-brand-blue"
                        />
                      </div>

                      <span className="font-semibold text-gray-800">
                        {vehicle.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {vehicle.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {vehicle.type}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-700">
                    {vehicle.mileage.toLocaleString()} mi
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">
                    {vehicle.maintenance}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(vehicle)
                        }
                        className="
                          px-3
                          py-1.5
                          text-sm
                          font-semibold
                          text-brand-blue
                          border
                          border-gray-200
                          rounded-lg
                          hover:bg-blue-50
                        "
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setVehicleToDelete(vehicle)
                        }
                        className="
                          px-3
                          py-1.5
                          text-sm
                          font-semibold
                          text-red-600
                          border
                          border-red-200
                          rounded-lg
                          hover:bg-red-50
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-brand-blue">
                  {editingVehicle
                    ? "Edit Vehicle"
                    : "Add Vehicle"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {editingVehicle
                    ? "Update vehicle information."
                    : "Add a vehicle to the fleet."}
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Truck 28"
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle ID
                </label>

                <input
                  type="text"
                  value={id}
                  onChange={(event) =>
                    setId(event.target.value)
                  }
                  placeholder="T-28"
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Type
                </label>

                <input
                  type="text"
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value)
                  }
                  placeholder="Bucket Truck"
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mileage
                </label>

                <input
                  type="number"
                  min="0"
                  value={mileage}
                  onChange={(event) =>
                    setMileage(event.target.value)
                  }
                  placeholder="45000"
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Next Maintenance
                </label>

                <input
                  type="date"
                  value={maintenance}
                  onChange={(event) =>
                    setMaintenance(event.target.value)
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
                onClick={saveVehicle}
                disabled={
                  !name.trim() ||
                  !id.trim() ||
                  !type.trim() ||
                  !mileage.trim() ||
                  !maintenance
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
                {editingVehicle
                  ? "Save Changes"
                  : "Create Vehicle"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {vehicleToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Delete Vehicle?
            </h3>

            <p className="mt-2 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {vehicleToDelete.name}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-gray-500">
              This will remove the vehicle from the fleet.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() =>
                  setVehicleToDelete(null)
                }
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
                onClick={deleteVehicle}
                className="
                  px-4
                  py-2
                  bg-red-600
                  text-white
                  rounded-lg
                  text-sm
                  font-semibold
                  hover:bg-red-700
                "
              >
                Delete Vehicle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}