import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b bg-white">
      
      <div className="flex items-center">
        <Image
          src="/logo.jpg"
          alt="Hagerstown Light Logo"
          width={180}
          height={80}
        />
      </div>

      <nav className="hidden md:flex gap-8 text-sm font-medium">
        <a href="#">Home</a>
        <a href="#">Electric Services</a>
        <a href="#">Outages</a>
        <a href="#">Safety</a>
        <a href="#">Contact</a>
      </nav>

    </header>
  );
}