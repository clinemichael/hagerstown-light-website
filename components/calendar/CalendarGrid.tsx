"use client";

type Schedule = {
    id: string;
  workOrder: string;
  address: string;
  crew: string;
  day: string;
  startTime: string;
  endTime: string;
};

type CalendarGridProps = {
  schedules: Schedule[];
  onCrewDrop: (crew: string, day: string) => void;
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

const dates = [
  10,
  11,
  12,
  13,
  14,
  15,
  16,
];

export default function CalendarGrid({
  schedules,
  onCrewDrop,
  onEditSchedule,
  onDeleteSchedule,
}: CalendarGridProps) {

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    day: string
  ) => {

    event.preventDefault();

    const crew = event.dataTransfer.getData("crew");

    if (!crew) return;

    onCrewDrop(crew, day);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

      <div className="grid grid-cols-7">

        {days.map((day, index) => (

          <div
            key={day}
            className="
              border-r
              border-b
              border-gray-200
              p-3
              text-center
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

      <div className="grid grid-cols-7 min-h-[500px]">

        {days.map((day) => (

          <div
            key={day}
            onDragOver={(event) =>
              event.preventDefault()
            }
            onDrop={(event) =>
              handleDrop(event, day)
            }
            className="
              border-r
              border-gray-200
              p-2
              transition
              hover:bg-blue-50
            "
          >

            <div className="space-y-2">

              {schedules
                .filter((schedule) => schedule.day === day)
                .map((schedule, index) => (

                  <div
                    key={`${schedule.workOrder}-${index}`}
                    className="
                      bg-green-50
                      border-l-4
                      border-green-500
                      rounded
                      p-2
                    "
                  >

                    <p className="text-xs font-bold text-green-700">
                      {schedule.startTime} - {schedule.endTime}
                    </p>

                    <p className="text-sm font-semibold">
                      {schedule.workOrder}
                    </p>

                    <p className="text-xs text-gray-600">
                      {schedule.crew}
                    </p>

                    <p className="text-xs text-gray-500">
                      {schedule.address}
                    </p>
                    <div className="flex gap-2 mt-2">

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

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}