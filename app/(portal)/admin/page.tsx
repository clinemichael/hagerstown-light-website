"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import type { PortalRole } from "@/lib/permissions";

export default function AdministrationPage() {
  const [role, setRole] =
    useState<PortalRole | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const {
        data: profile,
        error,
      } = await supabase
        .from("profiles")
        .select("role, active")
        .eq("id", user.id)
        .single();

      if (error || !profile) {
        console.error(
          "Unable to load portal role:",
          error
        );

        setLoading(false);
        return;
      }

      setRole(
        profile.role as PortalRole
      );

      setLoading(false);
    };

    loadRole();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Administration
        </h1>

        <p className="mt-2 text-gray-600">
          Loading administration options...
        </p>
      </div>
    );
  }

  const canAccessAdministration =
    role === "Supervisor" ||
    role === "Administrator";

  if (!canAccessAdministration) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Access Denied
        </h1>

        <p className="mt-2 text-gray-600">
          You do not have permission to
          access Administration.
        </p>
      </div>
    );
  }

  const canManagePortalAccounts =
    role === "Administrator";

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-900">
        Administration
      </h1>

      <p className="mt-2 text-gray-600">
        Manage HLD Operations system
        settings, employees, crews, fleet,
        and portal accounts.
      </p>

      {/* Administration Cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Employee Management */}
        <Link
          href="/admin/employees"
          className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Employee Management
          </h2>

          <p className="mt-2 text-gray-600">
            Manage employee information,
            status, and employee records.
          </p>
        </Link>

        {/* Crew Management */}
        <Link
          href="/admin/crews"
          className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Crew Management
          </h2>

          <p className="mt-2 text-gray-600">
            Manage crews, members, leads,
            vehicles, and crew status.
          </p>
        </Link>

        {/* Fleet Management */}
        <Link
          href="/admin/fleet"
          className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Fleet Management
          </h2>

          <p className="mt-2 text-gray-600">
            Manage vehicles, maintenance,
            status, and fleet records.
          </p>
        </Link>

        {/* Portal Accounts */}
        {canManagePortalAccounts && (
          <Link
            href="/admin/accounts"
            className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              Portal Accounts
            </h2>

            <p className="mt-2 text-gray-600">
              Manage portal accounts, roles,
              passwords, and access.
            </p>
          </Link>
        )}

        {/* Operations Alerts */}
        <Link
          href="/admin/alerts"
          className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-900">
            Operations Alerts
          </h2>

          <p className="mt-2 text-gray-600">
            Post and manage alerts shown on
            the operations dashboard.
          </p>
        </Link>
      </div>
    </div>
  );
}