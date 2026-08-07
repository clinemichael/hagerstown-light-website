type StatusBadgeProps = {
  status: "normal" | "warning" | "critical";
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {

  const styles = {
    normal: {
      label: "Normal",
      color: "bg-green-100 text-green-700",
    },

    warning: {
      label: "Warning",
      color: "bg-yellow-100 text-yellow-700",
    },

    critical: {
      label: "Critical",
      color: "bg-red-100 text-red-700",
    },
  };


  const current = styles[status];


  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-sm
        font-semibold
        ${current.color}
      `}
    >
      ● {current.label}
    </span>
  );
}