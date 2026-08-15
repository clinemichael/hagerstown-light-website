"use client";

import type { DragEvent } from "react";

import type { Crew } from "@/data/crews";
import type { Schedule } from "@/app/(portal)/operations/calendar/types";

type CalendarGridProps = {
  schedules: Schedule[];
  crews: Crew[];

  weekDays: {
    name: string;
    date: Date;
    dateString: string;
    displayDate: string;
  }[];

  onCrewDrop: (crewId: string, day: string) => void;
  onEditSchedule: (schedule: Schedule) => void;
  onDeleteSchedule: (scheduleId: string) => void;
};

export default function CalendarGrid({
  schedules,
  crews,
  weekDays,
  onCrewDrop,
  onEditSchedule,
  onDeleteSchedule,
}: CalendarGridProps) {
  const handleDrop = (
    event: DragEvent,
    day: string
  ) => {
    event.preventDefault();

    const crewId =
      event.dataTransfer.getData("crewId");

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
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

      {/* Calendar Header */}

      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div
            key={day.dateString}
            className="
              p-3
              text-center
              border-r
              border-gray-200
              last:border-r-0
              bg-gray-50
            "
          >
            <p className="text-sm font-semibold text-gray-600">
              {day.name}
            </p>

            <p className="text-xl font-bold text-brand-blue mt-1">
              {day.displayDate}
            </p>
          </div>
        ))}
      </div>

      {/* Calendar Days */}

      <div className="grid grid-cols-7 min-h-[500px]">
        {weekDays.map((day) => {
          const daySchedules = schedules
            .filter(
              (schedule) =>
                schedule.date ===
                day.dateString
            )
            .sort((a, b) =>
              a.startTime.localeCompare(
                b.startTime
              )
            );

          return (
            <div
              key={day.dateString}
              onDragOver={(event) =>
                event.preventDefault()
              }
              onDrop={(event) =>
                handleDrop(
                  event,
                  day.name
                )
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

                {daySchedules.map(
                  (schedule) => (
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
                        {getCrewName(
                          schedule.crewId
                        )}
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
                            onEditSchedule(
                              schedule
                            )
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
                            onDeleteSchedule(
                              schedule.id
                            )
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
                  )
                )}

                {/* Empty Day */}

                {daySchedules.length ===
                  0 && (
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