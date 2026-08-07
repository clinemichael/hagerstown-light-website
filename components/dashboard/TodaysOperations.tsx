import {
  Users,
  Zap,
  Wrench,
  Clock,
} from "lucide-react";

import Card from "@/components/common/Card";


const operations = [
  {
    title: "Line Crew 1",
    description: "Transformer replacement - North District",
    time: "7:00 AM",
    icon: Users,
  },
  {
    title: "Service Upgrade",
    description: "Customer service upgrade - Downtown",
    time: "9:30 AM",
    icon: Zap,
  },
  {
    title: "Preventive Maintenance",
    description: "Substation inspection",
    time: "1:00 PM",
    icon: Wrench,
  },
];


export default function TodaysOperations() {
  return (
    <section className="mt-10">

      <h2 className="text-2xl font-bold text-brand-blue mb-6">
        Today's Operations
      </h2>


      <div className="space-y-4">

        {operations.map((operation) => {

          const Icon = operation.icon;

          return (
            <Card key={operation.title}>

              <div className="flex items-start gap-4">

                <div>
                  <Icon
                    size={32}
                    className="text-brand-blue"
                  />
                </div>


                <div className="flex-1">

                  <h3 className="text-lg font-semibold">
                    {operation.title}
                  </h3>

                  <p className="text-gray-600">
                    {operation.description}
                  </p>

                </div>


                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={18}/>
                  {operation.time}
                </div>


              </div>

            </Card>
          );

        })}

      </div>

    </section>
  );
}