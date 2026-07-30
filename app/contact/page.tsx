import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <Section>
      <SectionTitle
        title="Contact"
        description="Get in touch with Hagerstown Light."/>

        <ContactForm />
      
        {/* Page content goes here */}

    </Section>
  );
}