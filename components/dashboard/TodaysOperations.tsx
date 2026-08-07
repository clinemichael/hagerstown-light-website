import {
  Users,
  Zap,
  Wrench,
  Clock,
} from "lucide-react";


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
    <section>

      <h2 className="text-xl font-bold text-brand-blue mb-4">
        Today's Operations
      </h2>


      <div className="bg-white rounded-lg border border-gray-200 divide-y">

        {operations.map((operation) => {

          const Icon = operation.icon;

          return (
            <div
              key={operation.title}
              className="
                flex
                items-center
                gap-4
                p-4
              "
            >

              <Icon
                size={24}
                className="text-brand-blue"
              />


              <div className="flex-1">

                <h3 className="font-semibold">
                  {operation.title}
                </h3>

                <p className="text-sm text-gray-600">
                  {operation.description}
                </p>

              </div>


              <div className="
                flex
                items-center
                gap-2
                text-sm
                text-gray-500
              ">
                <Clock size={16}/>
                {operation.time}
              </div>

            </div>
          );

        })}

      </div>

    </section>
  );
}