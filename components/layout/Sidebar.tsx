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
  AlertTriangle,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import ProfileModal from "@/components/profile/ProfileModal";

import {
  type PortalRole,
  canViewDashboard,
  canViewOperations,
  canViewEmployees,
  canViewFleet,
  canViewDocuments,
  isAdministrator,
} from "@/lib/permissions";

type PortalProfile = {
  fullName: string;
  role: PortalRole;
  email: string;
  active: boolean;
};

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
  }>;
  visible: boolean;
};

export default function Sidebar() {
  const router = useRouter();

  const [profile, setProfile] =
    useState<PortalProfile | null>(null);

  const [profileOpen, setProfileOpen] =
    useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/");
        return;
      }

      const {
        data: profileData,
        error,
      } = await supabase
        .from("profiles")
        .select(
          "full_name, role, active"
        )
        .eq("id", user.id)
        .single();

      if (error || !profileData) {
        console.error(
          "Unable to load portal profile:",
          error
        );

        return;
      }

      setProfile({
        fullName:
          profileData.full_name,
        role:
          profileData.role as PortalRole,
        email:
          user.email ?? "",
        active:
          profileData.active,
      });
    };

    loadProfile();
  }, [router]);

  const role =
    profile?.role ?? "Employee";

  const navigation: NavigationItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      visible: canViewDashboard(role),
    },
    {
      name: "Operations",
      href: "/operations",
      icon: Zap,
      visible: canViewOperations(role),
    },
    {
      name: "Outages",
      href: "/outages",
      icon: AlertTriangle,
      visible: true,
    },
    {
      name: "Safety",
      href: "/safety",
      icon: Shield,
      visible: true,
    },
    {
      name: "Employees",
      href: "/employees",
      icon: Users,
      visible: canViewEmployees(role),
    },
    {
      name: "Fleet",
      href: "/fleet",
      icon: Truck,
      visible: canViewFleet(role),
    },
    {
      name: "Engineering",
      href: "/engineering",
      icon: Map,
      visible: true,
    },
    {
      name: "Documents",
      href: "/documents",
      icon: FileText,
      visible: canViewDocuments(role),
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart3,
      visible:
        role === "Supervisor" ||
        isAdministrator(role),
    },
    {
      name: "Administration",
      href: "/admin",
      icon: Settings,
      visible:
        role === "Supervisor" ||
        isAdministrator(role),
    },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();

    router.replace("/");
  };

  return (
    <>
      <aside className="flex h-screen w-64 flex-col bg-brand-blue text-white">
        {/* Logo */}
        <div className="border-b border-white/20 p-6">
          <h1 className="text-2xl font-bold">
            HLD
          </h1>

          <p className="text-sm text-white/80">
            Operations Platform
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navigation
            .filter((item) => item.visible)
            .map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-white/10"
                >
                  <Icon size={20} />

                  <span>
                    {item.name}
                  </span>
                </Link>
              );
            })}
        </nav>

        {/* User */}
        <div className="border-t border-white/20 p-6">
          <button
            type="button"
            onClick={() =>
              setProfileOpen(true)
            }
            className="-m-2 block w-full rounded-lg p-2 text-left transition hover:bg-white/10"
          >
            <p className="font-semibold">
              {profile?.fullName ??
                "Loading..."}
            </p>

            <p className="text-sm text-white/70">
              {profile?.role ??
                "Loading..."}
            </p>

            <p className="mt-2 text-xs text-white/60">
              Profile & Settings →
            </p>
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-4 w-full rounded-lg border border-white/20 px-4 py-2 text-sm transition hover:bg-white/10"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Profile Modal */}
      {profileOpen && profile && (
        <ProfileModal
          employee={{
            name: profile.fullName,
            title: profile.role,
            employeeId: "",
            status: profile.active
              ? "Active"
              : "Disabled",
            role: profile.role,
            email: profile.email,
          }}
          onClose={() =>
            setProfileOpen(false)
          }
        />
      )}
    </>
  );
}
