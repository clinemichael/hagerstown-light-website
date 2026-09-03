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
  { title: "Safety Forms", icon: ClipboardCheck, href: "/safety" },
  { title: "Work Orders", icon: Zap, href: "/work-orders" },
  { title: "Calendar", icon: Calendar, href: "/operations/calendar" },
  { title: "Documents", icon: FileText, href: "/documents" },
  { title: "Crews", icon: Users, href: "/operations/crew" },
  { title: "Reports", icon: BarChart3, href: "/reports" },
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
            href={action.href}
          />
        ))}
      </div>
    </section>
  );
}
