import Section from "@/components/Section";
import SectionTitle from "@/components/common/SectionTitle";
import OutagesPortal from "@/components/outages/OutagesPortal";

export default function OutagesPage() {
  return (
    <Section>
      <SectionTitle
        title="Storm Outage Center"
        description="Live outage call intake, dispatch board, and storm event reporting."
      />

      <OutagesPortal />
    </Section>
  );
}
