import {
  ClipboardCheck,
  Zap,
  Calendar,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";

import QuickActionCard from "./QuickActionCard";


const actions = [
  {
    title: "Safety Forms",
    icon: ClipboardCheck,
  },
  {
    title: "Work Orders",
    icon: Zap,
  },
  {
    title: "Calendar",
    icon: Calendar,
  },
  {
    title: "Documents",
    icon: FileText,
  },
  {
    title: "Crews",
    icon: Users,
  },
  {
    title: "Reports",
    icon: BarChart3,
  },
];


export default function QuickActions() {
  return (
    <section>

      <h2 className="text-xl font-bold text-brand-blue mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3">

        {actions.map((action) => (
          <QuickActionCard
            key={action.title}
            title={action.title}
            icon={action.icon}
          />
        ))}

      </div>

    </section>
  );
}