export default function Hero() {
  return (
    <section className="bg-brand-blue text-white px-8 py-24">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Powering Hagerstown.
          <br />
          Powering Our Community.
        </h1>

        <div className="h-1 w-20 bg-brand-gold mb-6"></div>

        <h2 className="text-2xl font-semibold text-brand-gold mb-6">
          Safe. Reliable. Local.
        </h2>

        <p className="text-lg md:text-xl max-w-3xl leading-relaxed">
          Hagerstown Light provides dependable electric service,
          responsive customer support, and a commitment to the
          community we proudly serve.
        </p>

      </div>
    </section>
  );
}