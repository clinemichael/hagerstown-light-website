"use client";

import { useState } from "react";

import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import CrewPanel from "@/components/calendar/CrewPanel";
import ScheduleModal from "@/components/calendar/ScheduleModal";

type Schedule = {
  id: string;
  workOrder: string;
  address: string;
  crewId: string;
  day: string;
  startTime: string;
  endTime: string;
};

type ScheduleInput = {
  id?: string;
  workOrder: string;
  address: string;
  crewId: string;
  day: string;
  startTime: string;
  endTime: string;
};

export default function CalendarPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const [selectedCrew, setSelectedCrew] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [isScheduleModalOpen, setIsScheduleModalOpen] =
    useState(false);

  const [editingSchedule, setEditingSchedule] =
    useState<Schedule | null>(null);

  const [scheduleError, setScheduleError] =
    useState("");

  const handleCreateSchedule = (
    schedule: ScheduleInput
  ) => {
    const conflict = schedules.find((existing) => {
      // Ignore the schedule being edited
      if (
        schedule.id &&
        existing.id === schedule.id
      ) {
        return false;
      }

      // Different crew = no conflict
      if (
        existing.crewId !== schedule.crewId
      ) {
        return false;
      }

      // Different day = no conflict
      if (
        existing.day !== schedule.day
      ) {
        return false;
      }

      // Check whether the times overlap
      return (
        schedule.startTime < existing.endTime &&
        schedule.endTime > existing.startTime
      );
    });

    if (conflict) {
      setScheduleError(
        `This crew is already scheduled on ${schedule.day} from ${conflict.startTime} to ${conflict.endTime}.`
      );

      return;
    }

    setScheduleError("");

    setSchedules((current) => {
      if (schedule.id) {
        return current.map((item) =>
          item.id === schedule.id
            ? {
                ...schedule,
                id: schedule.id,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...schedule,
          id: crypto.randomUUID(),
        },
      ];
    });

    setIsScheduleModalOpen(false);
  };

  const openScheduleModal = () => {
    setEditingSchedule(null);
    setSelectedCrew("");
    setSelectedDay("");
    setScheduleError("");
    setIsScheduleModalOpen(true);
  };

  const handleCrewDrop = (
    crewId: string,
    day: string
  ) => {
    setEditingSchedule(null);
    setSelectedCrew(crewId);
    setSelectedDay(day);
    setScheduleError("");
    setIsScheduleModalOpen(true);
  };

  const handleEditSchedule = (
    schedule: Schedule
  ) => {
    setEditingSchedule(schedule);
    setSelectedCrew(schedule.crewId);
    setSelectedDay(schedule.day);
    setScheduleError("");
    setIsScheduleModalOpen(true);
  };

  const handleDeleteSchedule = (
    scheduleId: string
  ) => {
    setSchedules((current) =>
      current.filter(
        (schedule) =>
          schedule.id !== scheduleId
      )
    );
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Schedule work, assign crews, and manage daily operations.
          </p>

          <button
            type="button"
            onClick={openScheduleModal}
            className="
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
            + Create Schedule
          </button>
        </div>

        <CalendarHeader />

        <div className="grid xl:grid-cols-[240px_1fr] gap-6 mt-6">
          <CrewPanel
            onCrewSelect={setSelectedCrew}
            onDaySelect={setSelectedDay}
          />

          <CalendarGrid
            schedules={schedules}
            onCrewDrop={handleCrewDrop}
            onEditSchedule={handleEditSchedule}
            onDeleteSchedule={handleDeleteSchedule}
          />
        </div>
      </div>

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setScheduleError("");
          setIsScheduleModalOpen(false);
        }}
        onCreate={handleCreateSchedule}
        selectedCrew={selectedCrew}
        selectedDay={selectedDay}
        editingSchedule={editingSchedule}
        scheduleError={scheduleError}
      />
    </>
  );
}