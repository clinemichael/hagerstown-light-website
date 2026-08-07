import {
  ClipboardCheck,
  Zap,
  Calendar,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";

import ActionCard from "./ActionCard";


const actions = [
  {
    title: "Safety Forms",
    description: "Daily inspections and safety reporting",
    icon: ClipboardCheck,
  },
  {
    title: "Work Orders",
    description: "View and manage assigned work",
    icon: Zap,
  },
  {
    title: "Operations Calendar",
    description: "Crew schedules and planned work",
    icon: Calendar,
  },
  {
    title: "Documents",
    description: "Policies, procedures, and resources",
    icon: FileText,
  },
  {
    title: "Crew Management",
    description: "Assignments and availability",
    icon: Users,
  },
  {
    title: "Reports",
    description: "Operational reporting and analytics",
    icon: BarChart3,
  },
];


export default function QuickActions() {
  return (
    <section className="mt-8">

      <h2 className="text-2xl font-bold text-brand-blue mb-6">
        Quick Actions
      </h2>


      <div className="grid md:grid-cols-3 gap-6">

        {actions.map((action) => (
          <ActionCard
            key={action.title}
            title={action.title}
            description={action.description}
            icon={action.icon}
          />
        ))}

      </div>

    </section>
  );
}