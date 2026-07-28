export default function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-4xl font-bold text-brand-dark">
        {title}
      </h2>

      <div className="h-1 w-20 bg-brand-gold my-4"></div>

      {description && (
        <p className="text-lg text-gray-600 max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}