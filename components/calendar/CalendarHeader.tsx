import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

export default function CalendarHeader() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-3">

          <CalendarDays
            size={28}
            className="text-brand-blue"
          />

          <div>
            <h2 className="text-xl font-bold text-brand-blue">
              Operations Calendar
            </h2>

            <p className="text-sm text-gray-500">
              August 10 - August 16, 2026
            </p>
          </div>

        </div>


        <div className="flex items-center gap-2">

          <button
            className="
              p-2
              rounded-lg
              border
              border-gray-200
              hover:bg-gray-50
            "
          >
            <ChevronLeft size={20} />
          </button>


          <button
            className="
              px-4
              py-2
              rounded-lg
              border
              border-gray-200
              font-medium
              hover:bg-gray-50
            "
          >
            Today
          </button>


          <button
            className="
              p-2
              rounded-lg
              border
              border-gray-200
              hover:bg-gray-50
            "
          >
            <ChevronRight size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}