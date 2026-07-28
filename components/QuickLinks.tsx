import {Zap, Lightbulb, CreditCard, House, Phone,} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import Card from "./Card";

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
    <Section>
      <SectionTitle
        title="Our Quick Links"
        description="Access important resources and services quickly."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto">

      {quickLinks.map((link) => (
  <div key={link.title}>
    <Card>
      <div className="flex items-start gap-4">
        <div>
        <link.icon className="text-brand-blue" size={32} />
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
    </Card>
    
    </div>

))}

        </div>
    </Section>
  );
}