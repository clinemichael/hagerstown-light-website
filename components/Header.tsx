import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white shadow-sm">
      
      <div className="flex items-center">
        <Image
          src="/logo.jpg"
          alt="Hagerstown Light Logo"
          width={220}
          height={100}
        />
      </div>

      <nav className="hidden md:flex gap-8 text-sm font-medium text-brand-dark">
        <a
  href="#"
  className="hover:text-brand-blue transition"
>
  Home
</a>
<a
  href="#"
  className="hover:text-brand-blue transition"
>
  About
</a>
        <a
  href="#"
  className="hover:text-brand-blue transition"
>
  Services
</a>
        <a
  href="#"
  className="hover:text-brand-blue transition"
>
  Outages
</a>
        <a
  href="#"
  className="hover:text-brand-blue transition"
>
  Safety
</a>
        <a
  href="#"
  className="hover:text-brand-blue transition"
>
  Contact
</a>
      </nav>
<a
  href="#"
  className="hidden md:block bg-brand-blue text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition"
>
  Report an Outage
</a>
    </header>
  );
}