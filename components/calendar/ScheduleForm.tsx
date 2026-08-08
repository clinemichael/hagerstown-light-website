"use client";

import { useEffect, useState } from "react";

type Schedule = {
  workOrder: string;
  address: string;
  crew: string;
  day: string;
  startTime: string;
  endTime: string;
};

type ScheduleFormProps = {
  onCreate: (schedule: Schedule) => void;
  selectedCrew: string;
  selectedDay: string;
};

const crews = [
  "Line Crew 1",
  "Line Crew 2",
  "Service Crew 1",
  "Meter Crew",
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ScheduleForm({
  onCreate,
  selectedCrew,
  selectedDay,
}: ScheduleFormProps) {
  const [workOrder, setWorkOrder] = useState("");
  const [address, setAddress] = useState("");
  const [crew, setCrew] = useState("");
  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("15:00");

  useEffect(() => {
    if (selectedCrew) {
      setCrew(selectedCrew);
    }

    if (selectedDay) {
      setDay(selectedDay);
    }
  }, [selectedCrew, selectedDay]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!workOrder || !address || !crew) {
      return;
    }

    onCreate({
      workOrder,
      address,
      crew,
      day,
      startTime,
      endTime,
    });

    setWorkOrder("");
    setAddress("");
    setCrew("");
    setDay("Monday");
    setStartTime("07:00");
    setEndTime("15:00");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">

      <h2 className="text-lg font-bold text-brand-blue">
        Create Schedule
      </h2>

      <p className="text-sm text-gray-500 mt-1 mb-5">
        Add work to the operations calendar.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Work Order #
          </label>

          <input
            type="text"
            value={workOrder}
            onChange={(event) =>
              setWorkOrder(event.target.value)
            }
            placeholder="WO-1024"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Address
          </label>

          <input
            type="text"
            value={address}
            onChange={(event) =>
              setAddress(event.target.value)
            }
            placeholder="123 Main Street"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Crew
          </label>

          <select
            value={crew}
            onChange={(event) =>
              setCrew(event.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
          >
            <option value="">
              Select a crew
            </option>

            {crews.map((crewName) => (
              <option key={crewName} value={crewName}>
                {crewName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Day
          </label>

          <select
            value={day}
            onChange={(event) =>
              setDay(event.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"
          >
            {days.map((dayName) => (
              <option key={dayName} value={dayName}>
                {dayName}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">

          <div>
            <label className="block text-sm font-medium mb-1">
              Start Time
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(event) =>
                setStartTime(event.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              End Time
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(event) =>
                setEndTime(event.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

        </div>

        <button
          type="submit"
          className="w-full bg-brand-blue text-white font-semibold rounded-lg py-2.5 hover:opacity-90 transition"
        >
          Create Schedule
        </button>

      </form>

    </div>
  );
}