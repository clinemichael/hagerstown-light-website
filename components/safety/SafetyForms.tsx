import {
  ClipboardCheck,
  FileWarning,
  HardHat,
  Truck,
} from "lucide-react";

import SafetyFormCard from "./SafetyFormCard";

const forms = [
  {
    title: "Daily Safety Report",
    description: "Complete the daily safety check for today's work.",
    icon: ClipboardCheck,
  },
  {
    title: "Tailboard",
    description: "Record the day's job briefing and safety discussion.",
    icon: HardHat,
  },
  {
    title: "Incident Report",
    description: "Report a safety incident or near miss.",
    icon: FileWarning,
  },
  {
    title: "Equipment Inspection",
    description: "Complete a vehicle or equipment inspection.",
    icon: Truck,
  },
];

export default function SafetyForms() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-brand-blue mb-4">
        Safety Forms
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {forms.map((form) => (
          <SafetyFormCard
            key={form.title}
            title={form.title}
            description={form.description}
            icon={form.icon}
          />
        ))}
      </div>
    </section>
  );
}