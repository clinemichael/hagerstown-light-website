interface ServiceCardProps {
  title: string;
  description: string;
}

export default function ServiceCard({
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
      <h3 className="text-xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}