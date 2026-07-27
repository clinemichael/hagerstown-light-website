import { Zap, Phone, CircleCheckBig} from "lucide-react";

import type { LucideIcon } from "lucide-react";
type ServiceStatusCard = {
  title: string;
  value : string;
  icon: LucideIcon;
};

const statusCards = [
  {
    title: "Service Status",
    value: "🟢 Normal",
    color: "green",
    icon: CircleCheckBig,
  },
  {
    title: "Current Outages",
    value: "None Reported",
    icon: Zap,
  },
  {
    title: "Customer Support",
    value: "Available 24/7",
    icon: Phone,
  },
];




export default function ServiceStatus() {
  return (
    <section className="px-8 py-16">
        
    <div className="grid md:grid-cols-3 gap-6  mx-auto">

      {statusCards.map((card) => (
  <div key={card.title}>
    <div className="p-4 border rounded-xl shadow-sm hover:shadow-lg hover:border-brand-blue transition min-h-[140px]">

        <div className="flex items-start gap-4">

    <div>
        <card.icon className="text-brand-blue" size={64} />
    </div>
    <div>
    <h3 className="text-xl font-bold mb-3">
        {card.title}
    </h3>

    <p className="text-gray-600">
        {card.value}
    </p>

    </div>
    </div>
    </div>
    </div>

))}

        </div>
    </section>
  );
}