"use client";

import {
  Users,
  UserCheck,
} from "lucide-react";

import { crews } from "@/data/crews";

type CrewPanelProps = {
  onCrewSelect: (crew: string) => void;
  onDaySelect: (day: string) => void;
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
            draggable
            onDragStart={(event) =>
              handleDragStart(
                event,
                crew.id
              )
            }
            onClick={() =>
              onCrewSelect(crew.id)
            }
            className="
              border
              border-gray-200
              rounded-lg
              p-3
              hover:bg-gray-50
              cursor-grab
              active:cursor-grabbing
              transition
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