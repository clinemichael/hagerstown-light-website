import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b">
        <div className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="Hagerstown Light Logo"
            width={180}
            height={80}
          />
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#">Home</a>
          <a href="#">Electric Services</a>
          <a href="#">Outages</a>
          <a href="#">Safety</a>
          <a href="#">Contact</a>
        </nav>
      </header>


      {/* Hero Section */}
      <section className="bg-blue-900 text-white px-8 py-24">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-6">
            Powering Hagerstown Since 1908
          </h1>

          <p className="text-xl max-w-3xl mb-8">
            Hagerstown Light provides reliable electric service,
            responsive customer support, and a commitment to the community
            we proudly serve.
          </p>

          <div className="flex gap-4">
            <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold">
              Report an Outage
            </button>

            <button className="border border-white px-6 py-3 rounded-lg font-semibold">
              Customer Information
            </button>
          </div>

        </div>
      </section>


      {/* Services */}
      <section className="px-8 py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Our Services
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          <div className="p-6 border rounded-xl">
            <h3 className="font-bold text-xl mb-3">
              Electric Service
            </h3>
            <p>
              Information about power delivery, billing, and electric programs.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-bold text-xl mb-3">
              Outages
            </h3>
            <p>
              Find outage information and learn what to do during interruptions.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-bold text-xl mb-3">
              Safety
            </h3>
            <p>
              Learn how to stay safe around electrical equipment.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-bold text-xl mb-3">
              Contact Us
            </h3>
            <p>
              Get assistance from the Hagerstown Light team.
            </p>
          </div>

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-white px-8 py-8 text-center">
        <p>
          Hagerstown Light | City of Hagerstown Electric Division
        </p>
      </footer>

    </main>
  );
}