"use client";

import { useEffect, useMemo, useState } from "react";

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

import {
  getScheduledJobs,
  createScheduledJob,
  updateScheduledJob,
  deleteScheduledJob,
  type ScheduledJobRecord,
} from "@/data/scheduling/scheduledJobs";

import { getCrewResources } from "@/data/scheduling/resources";

import {
  findSchedulingConflicts,
} from "./conflicts";

import type { Schedule, ScheduledJob } from "./types";

import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import CrewPanel from "@/components/calendar/CrewPanel";
import ScheduleModal from "@/components/calendar/ScheduleModal";

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

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function getMonday(date: Date) {
  const result = new Date(date);
  const day = result.getDay();

  const difference =
    day === 0 ? -6 : 1 - day;

  result.setDate(
    result.getDate() + difference
  );

  result.setHours(0, 0, 0, 0);

  return result;
}

function formatDateForDatabase(
  date: Date
) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(
  date: Date
) {
  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
}

function getDayName(
  date: Date
) {
  return date.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
    }
  );
}

export default function CalendarPage() {
  const [
    currentWeekStart,
    setCurrentWeekStart,
  ] = useState(() =>
    getMonday(new Date())
  );

  const [
    employees,
    setEmployees,
  ] = useState<Employee[]>([]);

  const [
    crews,
    setCrews,
  ] = useState<Crew[]>([]);

  const [
    vehicles,
    setVehicles,
  ] = useState<Vehicle[]>([]);

  const [
    schedules,
    setSchedules,
  ] = useState<Schedule[]>([]);

  const [
    selectedCrew,
    setSelectedCrew,
  ] = useState("");

  const [
    selectedDay,
    setSelectedDay,
  ] = useState("");

  const [
    isScheduleModalOpen,
    setIsScheduleModalOpen,
  ] = useState(false);

  const [
    editingSchedule,
    setEditingSchedule,
  ] = useState<Schedule | null>(
    null
  );

  const [
    scheduleError,
    setScheduleError,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isSaving,
    setIsSaving,
  ] = useState(false);

  const weekDays = useMemo(() => {
    return dayNames.map(
      (dayName, index) => {
        const date =
          new Date(currentWeekStart);

        date.setDate(
          currentWeekStart.getDate() +
            index
        );

        return {
          name: dayName,
          date,
          dateString:
            formatDateForDatabase(
              date
            ),
          displayDate:
            formatDisplayDate(date),
        };
      }
    );
  }, [currentWeekStart]);

  const loadCalendarData =
    async () => {
      try {
        setIsLoading(true);

        const [
          employeeData,
          vehicleData,
          crewData,
          scheduledJobs,
        ] = await Promise.all([
          getActiveEmployees(),
          getActiveVehicles(),
          getCrews(),
          getScheduledJobs(),
        ]);

        setEmployees(
          employeeData
        );

        setVehicles(
          vehicleData
        );

        setCrews(
          crewData
        );

        const mappedSchedules =
          scheduledJobs.map(
            (
              job: ScheduledJobRecord
            ) => {
              const date =
                new Date(
                  `${job.scheduledDate}T00:00:00`
                );

              return {
                id: job.id,
                workOrder:
                  job.workOrder,
                address:
                  job.jobName,
                crewId:
                  job.crewId,
                day:
                  getDayName(date),
                date:
                  job.scheduledDate,
                startTime:
                  job.startTime,
                endTime:
                  job.endTime,
              };
            }
          );

        setSchedules(
          mappedSchedules
        );
      } catch (error) {
        console.error(
          "Unable to load calendar data:",
          error
        );

        setScheduleError(
          "Unable to load calendar data."
        );
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    loadCalendarData();
  }, []);

  const goToPreviousWeek =
    () => {
      setCurrentWeekStart(
        (current) => {
          const next =
            new Date(current);

          next.setDate(
            next.getDate() - 7
          );

          return next;
        }
      );
    };

  const goToNextWeek =
    () => {
      setCurrentWeekStart(
        (current) => {
          const next =
            new Date(current);

          next.setDate(
            next.getDate() + 7
          );

          return next;
        }
      );
    };

  const goToCurrentWeek =
    () => {
      setCurrentWeekStart(
        getMonday(new Date())
      );
    };

  const handleCreateSchedule =
    async (
      schedule: ScheduleInput
    ) => {
      try {
        setIsSaving(true);
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

        const date =
          schedule.date ||
          weekDays.find(
            (day) =>
              day.name ===
              schedule.day
          )?.dateString;

        if (!date) {
          setScheduleError(
            "Unable to determine the selected date."
          );

          return;
        }

        const employeeNames =
          Object.fromEntries(
            employees.map(
              (employee) => [
                employee.id,
                employee.name,
              ]
            )
          );

        const vehicleNames =
          Object.fromEntries(
            vehicles.map(
              (vehicle) => [
                vehicle.id,
                vehicle.name,
              ]
            )
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

        const existingJobs =
          await Promise.all(
            schedules
              .filter(
                (existing) =>
                  existing.id !==
                  schedule.id
              )
              .map(
                async (
                  existing
                ) => {
                  const resources =
                    await getCrewResources(
                      existing.crewId
                    );

                  return {
                    id:
                      existing.id,

                    jobNumber:
                      existing.workOrder,

                    jobName:
                      existing.address,

                    date:
                      existing.date,

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

        if (
          conflicts.length > 0
        ) {
          const conflictMessages =
            conflicts.map(
              (conflict) => {
                const conflictType =
                  conflict.type ===
                  "crew"
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

        if (schedule.id) {
          await updateScheduledJob(
            schedule.id,
            {
              workOrder:
                schedule.workOrder,

              jobName:
                schedule.address,

              scheduledDate:
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
            }
          );
        } else {
          await createScheduledJob(
            {
              workOrder:
                schedule.workOrder,

              jobName:
                schedule.address,

              scheduledDate:
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
            }
          );
        }

        await loadCalendarData();

        setIsScheduleModalOpen(
          false
        );

        setEditingSchedule(
          null
        );

        setSelectedCrew("");

        setSelectedDay("");

        setScheduleError("");
      } catch (error) {
        console.error(
          "Unable to save schedule:",
          error
        );

        setScheduleError(
          "Unable to save the schedule."
        );
      } finally {
        setIsSaving(false);
      }
    };

  const openScheduleModal =
    () => {
      setEditingSchedule(null);

      setSelectedCrew("");

      setSelectedDay(
        weekDays[0]?.name ?? ""
      );

      setScheduleError("");

      setIsScheduleModalOpen(
        true
      );
    };

  const handleCrewDrop =
    (
      crewId: string,
      day: string
    ) => {
      setEditingSchedule(null);

      setSelectedCrew(
        crewId
      );

      setSelectedDay(day);

      setScheduleError("");

      setIsScheduleModalOpen(
        true
      );
    };

  const handleEditSchedule =
    (
      schedule: Schedule
    ) => {
      setEditingSchedule(
        schedule
      );

      setSelectedCrew(
        schedule.crewId
      );

      setSelectedDay(
        schedule.day
      );

      setScheduleError("");

      setIsScheduleModalOpen(
        true
      );
    };

  const handleDeleteSchedule =
    async (
      scheduleId: string
    ) => {
      try {
        setScheduleError("");

        await deleteScheduledJob(
          scheduleId
        );

        setSchedules(
          (current) =>
            current.filter(
              (schedule) =>
                schedule.id !==
                scheduleId
            )
        );
      } catch (error) {
        console.error(
          "Unable to delete schedule:",
          error
        );

        setScheduleError(
          "Unable to delete the schedule."
        );
      }
    };

  return (
  <>
    <div>
      {/* Page Header */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">
            Operations Calendar
          </h2>

          <p className="text-gray-600 mt-1">
            Schedule work, assign crews, and manage daily operations.
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

      {/* Calendar Header */}

      <CalendarHeader
        weekDays={weekDays}
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        onToday={goToCurrentWeek}
      />

      {/* Calendar */}

      {isLoading ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center mt-6">
          <p className="text-gray-500">
            Loading calendar...
          </p>
        </div>
      ) : (
        <div className="grid xl:grid-cols-[240px_1fr] gap-6 mt-6">
          <CrewPanel
            crews={crews}
            onCrewSelect={setSelectedCrew}
            onDaySelect={setSelectedDay}
          />

          <CalendarGrid
            schedules={schedules.filter((schedule) =>
              weekDays.some(
                (day) =>
                  day.dateString === schedule.date
              )
            )}
            crews={crews}
            weekDays={weekDays}
            onCrewDrop={handleCrewDrop}
            onEditSchedule={handleEditSchedule}
            onDeleteSchedule={handleDeleteSchedule}
          />
        </div>
      )}
    </div>

    {/* Schedule Modal */}

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
      weekDays={weekDays}
      isSaving={isSaving}
    />
  </>
);
}