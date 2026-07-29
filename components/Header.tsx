import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white shadow-sm">

      <Link href="/" className="flex items-center">
        <Image
          src="/logo.jpg"
          alt="Hagerstown Light Logo"
          width={220}
          height={100}
        />
      </Link>

      <nav className="hidden md:flex gap-8 text-sm font-medium text-brand-dark">
        <Link href="/" className="hover:text-brand-blue transition">
          Home
        </Link>

        <Link href="/About" className="hover:text-brand-blue transition">
          About
        </Link>

        <Link href="/services" className="hover:text-brand-blue transition">
          Services
        </Link>

        <Link href="/outages" className="hover:text-brand-blue transition">
          Outages
        </Link>

        <Link href="/safety" className="hover:text-brand-blue transition">
          Safety
        </Link>

        <Link href="/contact" className="hover:text-brand-blue transition">
          Contact
        </Link>
      </nav>

      <Link
        href="/outages"
        className="hidden md:block bg-brand-blue text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Report an Outage
      </Link>

    </header>
  );
}