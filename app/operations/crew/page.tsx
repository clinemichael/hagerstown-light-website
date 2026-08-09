"use client";

import {
  Plus,
  Trash2,
  Truck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const employees = [
  {
    id: "1001",
    name: "John Smith",
    title: "Lead Lineman",
  },
  {
    id: "1002",
    name: "Robert Jones",
    title: "Lineman",
  },
  {
    id: "1003",
    name: "Michael Davis",
    title: "Lineman",
  },
  {
    id: "1004",
    name: "James Wilson",
    title: "Apprentice Lineman",
  },
  {
    id: "1005",
    name: "David Miller",
    title: "Service Technician",
  },
];

const vehicles = [
  {
    id: "T-12",
    number: "Truck 12",
    type: "Bucket Truck",
  },
  {
    id: "T-18",
    number: "Truck 18",
    type: "Bucket Truck",
  },
  {
    id: "T-21",
    number: "Truck 21",
    type: "Line Truck",
  },
  {
    id: "T-24",
    number: "Truck 24",
    type: "Bucket Truck",
  },
  {
    id: "T-26",
    number: "Truck 26",
    type: "Service Truck",
  },
  {
    id: "ST-01",
    number: "Service Truck 1",
    type: "Service Truck",
  },
];

const initialCrews = [
  {
    name: "Line Crew 1",
    leadId: "1001",
    memberIds: ["1002", "1003"],
    vehicleIds: ["T-12", "T-18"],
    status: "Available",
    assignment: "No current assignment",
  },
  {
    name: "Line Crew 2",
    leadId: "1004",
    memberIds: ["1005"],
    vehicleIds: ["T-21", "T-24", "T-26"],
    status: "Available",
    assignment: "No current assignment",
  },
  {
    name: "Service Crew",
    leadId: "1005",
    memberIds: ["1003"],
    vehicleIds: ["ST-01"],
    status: "Available",
    assignment: "No current assignment",
  },
];

type Crew = (typeof initialCrews)[number];

export default function CrewPage() {
  const [crews, setCrews] = useState<Crew[]>(initialCrews);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [editingCrewIndex, setEditingCrewIndex] = useState<
    number | null
  >(null);

  const [crewToDeleteIndex, setCrewToDeleteIndex] = useState<
    number | null
  >(null);

  const [crewName, setCrewName] = useState("");
  const [leadId, setLeadId] = useState("");
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const [vehicleIds, setVehicleIds] = useState<string[]>([]);
  const [status, setStatus] = useState("Available");

  const getEmployee = (id: string) =>
    employees.find((employee) => employee.id === id);

  const getVehicle = (id: string) =>
    vehicles.find((vehicle) => vehicle.id === id);

  const resetForm = () => {
    setCrewName("");
    setLeadId("");
    setMemberIds([]);
    setVehicleIds([]);
    setStatus("Available");
  };

  const closeForm = () => {
    resetForm();
    setEditingCrewIndex(null);
    setShowCreateForm(false);
  };

  const openEditForm = (index: number) => {
    const crew = crews[index];

    setCrewName(crew.name);
    setLeadId(crew.leadId);
    setMemberIds([...crew.memberIds]);
    setVehicleIds([...crew.vehicleIds]);
    setStatus(crew.status);

    setEditingCrewIndex(index);
    setShowCreateForm(true);
  };

  const addMember = () => {
    setMemberIds([...memberIds, ""]);
  };

  const updateMember = (index: number, value: string) => {
    const updatedMembers = [...memberIds];

    updatedMembers[index] = value;

    setMemberIds(updatedMembers);
  };

  const removeMember = (index: number) => {
    setMemberIds(
      memberIds.filter((_, memberIndex) => memberIndex !== index)
    );
  };

  const addVehicle = () => {
    setVehicleIds([...vehicleIds, ""]);
  };

  const updateVehicle = (index: number, value: string) => {
    const updatedVehicles = [...vehicleIds];

    updatedVehicles[index] = value;

    setVehicleIds(updatedVehicles);
  };

  const removeVehicle = (index: number) => {
    setVehicleIds(
      vehicleIds.filter((_, vehicleIndex) => vehicleIndex !== index)
    );
  };

  const saveCrew = () => {
    if (!crewName.trim() || !leadId) {
      return;
    }

    if (editingCrewIndex !== null) {
      setCrews(
        crews.map((crew, index) =>
          index === editingCrewIndex
            ? {
                ...crew,
                name: crewName.trim(),
                leadId,
                memberIds: memberIds.filter(Boolean),
                vehicleIds: vehicleIds.filter(Boolean),
                status,
              }
            : crew
        )
      );
    } else {
      const newCrew: Crew = {
        name: crewName.trim(),
        leadId,
        memberIds: memberIds.filter(Boolean),
        vehicleIds: vehicleIds.filter(Boolean),
        status,
        assignment: "No current assignment",
      };

      setCrews([...crews, newCrew]);
    }

    closeForm();
  };

  const deleteCrew = () => {
    if (crewToDeleteIndex === null) {
      return;
    }

    setCrews(
      crews.filter(
        (_, index) => index !== crewToDeleteIndex
      )
    );

    setCrewToDeleteIndex(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">
            Crews
          </h2>

          <p className="text-gray-600 mt-1">
            Manage crew assignments, personnel, and vehicles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            resetForm();
            setEditingCrewIndex(null);
            setShowCreateForm(true);
          }}
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
          Create Crew
        </button>
      </div>

      {/* Crew Cards */}
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        {crews.map((crew, index) => {
          const lead = getEmployee(crew.leadId);

          return (
            <div
              key={`${crew.name}-${index}`}
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

                    {crew.memberIds.length + 1} members
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
                    <p className="text-xs text-gray-500">
                      Lead
                    </p>

                    <p className="font-semibold">
                      {lead?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {lead?.title}
                    </p>
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
                  {crew.memberIds.map((id) => {
                    const member = getEmployee(id);

                    return (
                      <div
                        key={id}
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

                        <span>
                          {member?.name}
                        </span>

                        <span className="text-xs text-gray-400">
                          {member?.title}
                        </span>
                      </div>
                    );
                  })}

                  {crew.memberIds.length === 0 && (
                    <p className="text-sm text-gray-400">
                      No additional members.
                    </p>
                  )}
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
                  {crew.vehicleIds.map((id) => {
                    const vehicle = getVehicle(id);

                    return (
                      <span
                        key={id}
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
                        {vehicle?.number}
                      </span>
                    );
                  })}

                  {crew.vehicleIds.length === 0 && (
                    <p className="text-sm text-gray-400">
                      No vehicles assigned.
                    </p>
                  )}
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
                  onClick={() =>
                    setCrewToDeleteIndex(index)
                  }
                  className="
                    flex-1
                    border
                    border-red-200
                    rounded-lg
                    py-2
                    text-sm
                    font-semibold
                    text-red-600
                    hover:bg-red-50
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

      {/* Create / Edit Crew Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-brand-blue">
                  {editingCrewIndex !== null
                    ? "Edit Crew"
                    : "Create Crew"}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {editingCrewIndex !== null
                    ? "Update crew information, personnel, and vehicles."
                    : "Create a new operations crew."}
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
            <div className="p-6 space-y-6">
              {/* Crew Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Crew Name
                </label>

                <input
                  type="text"
                  value={crewName}
                  onChange={(event) =>
                    setCrewName(event.target.value)
                  }
                  placeholder="Example: Line Crew 3"
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

              {/* Lead */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Crew Lead
                </label>

                <select
                  value={leadId}
                  onChange={(event) =>
                    setLeadId(event.target.value)
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
                >
                  <option value="">
                    Select crew lead
                  </option>

                  {employees.map((employee) => (
                    <option
                      key={employee.id}
                      value={employee.id}
                    >
                      {employee.name} — {employee.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Members */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Crew Members
                  </label>

                  <button
                    type="button"
                    onClick={addMember}
                    className="
                      inline-flex
                      items-center
                      gap-1
                      text-sm
                      font-semibold
                      text-brand-blue
                      hover:opacity-80
                    "
                  >
                    <Plus size={16} />
                    Add Member
                  </button>
                </div>

                <div className="space-y-2">
                  {memberIds.map((memberId, index) => (
                    <div
                      key={index}
                      className="flex gap-2"
                    >
                      <select
                        value={memberId}
                        onChange={(event) =>
                          updateMember(
                            index,
                            event.target.value
                          )
                        }
                        className="
                          flex-1
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
                          Select employee
                        </option>

                        {employees
                          .filter(
                            (employee) =>
                              employee.id !== leadId
                          )
                          .map((employee) => (
                            <option
                              key={employee.id}
                              value={employee.id}
                            >
                              {employee.name} —{" "}
                              {employee.title}
                            </option>
                          ))}
                      </select>

                      <button
                        type="button"
                        onClick={() =>
                          removeMember(index)
                        }
                        className="
                          px-3
                          text-gray-400
                          hover:text-red-500
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  {memberIds.length === 0 && (
                    <p className="text-sm text-gray-400">
                      No additional members selected.
                    </p>
                  )}
                </div>
              </div>

              {/* Vehicles */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Assigned Vehicles
                  </label>

                  <button
                    type="button"
                    onClick={addVehicle}
                    className="
                      inline-flex
                      items-center
                      gap-1
                      text-sm
                      font-semibold
                      text-brand-blue
                      hover:opacity-80
                    "
                  >
                    <Plus size={16} />
                    Add Vehicle
                  </button>
                </div>

                <div className="space-y-2">
                  {vehicleIds.map((vehicleId, index) => (
                    <div
                      key={index}
                      className="flex gap-2"
                    >
                      <select
                        value={vehicleId}
                        onChange={(event) =>
                          updateVehicle(
                            index,
                            event.target.value
                          )
                        }
                        className="
                          flex-1
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
                          Select vehicle
                        </option>

                        {vehicles.map((vehicle) => (
                          <option
                            key={vehicle.id}
                            value={vehicle.id}
                          >
                            {vehicle.number} —{" "}
                            {vehicle.type}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() =>
                          removeVehicle(index)
                        }
                        className="
                          px-3
                          text-gray-400
                          hover:text-red-500
                        "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}

                  {vehicleIds.length === 0 && (
                    <p className="text-sm text-gray-400">
                      No vehicles selected.
                    </p>
                  )}
                </div>
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

                  <option value="Unavailable">
                    Unavailable
                  </option>
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
                onClick={saveCrew}
                disabled={!crewName.trim() || !leadId}
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
                {editingCrewIndex !== null
                  ? "Update Crew"
                  : "Create Crew"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {crewToDeleteIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-800">
              Delete Crew?
            </h3>

            <p className="mt-2 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {crews[crewToDeleteIndex]?.name}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-gray-500">
              This will remove the crew from the
              operations portal.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() =>
                  setCrewToDeleteIndex(null)
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
                onClick={deleteCrew}
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
                Delete Crew
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
