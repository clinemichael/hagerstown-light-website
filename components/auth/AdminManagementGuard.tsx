"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import type { PortalRole } from "@/lib/permissions";

type AdminManagementGuardProps = {
  children: React.ReactNode;
};

export default function AdminManagementGuard({
  children,
}: AdminManagementGuardProps) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async () => {
      /*
       * Check authentication
       */
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/");
        return;
      }

      /*
       * Load portal profile
       */
      const {
        data: profile,
        error,
      } = await supabase
        .from("profiles")
        .select("role, active")
        .eq("id", user.id)
        .single();

      /*
       * Profile could not be loaded
       */
      if (error || !profile) {
        console.error(
          "Unable to verify portal access:",
          error
        );

        await supabase.auth.signOut();

        router.replace(
          "/?error=account"
        );

        return;
      }

      /*
       * Disabled account
       */
      if (!profile.active) {
        await supabase.auth.signOut();

        router.replace(
          "/?error=disabled"
        );

        return;
      }

      const role =
        profile.role as PortalRole;

      /*
       * Supervisors and Administrators
       * can access these management areas.
       */
      if (
        role !== "Supervisor" &&
        role !== "Administrator"
      ) {
        router.replace("/dashboard");
        return;
      }

      if (mounted) {
        setLoading(false);
      }
    };

    checkAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  /*
   * Don't render the page while
   * permissions are being checked.
   */
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Checking permissions...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}