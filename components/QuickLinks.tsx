const quickLinks = [
  {
    title: "Report Power Outage",
    description: "Report a power outage or check outage information.",
    icon: "⚡",
  },
  {
    title: "Report Street Light Issue",
    description: "Report a street light that is out or damaged.",
    icon: "💡",
  },
  {
    title: "Pay My Bill",
    description: "Access billing information and payment options.",
    icon: "💳",
  },
  {
    title: "Start / Stop Service",
    description: "Request new service or manage an existing account.",
    icon: "🏠",
  },
  {
    title: "Contact Us",
    description: "Get assistance from Hagerstown Light.",
    icon: "📞",
  },
];

export default function QuickLinks() {
  return (
    <section className="px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
      Our Quick Links
        </h2>
        <div className="grid md:grid-cols-5 gap-6 max-w-auto mx-auto">

      {quickLinks.map((link) => (
  <div key={link.title}>
    <div className="p-3 border rounded-xl shadow-sm hover:shadow-md transition min-h-[140px]">

        <div className="flex items-start gap-4">

    <div className="text-6xl">
        {link.icon}
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