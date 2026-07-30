import About from "@/components/About";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";

export default function AboutPage() {
  return (
    <Section>
      <SectionTitle
        title="About"
        description="Learn more about Hagerstown Light."
      />
      <About />
    </Section>
  );
}