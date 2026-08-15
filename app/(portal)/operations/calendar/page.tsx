"use client";

import { useEffect, useState } from "react";

import {
  getActiveEmployees,
  type Employee,
} from "@/data/employees";

import {
  getCrews,
  type Crew,
} from "@/data/crews";

import {
  getActiveVehicles,
  type Vehicle,
} from "@/data/vehicles";

import { getCrewResources } from "@/data/scheduling/resources";

import {
  findSchedulingConflicts,
} from "./conflicts";

import type { ScheduledJob } from "./types";

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

const dayDates: Record<string, string> = {
  Monday: "2026-08-10",
  Tuesday: "2026-08-11",
  Wednesday: "2026-08-12",
  Thursday: "2026-08-13",
  Friday: "2026-08-14",
  Saturday: "2026-08-15",
  Sunday: "2026-08-16",
};

export default function CalendarPage() {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [crews, setCrews] =
    useState<Crew[]>([]);

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  const [schedules, setSchedules] =
    useState<Schedule[]>([]);

  const [selectedCrew, setSelectedCrew] =
    useState("");

  const [selectedDay, setSelectedDay] =
    useState("");

  const [isScheduleModalOpen, setIsScheduleModalOpen] =
    useState(false);

  const [editingSchedule, setEditingSchedule] =
    useState<Schedule | null>(null);

  const [scheduleError, setScheduleError] =
    useState("");

  useEffect(() => {
    const loadCalendarResources = async () => {
      try {
        const [
          employeeData,
          vehicleData,
          crewData,
        ] = await Promise.all([
          getActiveEmployees(),
          getActiveVehicles(),
          getCrews(),
        ]);

        setEmployees(employeeData);
        setVehicles(vehicleData);
        setCrews(crewData);
      } catch (error) {
        console.error(
          "Unable to load calendar resources:",
          error
        );
      }
    };

    loadCalendarResources();
  }, []);

  const handleCreateSchedule = async (
    schedule: ScheduleInput
  ) => {
    setScheduleError("");

    const crewResources =
      await getCrewResources(
        schedule.crewId
      );

    if (!crewResources) {
      setScheduleError(
        "Unable to find the selected crew."
      );
      return;
    }

    const date = dayDates[schedule.day];

    if (!date) {
      setScheduleError(
        "Unable to determine the selected date."
      );
      return;
    }

    const employeeNames =
      Object.fromEntries(
        employees.map((employee) => [
          employee.id,
          employee.name,
        ])
      );

    const vehicleNames =
      Object.fromEntries(
        vehicles.map((vehicle) => [
          vehicle.id,
          vehicle.name,
        ])
      );

    const newJob: ScheduledJob = {
      id:
        schedule.id ??
        crypto.randomUUID(),

      jobNumber:
        schedule.workOrder,

      jobName:
        schedule.address,

      date,

      startTime:
        schedule.startTime,

      endTime:
        schedule.endTime,

      crewId:
        crewResources.crewId,

      crewName:
        crewResources.crewName,

      employeeIds:
        crewResources.employeeIds,

      vehicleIds:
        crewResources.vehicleIds,
    };

    const existingJobs: ScheduledJob[] =
      await Promise.all(
        schedules.map(
          async (existing) => {
            const resources =
              await getCrewResources(
                existing.crewId
              );

            return {
              id: existing.id,

              jobNumber:
                existing.workOrder,

              jobName:
                existing.address,

              date:
                dayDates[
                  existing.day
                ],

              startTime:
                existing.startTime,

              endTime:
                existing.endTime,

              crewId:
                existing.crewId,

              crewName:
                resources?.crewName ??
                "Unknown Crew",

              employeeIds:
                resources?.employeeIds ??
                [],

              vehicleIds:
                resources?.vehicleIds ??
                [],
            };
          }
        )
      );

    const conflicts =
      findSchedulingConflicts(
        newJob,
        existingJobs,
        employeeNames,
        vehicleNames
      );

    if (conflicts.length > 0) {
      const conflictMessages =
        conflicts.map(
          (conflict) => {
            const conflictType =
              conflict.type === "crew"
                ? "Crew"
                : conflict.type ===
                    "employee"
                  ? "Employee"
                  : "Vehicle";

            return `${conflictType}: ${conflict.resourceName} is already assigned to ${conflict.conflictingJob.jobNumber} from ${conflict.conflictingJob.startTime} to ${conflict.conflictingJob.endTime}.`;
          }
        );

      setScheduleError(
        `Scheduling conflict:\n${conflictMessages.join(
          "\n"
        )}`
      );

      return;
    }

    const savedSchedule: Schedule = {
      id:
        schedule.id ??
        crypto.randomUUID(),

      workOrder:
        schedule.workOrder,

      address:
        schedule.address,

      crewId:
        schedule.crewId,

      day:
        schedule.day,

      startTime:
        schedule.startTime,

      endTime:
        schedule.endTime,
    };

    setSchedules(
      (current) => {
        if (schedule.id) {
          return current.map(
            (item) =>
              item.id === schedule.id
                ? savedSchedule
                : item
          );
        }

        return [
          ...current,
          savedSchedule,
        ];
      }
    );

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
    setSelectedCrew(
      schedule.crewId
    );
    setSelectedDay(
      schedule.day
    );
    setScheduleError("");
    setIsScheduleModalOpen(true);
  };

  const handleDeleteSchedule = (
    scheduleId: string
  ) => {
    setSchedules(
      (current) =>
        current.filter(
          (schedule) =>
            schedule.id !==
            scheduleId
        )
    );
  };

  return (
    <>
      {/* Page Header */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-blue">
            Operations Calendar
          </h1>

          <p className="text-gray-600 mt-1">
            Schedule work, assign crews, and manage
            daily operations.
          </p>
        </div>

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
          crews={crews}
          onCrewSelect={setSelectedCrew}
          onDaySelect={setSelectedDay}
        />

        <CalendarGrid
          schedules={schedules}
          crews={crews}
          onCrewDrop={handleCrewDrop}
          onEditSchedule={handleEditSchedule}
          onDeleteSchedule={handleDeleteSchedule}
        />
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
        crews={crews}
      />
    </>
  );
}