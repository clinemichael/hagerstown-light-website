import { LucideIcon } from "lucide-react";

type ActionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export default function ActionCard({
  title,
  description,
  icon: Icon,
}: ActionCardProps) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      border
      border-gray-200
      p-6
      hover:shadow-lg
      hover:-translate-y-1
      transition
      cursor-pointer
      "
    >

      <Icon
        size={32}
        className="text-brand-blue mb-4"
      />

      <h3 className="text-xl font-semibold text-brand-blue">
        {title}
      </h3>

      <p className="mt-2 text-gray-600">
        {description}
      </p>

      <p className="mt-4 text-sm font-semibold text-brand-blue">
        Open →
      </p>

    </div>
  );
}