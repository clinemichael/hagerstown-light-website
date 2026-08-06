export default function Hero() {
  return (
    <section className="relative bg-[url('/hero.jpg')] bg-cover bg-[center_40%] text-white px-4 md:px-8 py-12 overflow-hidden">

      {/* Blue Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/80 to-transparent"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl min-h-[400px] mx-auto flex items-center -ml-2 md:-ml-4">

        <div className="max-w-2xl">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Powering Hagerstown.
            <br />
            Powering Our Community.
          </h1>

          <div className="h-1 w-20 bg-brand-gold mb-6"></div>

          <h2 className="text-2xl font-semibold text-brand-gold mb-6">
            Safe. Reliable. Local.
          </h2>

          <p className="text-lg md:text-xl leading-relaxed">
            Hagerstown Light provides dependable electric service,
            responsive customer support, and a commitment to the
            community we proudly serve.
          </p>

        </div>

      </div>

    </section>
  );
}