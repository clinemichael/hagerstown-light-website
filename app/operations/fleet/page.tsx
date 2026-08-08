"use client";

import {
  Truck,
  Gauge,
  Wrench,
  CalendarDays,
} from "lucide-react";

const fleet = [
  {
    unit: "Truck 12",
    type: "Line Truck",
    crew: "Line Crew 1",
    status: "Available",
    mileage: "82,450",
    maintenance: "09/15/2026",
    assignment: "No current assignment",
  },
  {
    unit: "Truck 14",
    type: "Line Truck",
    crew: "Line Crew 2",
    status: "Assigned",
    mileage: "91,230",
    maintenance: "08/28/2026",
    assignment: "WO-1051",
  },
  {
    unit: "Truck 21",
    type: "Service Truck",
    crew: "Service Crew 1",
    status: "Available",
    mileage: "67,890",
    maintenance: "10/03/2026",
    assignment: "No current assignment",
  },
  {
    unit: "Truck 7",
    type: "Meter Truck",
    crew: "Meter Crew",
    status: "Maintenance",
    mileage: "54,620",
    maintenance: "In Service",
    assignment: "No current assignment",
  },
];

export default function FleetPage() {
  return (
    <div>

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-brand-blue">
            Fleet
          </h2>

          <p className="text-gray-600 mt-1">
            Manage vehicles, assignments, mileage, and maintenance.
          </p>

        </div>


        <button
          type="button"
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
          + Add Vehicle
        </button>

      </div>


      {/* Fleet Cards */}

      <div className="
        grid
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-5
      ">

        {fleet.map((vehicle) => (

          <div
            key={vehicle.unit}
            className="
              bg-white
              border
              border-gray-200
              rounded-xl
              p-5
              shadow-sm
              hover:shadow-md
              transition
            "
          >

            {/* Vehicle Header */}

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-3">

                <div className="
                  w-10
                  h-10
                  rounded-lg
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                ">

                  <Truck
                    size={21}
                    className="text-brand-blue"
                  />

                </div>


                <div>

                  <h3 className="font-bold text-lg">
                    {vehicle.unit}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {vehicle.type}
                  </p>

                </div>

              </div>


              {/* Status */}

              <span
                className={`
                  text-xs
                  font-semibold
                  px-2
                  py-1
                  rounded-full
                  ${
                    vehicle.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : vehicle.status === "Assigned"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {vehicle.status}
              </span>

            </div>


            {/* Vehicle Information */}

            <div className="mt-5 space-y-4">

              <div className="flex items-center gap-3">

                <Truck
                  size={17}
                  className="text-gray-400"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Assigned Crew
                  </p>

                  <p className="font-medium">
                    {vehicle.crew}
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-3">

                <Gauge
                  size={17}
                  className="text-gray-400"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Mileage
                  </p>

                  <p className="font-medium">
                    {vehicle.mileage}
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-3">

                <Wrench
                  size={17}
                  className="text-gray-400"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Maintenance
                  </p>

                  <p className="font-medium">
                    {vehicle.maintenance}
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-3">

                <CalendarDays
                  size={17}
                  className="text-gray-400"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Current Assignment
                  </p>

                  <p className="font-medium">
                    {vehicle.assignment}
                  </p>

                </div>

              </div>

            </div>


            {/* Actions */}

            <div className="
              flex
              items-center
              gap-2
              mt-5
              pt-4
              border-t
              border-gray-100
            ">

              <button
                type="button"
                className="
                  flex-1
                  text-sm
                  font-semibold
                  text-brand-blue
                  hover:underline
                "
              >
                View Details
              </button>


              <button
                type="button"
                className="
                  flex-1
                  text-sm
                  font-semibold
                  text-gray-600
                  hover:underline
                "
              >
                Edit
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}