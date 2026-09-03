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

      {/* Safety Forms Web App */}
      <a
        href="YOUR_SAFETY_FORMS_URL"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
      >
        <h2 className="text-lg font-semibold">
          Safety Forms
        </h2>

        <p className="mt-2 text-gray-600">
          Open the HLD Safety Forms application for safety
          forms, inspections, reports, and incident documentation.
        </p>

        <p className="mt-4 font-medium text-brand-blue">
          Open Safety Forms →
        </p>
      </a>

      <SafetyForms />
    </div>
  );
}