import {
  Zap,
  AlertTriangle,
  Users,
  CloudSun,
} from "lucide-react";

import Card from "@/components/common/Card";
import StatusBadge from "./StatusBadge";


const statusItems = [
  {
    title: "System Status",
    description: "Electric system operating normally",
    icon: Zap,
    status: "normal",
  },

  {
    title: "Current Outages",
    description: "No active outages reported",
    icon: AlertTriangle,
    status: "normal",
  },

  {
    title: "Crew Status",
    description: "12 crews assigned today",
    icon: Users,
    status: "normal",
  },

  {
    title: "Weather",
    description: "Clear skies - 82°F",
    icon: CloudSun,
    status: "normal",
  },
];


export default function OperationsStatus() {
  return (
    <section className="mt-10">

      <h2 className="text-2xl font-bold text-brand-blue mb-6">
        Operations Status
      </h2>


      <div className="grid md:grid-cols-4 gap-6">

        {statusItems.map((item) => {

          const Icon = item.icon;

          return (
            <Card key={item.title}>

              <Icon
                size={32}
                className="text-brand-blue mb-4"
              />

              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>


              <p className="text-gray-600 mt-2">
                {item.description}
              </p>


              <div className="mt-4">
                <StatusBadge status={item.status as "normal"} />
              </div>

            </Card>
          );

        })}

      </div>

    </section>
  );
}