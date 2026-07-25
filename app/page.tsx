import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header />
      
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

<Footer />

    </main>
  );
}