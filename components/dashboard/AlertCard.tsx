type AlertCardProps = {
  title: string;
  description: string;
  priority: "info" | "warning" | "critical";
};

export default function AlertCard({
  title,
  description,
  priority,
}: AlertCardProps) {

  const styles = {
    info: {
      border: "border-blue-200",
      icon: "🔵",
    },

    warning: {
      border: "border-yellow-200",
      icon: "🟡",
    },

    critical: {
      border: "border-red-200",
      icon: "🔴",
    },
  };


  const current = styles[priority];


  return (
    <div
      className={`
        bg-white
        border
        ${current.border}
        rounded-lg
        p-4
      `}
    >

      <div className="flex gap-3">

        <span className="text-lg">
          {current.icon}
        </span>


        <div>

          <h3 className="font-semibold">
            {title}
          </h3>


          <p className="text-sm text-gray-600 mt-1">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}