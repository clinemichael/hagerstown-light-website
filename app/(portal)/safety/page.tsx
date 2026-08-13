import SafetyForms from "@/components/safety/SafetyForms";

export default function SafetyPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-blue">
        Safety
      </h1>

      <p className="mt-2 text-gray-600">
        Safety forms, reports, and resources.
      </p>

      <SafetyForms />
    </div>
  );
}