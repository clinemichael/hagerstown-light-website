type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-200 p-6 ${className}`}
    >
      {title && (
        <h2 className="text-xl font-semibold text-brand-blue mb-4">
          {title}
        </h2>
      )}

      {children}
    </div>
  );
}