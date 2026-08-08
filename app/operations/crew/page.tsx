"use client";


import { Users, UserCheck, Plus } from "lucide-react";

const crews = [
  {
    name: "Line Crew 1",
    supervisor: "Supervisor",
    members: 4,
    status: "Available",
    assignment: "No current assignment",
  },
  {
    name: "Line Crew 2",
    supervisor: "Supervisor",
    members: 4,
    status: "Assigned",
    assignment: "WO-1051",
  },
  {
    name: "Service Crew 1",
    supervisor: "Supervisor",
    members: 3,
    status: "Available",
    assignment: "No current assignment",
  },
  {
    name: "Meter Crew",
    supervisor: "Supervisor",
    members: 2,
    status: "Standby",
    assignment: "No current assignment",
  },
];

export default function CrewsPage() {
  return (
    <>

      <div>

        {/* Page Header */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-3xl font-bold text-brand-blue">
              Crews
            </h1>

            <p className="text-gray-600 mt-1">
              Manage crews, assignments, and availability.
            </p>

          </div>


          <button
            type="button"
            className="
              flex
              items-center
              gap-2
              bg-brand-blue
              text-white
              px-4
              py-2
              rounded-lg
              font-semibold
              hover:opacity-90
              transition
            "
          >

            <Plus size={18} />

            Add Crew

          </button>

        </div>


        {/* Crew Cards */}

        <div className="
          grid
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-5
        ">

          {crews.map((crew) => (

            <div
              key={crew.name}
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

              {/* Crew Header */}

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

                    <Users
                      size={21}
                      className="text-brand-blue"
                    />

                  </div>


                  <div>

                    <h2 className="font-bold text-lg">
                      {crew.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      {crew.members} members
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
                      crew.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : crew.status === "Assigned"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {crew.status}

                </span>

              </div>


              {/* Crew Information */}

              <div className="mt-5 space-y-3">

                <div>

                  <p className="text-xs text-gray-500">
                    Supervisor
                  </p>

                  <p className="font-medium">
                    {crew.supervisor}
                  </p>

                </div>


                <div>

                  <p className="text-xs text-gray-500">
                    Current Assignment
                  </p>

                  <p className="font-medium">
                    {crew.assignment}
                  </p>

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
                  View Crew
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

    </>
  );
}