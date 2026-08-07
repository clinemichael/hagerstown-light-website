import Link from "next/link";
import {
  LayoutDashboard,
  Zap,
  Shield,
  Users,
  Truck,
  Map,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Operations", href: "/operations", icon: Zap },
  { name: "Safety", href: "/safety", icon: Shield },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Fleet", href: "/fleet", icon: Truck },
  { name: "Engineering", href: "/engineering", icon: Map },
  { name: "Documents", href: "/documents", icon: FileText },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Administration", href: "/admin", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-brand-blue text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <h1 className="text-2xl font-bold">HLD</h1>
        <p className="text-sm text-white/80">
          Operations Platform
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-white/10 transition"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-white/20 p-6">
        <p className="font-semibold">Michael Cline</p>
        <p className="text-sm text-white/70">
          Hagerstown Light Department
        </p>
      </div>

    </aside>
  );
}