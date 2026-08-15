"use client";

import {
  Search,
  Plus,
  Truck,
  Wrench,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  getActiveVehicles,
  createVehicle,
  type Vehicle,
} from "@/data/vehicles";

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [newVehicle, setNewVehicle] = useState({
    id: "",
    name: "",
    type: "",
    mileage: "",
    maintenance: "",
  });

  const loadVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const vehicleData = await getActiveVehicles();

      setVehicles(vehicleData);
    } catch (error) {
      console.error("Unable to load vehicles:", error);

      setError("Unable to load vehicles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const search = searchTerm.toLowerCase();

    return (
      vehicle.id.toLowerCase().includes(search) ||
      vehicle.name.toLowerCase().includes(search) ||
      vehicle.type.toLowerCase().includes(search)
    );
  });

  const handleAddVehicle = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !newVehicle.id.trim() ||
      !newVehicle.name.trim() ||
      !newVehicle.type.trim()
    ) {
      setError("Vehicle ID, name, and type are required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await createVehicle({
        id: newVehicle.id.trim(),
        name: newVehicle.name.trim(),
        type: newVehicle.type.trim(),
        mileage: Number(newVehicle.mileage) || 0,
        maintenance: newVehicle.maintenance.trim(),
        active: true,
      });

      setNewVehicle({
        id: "",
        name: "",
        type: "",
        mileage: "",
        maintenance: "",
      });

      setShowAddVehicle(false);

      await loadVehicles();
    } catch (error) {
      console.error("Unable to add vehicle:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to add vehicle."
      );
    } finally {
      setSaving(false);
    }
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
            View and add HLD fleet vehicles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setShowAddVehicle(true);
          }}
          className="
            flex
            items-center
            gap-2
            rounded-lg
            bg-brand-blue
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            hover:opacity-90
            transition
          "
        >
          <Plus size={18} />

          Add Vehicle
        </button>
      </div>

      {/* Error */}

      {error && (
        <div
          className="
            mb-6
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {/* Search */}

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search vehicles..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              py-2.5
              pl-10
              pr-4
              text-sm
              outline-none
              focus:border-brand-blue
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>
      </div>

      {/* Vehicle Table */}

      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-gray-200
          bg-white
          shadow-sm
        "
      >
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Loading vehicles...
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="p-8 text-center">
            <Truck
              size={32}
              className="mx-auto mb-3 text-gray-300"
            />

            <p className="font-medium text-gray-700">
              No vehicles found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try a different search or add a new vehicle.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th
                    className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-gray-500
                    "
                  >
                    Vehicle ID
                  </th>

                  <th
                    className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-gray-500
                    "
                  >
                    Vehicle
                  </th>

                  <th
                    className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-gray-500
                    "
                  >
                    Type
                  </th>

                  <th
                    className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-gray-500
                    "
                  >
                    Mileage
                  </th>

                  <th
                    className="
                      px-5
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                      text-gray-500
                    "
                  >
                    Next Maintenance
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="
                      border-b
                      border-gray-100
                      last:border-b-0
                      hover:bg-gray-50
                    "
                  >
                    <td className="px-5 py-4">
                      <span className="font-medium text-brand-blue">
                        {vehicle.id}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-lg
                            bg-blue-50
                          "
                        >
                          <Truck
                            size={18}
                            className="text-brand-blue"
                          />
                        </div>

                        <span className="font-medium text-gray-800">
                          {vehicle.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {vehicle.type}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {vehicle.mileage.toLocaleString()} miles
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Wrench
                          size={16}
                          className="text-gray-400"
                        />

                        <span className="text-sm text-gray-600">
                          {vehicle.maintenance || "Not scheduled"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Vehicle Modal */}

      {showAddVehicle && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-xl
              bg-white
              shadow-xl
            "
          >
            {/* Modal Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-gray-200
                px-6
                py-4
              "
            >
              <div>
                <h3 className="text-lg font-bold text-brand-blue">
                  Add Vehicle
                </h3>

                <p className="mt-0.5 text-sm text-gray-500">
                  Add a vehicle to the HLD fleet.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowAddVehicle(false)}
                className="
                  rounded-lg
                  p-2
                  text-gray-400
                  hover:bg-gray-100
                  hover:text-gray-600
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}

            <form
              onSubmit={handleAddVehicle}
              className="p-6"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Vehicle ID */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Vehicle ID
                  </label>

                  <input
                    type="text"
                    value={newVehicle.id}
                    onChange={(event) =>
                      setNewVehicle((current) => ({
                        ...current,
                        id: event.target.value,
                      }))
                    }
                    placeholder="T-30"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      px-3
                      py-2.5
                      text-sm
                      outline-none
                      focus:border-brand-blue
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />
                </div>

                {/* Vehicle Name */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Vehicle Name
                  </label>

                  <input
                    type="text"
                    value={newVehicle.name}
                    onChange={(event) =>
                      setNewVehicle((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Truck 30"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      px-3
                      py-2.5
                      text-sm
                      outline-none
                      focus:border-brand-blue
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />
                </div>

                {/* Vehicle Type */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Vehicle Type
                  </label>

                  <input
                    type="text"
                    value={newVehicle.type}
                    onChange={(event) =>
                      setNewVehicle((current) => ({
                        ...current,
                        type: event.target.value,
                      }))
                    }
                    placeholder="Bucket Truck"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      px-3
                      py-2.5
                      text-sm
                      outline-none
                      focus:border-brand-blue
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />
                </div>

                {/* Mileage */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mileage
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={newVehicle.mileage}
                    onChange={(event) =>
                      setNewVehicle((current) => ({
                        ...current,
                        mileage: event.target.value,
                      }))
                    }
                    placeholder="25000"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      px-3
                      py-2.5
                      text-sm
                      outline-none
                      focus:border-brand-blue
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />
                </div>

                {/* Maintenance */}

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Next Maintenance
                  </label>

                  <input
                    type="text"
                    value={newVehicle.maintenance}
                    onChange={(event) =>
                      setNewVehicle((current) => ({
                        ...current,
                        maintenance: event.target.value,
                      }))
                    }
                    placeholder="2026-09-15"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      px-3
                      py-2.5
                      text-sm
                      outline-none
                      focus:border-brand-blue
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  />
                </div>
              </div>

              {/* Buttons */}

              <div
                className="
                  mt-6
                  flex
                  justify-end
                  gap-3
                  border-t
                  border-gray-100
                  pt-5
                "
              >
                <button
                  type="button"
                  onClick={() => setShowAddVehicle(false)}
                  className="
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-600
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    rounded-lg
                    bg-brand-blue
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    hover:opacity-90
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {saving
                    ? "Saving..."
                    : "Save Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}