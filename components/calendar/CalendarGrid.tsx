"use client";

import type { DragEvent } from "react";

import { crews } from "@/data/crews";

type Schedule = {
  id: string;
  workOrder: string;
  address: string;
  crewId: string;
  day: string;
  startTime: string;
  endTime: string;
};

type CalendarGridProps = {
  schedules: Schedule[];
  onCrewDrop: (crewId: string, day: string) => void;
  onEditSchedule: (schedule: Schedule) => void;
  onDeleteSchedule: (scheduleId: string) => void;
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

const dates = [10, 11, 12, 13, 14, 15, 16];

export default function CalendarGrid({
  schedules,
  onCrewDrop,
  onEditSchedule,
  onDeleteSchedule,
}: CalendarGridProps) {
  const handleDrop = (
    event: DragEvent,
    day: string
  ) => {
    event.preventDefault();

    const crewId = event.dataTransfer.getData("crewId");

    if (!crewId) return;

    onCrewDrop(crewId, day);
  };

  const getCrewName = (crewId: string) => {
    const crew = crews.find(
      (crew) => crew.id === crewId
    );

    return crew?.name || "Unknown Crew";
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Calendar Header */}
      <div className="grid grid-cols-7 bg-gray-50">
        {days.map((day, index) => (
          <div
            key={day}
            className="
              border-r
              border-b
              border-gray-200
              p-3
              text-center
              last:border-r-0
            "
          >
            <p className="text-sm font-semibold text-gray-600">
              {day}
            </p>

            <p className="text-xl font-bold text-brand-blue mt-1">
              {dates[index]}
            </p>
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 min-h-[500px]">
        {days.map((day) => {
          const daySchedules = schedules
           .filter((schedule) => schedule.day === day)
           .sort((a, b) =>
            a.startTime.localeCompare(b.startTime)
           );

          return (
            <div
              key={day}
              onDragOver={(event) =>
                event.preventDefault()
              }
              onDrop={(event) =>
                handleDrop(event, day)
              }
              className="
                min-h-[500px]
                border-r
                border-gray-200
                p-2
                transition
                hover:bg-blue-50
                last:border-r-0
              "
            >
              <div className="space-y-2">
                {daySchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="
                      bg-green-50
                      border-l-4
                      border-green-500
                      rounded
                      p-3
                      shadow-sm
                    "
                  >
                    {/* Time */}
                    <p className="text-xs font-bold text-green-700">
                      {schedule.startTime} -{" "}
                      {schedule.endTime}
                    </p>

                    {/* Work Order */}
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      {schedule.workOrder}
                    </p>

                    {/* Crew */}
                    <p className="text-xs font-medium text-gray-700 mt-1">
                      {getCrewName(schedule.crewId)}
                    </p>

                    {/* Address */}
                    <p className="text-xs text-gray-500 mt-1">
                      {schedule.address}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() =>
                          onEditSchedule(schedule)
                        }
                        className="
                          text-xs
                          font-semibold
                          text-brand-blue
                          hover:underline
                        "
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onDeleteSchedule(schedule.id)
                        }
                        className="
                          text-xs
                          font-semibold
                          text-red-600
                          hover:underline
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty Day */}
                {daySchedules.length === 0 && (
                  <div className="h-full min-h-[120px] flex items-center justify-center">
                    <p className="text-xs text-gray-400">
                      Drop crew here
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}