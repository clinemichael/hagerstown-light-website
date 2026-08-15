"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

import type { Crew } from "@/data/crews";

type WeekDay = {
  name: string;
  date: Date;
  dateString: string;
  displayDate: string;
};

type Schedule = {
  id: string;
  workOrder: string;
  address: string;
  crewId: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
};

type ScheduleInput = {
  id?: string;
  workOrder: string;
  address: string;
  crewId: string;
  day: string;
  date?: string;
  startTime: string;
  endTime: string;
};

type ScheduleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    schedule: ScheduleInput
  ) => void | Promise<void>;

  selectedCrew: string;
  selectedDay: string;

  editingSchedule?: Schedule | null;

  scheduleError?: string;

  crews: Crew[];

  weekDays: WeekDay[];

  isSaving?: boolean;
};

export default function ScheduleModal({
  isOpen,
  onClose,
  onCreate,
  selectedCrew,
  selectedDay,
  editingSchedule,
  scheduleError,
  crews,
  weekDays,
  isSaving = false,
}: ScheduleModalProps) {
  const [workOrder, setWorkOrder] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [crewId, setCrewId] =
    useState("");

  const [day, setDay] =
    useState("Monday");

  const [date, setDate] =
    useState("");

  const [startTime, setStartTime] =
    useState("07:00");

  const [endTime, setEndTime] =
    useState("15:00");

  const [error, setError] =
    useState("");

  /*
   * Load existing schedule when editing.
   */

  useEffect(() => {
    if (editingSchedule) {
      setWorkOrder(
        editingSchedule.workOrder
      );

      setAddress(
        editingSchedule.address
      );

      setCrewId(
        editingSchedule.crewId
      );

      setDay(
        editingSchedule.day
      );

      setDate(
        editingSchedule.date
      );

      setStartTime(
        editingSchedule.startTime
      );

      setEndTime(
        editingSchedule.endTime
      );

      setError("");

      return;
    }

    /*
     * New schedule
     */

    setWorkOrder("");
    setAddress("");

    setCrewId(
      selectedCrew || ""
    );

    const selectedWeekDay =
      weekDays.find(
        (item) =>
          item.name === selectedDay
      );

    const defaultWeekDay =
      selectedWeekDay ??
      weekDays[0];

    setDay(
      defaultWeekDay?.name ??
        "Monday"
    );

    setDate(
      defaultWeekDay?.dateString ??
        ""
    );

    setStartTime("07:00");
    setEndTime("15:00");

    setError("");
  }, [
    editingSchedule,
    selectedCrew,
    selectedDay,
    weekDays,
    isOpen,
  ]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");

    if (!workOrder.trim()) {
      setError(
        "Please enter a work order number."
      );
      return;
    }

    if (!address.trim()) {
      setError(
        "Please enter the work location."
      );
      return;
    }

    if (!crewId) {
      setError(
        "Please select a crew."
      );
      return;
    }

    if (!day) {
      setError(
        "Please select a day."
      );
      return;
    }

    if (!date) {
      setError(
        "Please select a date."
      );
      return;
    }

    if (startTime >= endTime) {
      setError(
        "End time must be later than the start time."
      );
      return;
    }

    await onCreate({
      id: editingSchedule?.id,

      workOrder:
        workOrder.trim(),

      address:
        address.trim(),

      crewId,

      day,

      date,

      startTime,

      endTime,
    });
  };

  const isEditing =
    Boolean(editingSchedule);

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
        if (
          event.target ===
          event.currentTarget
        ) {
          if (!isSaving) {
            onClose();
          }
        }
      }}
    >
      <div
        className="
          w-full
          max-w-lg
          bg-white
          rounded-xl
          shadow-xl
          p-6
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* Header */}

        <div className="flex items-start justify-between mb-6">
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
            disabled={isSaving}
            className="
              p-2
              rounded-lg
              hover:bg-gray-100
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
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
              disabled={isSaving}
              onChange={(event) => {
                setWorkOrder(
                  event.target.value
                );
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
                disabled:bg-gray-100
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
              disabled={isSaving}
              onChange={(event) => {
                setAddress(
                  event.target.value
                );
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
                disabled:bg-gray-100
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
              disabled={isSaving}
              onChange={(event) => {
                setCrewId(
                  event.target.value
                );
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
                disabled:bg-gray-100
              "
            >
              <option value="">
                Select a crew
              </option>

              {crews.map(
                (crew) => (
                  <option
                    key={crew.id}
                    value={crew.id}
                  >
                    {crew.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Date */}

          <div>
            <label className="block text-sm font-medium mb-1">
              Date
            </label>

            <select
              value={date}
              disabled={isSaving}
              onChange={(event) => {
                const selectedDate =
                  event.target.value;

                setDate(
                  selectedDate
                );

                const selected =
                  weekDays.find(
                    (item) =>
                      item.dateString ===
                      selectedDate
                  );

                if (selected) {
                  setDay(
                    selected.name
                  );
                }

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
                disabled:bg-gray-100
              "
            >
              {weekDays.map(
                (weekDay) => (
                  <option
                    key={
                      weekDay.dateString
                    }
                    value={
                      weekDay.dateString
                    }
                  >
                    {weekDay.name} —{" "}
                    {
                      weekDay.displayDate
                    }
                  </option>
                )
              )}
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
                disabled={isSaving}
                onChange={(event) => {
                  setStartTime(
                    event.target.value
                  );
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
                  disabled:bg-gray-100
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
                disabled={isSaving}
                onChange={(event) => {
                  setEndTime(
                    event.target.value
                  );
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
                  disabled:bg-gray-100
                "
              />
            </div>
          </div>

          {/* Error */}

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
              <p className="text-sm text-red-700 whitespace-pre-line">
                {error}
              </p>
            </div>
          )}

          {scheduleError && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
              <p className="text-sm text-red-700 whitespace-pre-line">
                {scheduleError}
              </p>
            </div>
          )}

          {/* Actions */}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="
                px-4
                py-2
                rounded-lg
                border
                border-gray-300
                font-medium
                hover:bg-gray-50
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="
                px-5
                py-2
                rounded-lg
                bg-brand-blue
                text-white
                font-semibold
                hover:opacity-90
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {isSaving
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Create Schedule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}