"use client";

import {
  Users,
  UserCheck,
} from "lucide-react";

type CrewPanelProps = {
  onCrewSelect: (crew: string) => void;
  onDaySelect: (day: string) => void;
};

const crews = [
  {
    name: "Line Crew 1",
    members: 4,
    status: "Available",
  },
  {
    name: "Line Crew 2",
    members: 4,
    status: "Available",
  },
  {
    name: "Service Crew 1",
    members: 3,
    status: "Assigned",
  },
  {
    name: "Meter Crew",
    members: 2,
    status: "Available",
  },
];

export default function CrewPanel({
  onCrewSelect,
}: CrewPanelProps) {

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    crewName: string
  ) => {
    event.dataTransfer.setData("crew", crewName);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">

      <div className="flex items-center gap-2 mb-4">

        <Users
          size={22}
          className="text-brand-blue"
        />

        <h2 className="font-bold text-brand-blue">
          Crews
        </h2>

      </div>

      <div className="space-y-3">

        {crews.map((crew) => (

          <div
            key={crew.name}
            draggable
            onDragStart={(event) =>
              handleDragStart(event, crew.name)
            }
            onClick={() =>
              onCrewSelect(crew.name)
            }
            className="
              border
              border-gray-200
              rounded-lg
              p-3
              hover:bg-gray-50
              cursor-grab
              active:cursor-grabbing
            "
          >

            <div className="flex items-center justify-between">

              <p className="font-semibold">
                {crew.name}
              </p>

              <UserCheck
                size={18}
                className={
                  crew.status === "Available"
                    ? "text-green-600"
                    : "text-gray-400"
                }
              />

            </div>

            <p className="text-sm text-gray-500 mt-1">
              {crew.members} members
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {crew.status}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}