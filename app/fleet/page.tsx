"use client";

import { Plus, Trash2, Truck, X } from "lucide-react";
import { useState } from "react";

const crews = [
  {
    id: "C-01",
    name: "Line Crew 1",
  },
  {
    id: "C-02",
    name: "Line Crew 2",
  },
  {
    id: "C-03",
    name: "Service Crew",
  },
];

const initialVehicles = [
  {
    id: "T-12",
    number: "Truck 12",
    type: "Bucket Truck",
    status: "Available",
    crewId: "C-01",
  },
  {
    id: "T-18",
    number: "Truck 18",
    type: "Bucket Truck",
    status: "Available",
    crewId: "C-01",
  },
  {
    id: "T-21",
    number: "Truck 21",
    type: "Line Truck",
    status: "Assigned",
    crewId: "C-02",
  },
  {
    id: "T-24",
    number: "Truck 24",
    type: "Bucket Truck",
    status: "Assigned",
    crewId: "C-02",
  },
  {
    id: "T-26",
    number: "Truck 26",
    type: "Service Truck",
    status: "Available",
    crewId: "C-02",
  },
  {
    id: "ST-01",
    number: "Service Truck 1",
    type: "Service Truck",
    status: "Assigned",
    crewId: "C-03",
  },
];

type Vehicle = (typeof initialVehicles)[number];

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);

  const [showForm, setShowForm] = useState(false);
  const [editingVehicleIndex, setEditingVehicleIndex] = useState<number | null>(
    null
  );
  const [vehicleToDelete, setVehicleToDelete] = useState<number | null>(null);

  const [vehicleId, setVehicleId] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("Bucket Truck");
  const [status, setStatus] = useState("Available");
  const [crewId, setCrewId] = useState("");

  const resetForm = () => {
    setVehicleId("");
    setVehicleNumber("");
    setVehicleType("Bucket Truck");
    setStatus("Available");
    setCrewId("");
  };

  const closeForm = () => {
    resetForm();
    setShowForm(false);
    setEditingVehicleIndex(null);
  };

  const openCreateForm = () => {
    resetForm();
    setEditingVehicleIndex(null);
    setShowForm(true);
  };

  const openEditForm = (index: number) => {
    const vehicle = vehicles[index];

    setVehicleId(vehicle.id);
    setVehicleNumber(vehicle.number);
    setVehicleType(vehicle.type);
    setStatus(vehicle.status);
    setCrewId(vehicle.crewId);

    setEditingVehicleIndex(index);
    setShowForm(true);
  };

  const saveVehicle = () => {
    if (!vehicleId.trim() || !vehicleNumber.trim()) {
      return;
    }

    if (editingVehicleIndex !== null) {
      setVehicles(
        vehicles.map((vehicle, index) =>
          index === editingVehicleIndex
            ? {
                ...vehicle,
                id: vehicleId.trim(),
                number: vehicleNumber.trim(),
                type: vehicleType,
                status,
                crewId,
              }
            : vehicle
        )
      );
    } else {
      const newVehicle: Vehicle = {
        id: vehicleId.trim(),
        number: vehicleNumber.trim(),
        type: vehicleType,
        status,
        crewId,
      };

      setVehicles([...vehicles, newVehicle]);
    }

    closeForm();
  };

  const deleteVehicle = () => {
    if (vehicleToDelete === null) {
      return;
    }

    setVehicles(
      vehicles.filter((_, index) => index !== vehicleToDelete)
    );

    setVehicleToDelete(null);
  };

  const getCrew = (id: string) =>
    crews.find((crew) => crew.id === id);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue">
            Fleet
          </h1>

          <p className="text-gray-600 mt-1">
            Manage vehicles, assignments, and fleet status.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
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
          <Plus size={18} />
          Add Vehicle
        </button>
      </div>

      {/* Fleet Cards */}
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {vehicles.map((vehicle, index) => {
          const crew = getCrew(vehicle.crewId);

          return (
            <div
              key={vehicle.id}
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
              {/* Vehicle Header */}
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
                    <Truck
                      size={22}
                      className="text-brand-blue"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-brand-blue">
                      {vehicle.number}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {vehicle.id}
                    </p>
                  </div>
                </div>

                <span
                  className={`
                    text-xs
                    font-semibold
                    px-3
                    py-1
                    rounded-full
                    ${
                      vehicle.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : vehicle.status === "Assigned"
                        ? "bg-blue-100 text-blue-700"
                        : vehicle.status === "Maintenance"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                >
                  {vehicle.status}
                </span>
              </div>

              {/* Vehicle Information */}
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs text-gray-500">
                    Vehicle Type
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {vehicle.type}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Current Crew
                  </p>

                  <p className="mt-1 font-semibold text-gray-700">
                    {crew?.name || "Unassigned"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => openEditForm(index)}
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
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => setVehicleToDelete(index)}
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
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Vehicle Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-brand-blue">
                  {editingVehicleIndex !== null
                    ? "Edit Vehicle"
                    : "Add Vehicle"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {editingVehicleIndex !== null
                    ? "Update vehicle information and assignment."
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
              {/* Vehicle ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle ID
                </label>

                <input
                  type="text"
                  value={vehicleId}
                  onChange={(event) =>
                    setVehicleId(event.target.value)
                  }
                  placeholder="Example: T-30"
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

              {/* Vehicle Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Number
                </label>

                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(event) =>
                    setVehicleNumber(event.target.value)
                  }
                  placeholder="Example: Truck 30"
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

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Vehicle Type
                </label>

                <select
                  value={vehicleType}
                  onChange={(event) =>
                    setVehicleType(event.target.value)
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
                  <option value="Bucket Truck">
                    Bucket Truck
                  </option>

                  <option value="Line Truck">
                    Line Truck
                  </option>

                  <option value="Service Truck">
                    Service Truck
                  </option>

                  <option value="Pickup Truck">
                    Pickup Truck
                  </option>

                  <option value="Trailer">
                    Trailer
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value)
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

              {/* Crew */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assigned Crew
                </label>

                <select
                  value={crewId}
                  onChange={(event) =>
                    setCrewId(event.target.value)
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
                  !vehicleId.trim() ||
                  !vehicleNumber.trim()
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
                {editingVehicleIndex !== null
                  ? "Update Vehicle"
                  : "Add Vehicle"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {vehicleToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-brand-blue">
              Delete Vehicle
            </h3>

            <p className="mt-2 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {vehicles[vehicleToDelete]?.number}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-gray-500">
              This will remove the vehicle from the operations portal.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setVehicleToDelete(null)}
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
