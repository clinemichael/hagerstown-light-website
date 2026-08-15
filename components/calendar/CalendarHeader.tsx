"use client";

type CalendarDay = {
  name: string;
  date: Date;
  dateString: string;
  displayDate: string;
};

type CalendarHeaderProps = {
  weekDays: CalendarDay[];
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onToday: () => void;
};

export default function CalendarHeader({
  onPreviousWeek,
  onNextWeek,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <button
        type="button"
        onClick={onPreviousWeek}
        className="
          px-3
          py-2
          rounded-lg
          border
          border-gray-200
          text-sm
          font-medium
          hover:bg-gray-50
          transition
        "
      >
        ← Previous
      </button>

      <button
        type="button"
        onClick={onToday}
        className="
          px-4
          py-2
          rounded-lg
          bg-brand-blue
          text-white
          text-sm
          font-semibold
          hover:opacity-90
          transition
        "
      >
        Today
      </button>

      <button
        type="button"
        onClick={onNextWeek}
        className="
          px-3
          py-2
          rounded-lg
          border
          border-gray-200
          text-sm
          font-medium
          hover:bg-gray-50
          transition
        "
      >
        Next →
      </button>
    </div>
  );
}