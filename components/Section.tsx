export default function Section({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}