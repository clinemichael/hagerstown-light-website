import AlertCard from "./AlertCard";


const alerts = [
  {
    title: "Storm Response Activated",
    description:
      "All crews report to operations center.",
    priority: "critical",
  },

  {
    title: "Planned Outage",
    description:
      "East feeder scheduled tomorrow at 8:00 AM.",
    priority: "warning",
  },

  {
    title: "Safety Reminder",
    description:
      "Monthly tailboard due Friday.",
    priority: "info",
  },
];


export default function OperationsAlerts() {
  return (
    <section className="mt-10">

      <h2 className="text-xl font-bold text-brand-blue mb-4">
        Operations Alerts
      </h2>


      <div className="space-y-3">

        {alerts.map((alert) => (

          <AlertCard
            key={alert.title}
            title={alert.title}
            description={alert.description}
            priority={
              alert.priority as
              "info" |
              "warning" |
              "critical"
            }
          />

        ))}

      </div>

    </section>
  );
}