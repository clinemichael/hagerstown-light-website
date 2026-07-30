import Image from "next/image";
import Section from "./Section";
import SectionTitle from "./SectionTitle";


export default function About() {
  return (
       <Section>
      <SectionTitle
        title="About Hagerstown Light"
        description="Providing safe and reliable electric service to our community since 1908."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Text */}
        <div className="space-y-6">

         <p className="text-lg leading-relaxed text-gray-700">
          Hagerstown Light provides safe, reliable electric service
          while supporting the community we proudly serve. Our team
          is committed to delivering dependable power, responsive
          customer service, and a strong commitment to safety.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
             As a locally focused utility, we take pride in maintaining our electric
             system, responding to customer needs, and investing in the future of our
             community.
            </p>

        </div>

        {/* Image */}
        <Image
          src="/about.jpg"
          alt="Hagerstown Light crews working in the community"
          width={600}
          height={400}
          className="rounded-xl shadow-lg object-cover w-full"/>

      </div>
    </Section>
  );
}