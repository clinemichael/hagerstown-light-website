import {
  Zap,
  Lightbulb,
  CreditCard,
  House,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
type QuickLink = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const quickLinks: QuickLink[] = [
  {
    title: "Report Power Outage",
    description: "Report a power outage or check outage information.",
    icon: Zap,
  },
  {
    title: "Report Street Light Issue",
    description: "Report a street light that is out or damaged.",
    icon: Lightbulb,
  },
  {
    title: "Pay My Bill",
    description: "Access billing information and payment options.",
    icon: CreditCard,
  },
  {
    title: "Start / Stop Service",
    description: "Request new service or manage an existing account.",
    icon: House,
  },
  {
    title: "Contact Us",
    description: "Get assistance from Hagerstown Light.",
    icon: Phone,
  },
];

export default function QuickLinks() {
  return (
    <section className="px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
      Our Quick Links
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto"></div><div className="grid md:grid-cols-5 gap-6  mx-auto">

      {quickLinks.map((link) => (
  <div key={link.title}>
    <div className="p-3 border rounded-xl shadow-sm hover:shadow-md transition min-h-[140px]">

        <div className="flex items-start gap-4">

    <div>
        <link.icon className="text-blue-700" size={32} />
    </div>
    <div>
    <h3 className="text-xl font-bold mb-3">
        {link.title}
    </h3>

    <p className="text-gray-600">
        {link.description}
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