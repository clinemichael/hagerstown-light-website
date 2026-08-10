"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { crews } from "@/data/crews";

type Schedule = {
  id?: string;
  workOrder: string;
  address: string;
  crewId: string;
  day: string;
  startTime: string;
  endTime: string;
};

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (schedule: Schedule) => void;
  selectedCrew: string;
  selectedDay: string;
  editingSchedule?: Schedule | null;
};

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ScheduleModal({
  isOpen,
  onClose,
  onCreate,
  selectedCrew,
  selectedDay,
  editingSchedule,
}: ScheduleModalProps) {
  const [workOrder, setWorkOrder] = useState("");
  const [address, setAddress] = useState("");
  const [crewId, setCrewId] = useState("");
  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("15:00");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingSchedule) {
      setWorkOrder(editingSchedule.workOrder);
      setAddress(editingSchedule.address);
      setCrewId(editingSchedule.crewId);
      setDay(editingSchedule.day);
      setStartTime(editingSchedule.startTime);
      setEndTime(editingSchedule.endTime);
      setError("");

      return;
    }

    setWorkOrder("");
    setAddress("");
    setCrewId(selectedCrew || "");
    setDay(selectedDay || "Monday");
    setStartTime("07:00");
    setEndTime("15:00");
    setError("");
  }, [
    editingSchedule,
    selectedCrew,
    selectedDay,
    isOpen,
  ]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!workOrder.trim()) {
      setError("Please enter a work order number.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter the work location.");
      return;
    }

    if (!crewId) {
      setError("Please select a crew.");
      return;
    }

    if (!day) {
      setError("Please select a day.");
      return;
    }

    if (startTime >= endTime) {
      setError(
        "End time must be later than the start time."
      );
      return;
    }

    onCreate({
      id: editingSchedule?.id,
      workOrder: workOrder.trim(),
      address: address.trim(),
      crewId,
      day,
      startTime,
      endTime,
    });

    onClose();
  };

  const isEditing = Boolean(editingSchedule);

  return (
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
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full
          max-w-lg
          bg-white
          rounded-2xl
          shadow-xl
          p-6
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-brand-blue">
              {isEditing
                ? "Edit Schedule"
                : "Create Schedule"}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {isEditing
                ? "Update this scheduled assignment."
                : "Add work to the operations calendar."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
              transition
            "
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Work Order */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Work Order #
            </label>

            <input
              type="text"
              value={workOrder}
              onChange={(event) => {
                setWorkOrder(event.target.value);
                setError("");
              }}
              placeholder="WO-1024"
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-3
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-brand-blue/30
              "
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Address
            </label>

            <input
              type="text"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
                setError("");
              }}
              placeholder="123 Main Street"
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-3
                py-2
                focus:outline-none
                focus:ring-2
                focus:ring-brand-blue/30
              "
            />
          </div>

          {/* Crew */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Crew
            </label>

            <select
              value={crewId}
              onChange={(event) => {
                setCrewId(event.target.value);
                setError("");
              }}
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-3
                py-2
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-brand-blue/30
              "
            >
              <option value="">
                Select a crew
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

          {/* Day */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Day
            </label>

            <select
              value={day}
              onChange={(event) => {
                setDay(event.target.value);
                setError("");
              }}
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-3
                py-2
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-brand-blue/30
              "
            >
              {days.map((dayName) => (
                <option
                  key={dayName}
                  value={dayName}
                >
                  {dayName}
                </option>
              ))}
            </select>
          </div>

          {/* Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Time
              </label>

              <input
                type="time"
                value={startTime}
                onChange={(event) => {
                  setStartTime(event.target.value);
                  setError("");
                }}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-3
                  py-2
                  focus:outline-none
                  focus:ring-2
                  focus:ring-brand-blue/30
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                End Time
              </label>

              <input
                type="time"
                value={endTime}
                onChange={(event) => {
                  setEndTime(event.target.value);
                  setError("");
                }}
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  px-3
                  py-2
                  focus:outline-none
                  focus:ring-2
                  focus:ring-brand-blue/30
                "
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="
                px-4
                py-2
                rounded-lg
                border
                border-gray-300
                font-medium
                hover:bg-gray-50
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                px-5
                py-2
                rounded-lg
                bg-brand-blue
                text-white
                font-semibold
                hover:opacity-90
                transition
              "
            >
              {isEditing
                ? "Save Changes"
                : "Create Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}