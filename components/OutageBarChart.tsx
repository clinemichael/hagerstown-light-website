type BarRow = {
  label: string;
  value: number;
  colorClass?: string;
};

export default function OutageBarChart({
  rows,
  defaultColorClass = "bg-brand-blue",
}: {
  rows: BarRow[];
  defaultColorClass?: string;
}) {
  if (rows.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-2">
        No data yet.
      </p>
    );
  }

  const max = Math.max(...rows.map((r) => r.value), 1);

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex items-center gap-3 text-sm"
        >
          <div className="w-28 shrink-0 truncate text-gray-600">
            {row.label}
          </div>

          <div className="flex-1 h-4 rounded bg-gray-100 overflow-hidden">
            <div
              className={`h-full rounded ${row.colorClass ?? defaultColorClass}`}
              style={{
                width: `${(row.value / max) * 100}%`,
              }}
            />
          </div>

          <div className="w-10 shrink-0 text-right text-gray-500">
            {row.value}
          </div>
        </div>
      ))}
    </div>
  );
}
