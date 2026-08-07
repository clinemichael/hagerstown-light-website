export default function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-4 border rounded-xl shadow-sm hover:shadow-lg hover:border-brand-blue transition min-h-[140px]">
      {children}
    </div>
  );
}