import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      <Header />

      
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

          <ServiceCard
  title="Electric Service"
  description="Information about power delivery, billing, and electric programs."
/>

<ServiceCard
  title="Outages"
  description="Find outage information and learn what to do during interruptions."
/>

<ServiceCard
  title="Safety"
  description="Learn how to stay safe around electrical equipment."
/>

<ServiceCard
  title="Contact Us"
  description="Get assistance from the Hagerstown Light team."
/>

        </div>

      </section>

<Footer />

    </main>
  );
}