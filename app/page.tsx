import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import Hero from "@/components/Hero";
import QuickLinks from "@/components/QuickLinks";
import AlertBar from "@/components/AlertBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      <AlertBar /> 


      <Header />

      
      <Hero />


      <QuickLinks />


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