import { LucideIcon } from "lucide-react";

type QuickActionCardProps = {
  title: string;
  icon: LucideIcon;
};

export default function QuickActionCard({
  title,
  icon: Icon,
}: QuickActionCardProps) {
  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-lg
        p-4
        flex
        items-center
        gap-3
        hover:shadow-md
        hover:-translate-y-1
        transition
        cursor-pointer
      "
    >
      <Icon
        size={24}
        className="text-brand-blue"
      />

      <span className="font-semibold text-gray-800">
        {title}
      </span>
    </div>
  );
}