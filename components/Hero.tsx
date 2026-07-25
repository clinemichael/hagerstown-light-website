export default function Hero() {
  return (
    <section className="bg-blue-900 text-white px-8 py-24">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold mb-6">
          Powering Hagerstown Since 1908
        </h1>

        <p className="text-xl max-w-3xl mb-8">
          Hagerstown Light provides reliable electric service,
          responsive customer support, and a commitment to the
          community we proudly serve.
        </p>

        <div className="flex gap-4">

          <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold">
            Report an Outage
          </button>

          <button className="border border-white px-6 py-3 rounded-lg font-semibold">
            View Services
          </button>

        </div>

      </div>
    </section>
  );
}