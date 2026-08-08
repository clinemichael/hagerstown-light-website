import { LucideIcon } from "lucide-react";

type SafetyFormCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function SafetyFormCard({
  title,
  description,
  icon: Icon,
}: SafetyFormCardProps) {
  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-xl
        p-6
        hover:shadow-md
        hover:-translate-y-1
        transition
        cursor-pointer
      "
    >
      <Icon
        size={30}
        className="text-brand-blue mb-4"
      />

      <h3 className="text-lg font-semibold text-brand-blue">
        {title}
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        {description}
      </p>

      <p className="mt-4 text-sm font-semibold text-brand-blue">
        Start →
      </p>
    </div>
  );
}