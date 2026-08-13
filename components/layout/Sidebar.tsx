"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { supabase } from "@/lib/supabase";
import ProfileModal from "@/components/profile/ProfileModal";

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

type EmployeeProfile = {
  name: string;
  title: string;
  employeeId: string;
  status: string;
  role: string;
  email: string;
};

export default function Sidebar() {
  const router = useRouter();

  const [employee, setEmployee] = useState<EmployeeProfile | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const loadEmployee = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("employee_id, role, active")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {
        console.error("Unable to load profile:", profileError);
        return;
      }

      const { data: employeeData, error: employeeError } =
        await supabase
          .from("employees")
          .select("id, name, title, status")
          .eq("id", profile.employee_id)
          .single();

      if (employeeError || !employeeData) {
        console.error("Unable to load employee:", employeeError);
        return;
      }

      setEmployee({
  name: employeeData.name,
  title: employeeData.title,
  employeeId: employeeData.id,
  status: employeeData.status,
  role: profile.role,
  email: user.email ?? "",
});
    };

    loadEmployee();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <>
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

          <button
            type="button"
            onClick={() => setProfileOpen(true)}
            className="block w-full rounded-lg p-2 -m-2 text-left hover:bg-white/10 transition"
          >
            <p className="font-semibold">
              {employee?.name ?? "Loading..."}
            </p>

            <p className="text-sm text-white/70">
              {employee?.title ?? "Employee"}
            </p>

            <p className="mt-2 text-xs text-white/60">
              Profile & Settings →
            </p>
          </button>

          <button
            onClick={handleSignOut}
            className="mt-4 w-full rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
          >
            Sign Out
          </button>

        </div>

      </aside>

      {/* Profile Modal */}
      {profileOpen && employee && (
        <ProfileModal
          employee={employee}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </>
  );
}