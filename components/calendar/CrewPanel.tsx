"use client";

import {
  CircleAlert,
  CircleCheck,
  Clock,
  UserCheck,
  Users,
} from "lucide-react";

import { crews } from "@/data/crews";

type CrewPanelProps = {
  onCrewSelect: (crew: string) => void;
  onDaySelect: (day: string) => void;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Available":
      return (
        <CircleCheck
          size={18}
          className="text-green-600"
        />
      );

    case "Assigned":
      return (
        <Clock
          size={18}
          className="text-blue-600"
        />
      );

    case "Unavailable":
    case "On Leave":
      return (
        <CircleAlert
          size={18}
          className="text-red-600"
        />
      );

    case "Training":
      return (
        <CircleAlert
          size={18}
          className="text-yellow-600"
        />
      );

    default:
      return (
        <UserCheck
          size={18}
          className="text-gray-400"
        />
      );
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Available":
      return "text-green-600";

    case "Assigned":
      return "text-blue-600";

    case "Unavailable":
    case "On Leave":
      return "text-red-600";

    case "Training":
      return "text-yellow-600";

    default:
      return "text-gray-500";
  }
};

export default function CrewPanel({
  onCrewSelect,
}: CrewPanelProps) {
  const handleDragStart = (
    event: React.DragEvent,
    crewId: string
  ) => {
    event.dataTransfer.setData(
      "crewId",
      crewId
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Users
          size={22}
          className="text-brand-blue"
        />

        <h2 className="font-bold text-brand-blue">
          Crews
        </h2>
      </div>

      {/* Crew List */}
      <div className="space-y-3">
        {crews.map((crew) => (
          <div
            key={crew.id}
            draggable={crew.status === "Available"}
            onDragStart={(event) =>
              handleDragStart(
                event,
                crew.id
              )
            }
            onClick={() =>
              onCrewSelect(crew.id)
            }
            className={`
              border
              border-gray-200
              rounded-lg
              p-3
              transition
              ${
                crew.status === "Available"
                  ? "hover:bg-gray-50 cursor-grab active:cursor-grabbing"
                  : "bg-gray-50 opacity-75 cursor-not-allowed"
              }
            `}
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold">
                {crew.name}
              </p>

              {getStatusIcon(crew.status)}
            </div>

            <p className="text-sm text-gray-500 mt-1">
  {crew.memberIds.length + 1} members
</p>

            <p
              className={`text-xs font-medium mt-1 ${getStatusClass(
                crew.status
              )}`}
            >
              {crew.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}