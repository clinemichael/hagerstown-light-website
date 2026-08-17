"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { PortalRole } from "@/lib/permissions";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAdminAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      /*
       * No authenticated user.
       */
      if (!user) {
        router.replace("/");
        return;
      }

      /*
       * Load portal profile.
       */
      const { data: profile, error } =
        await supabase
          .from("profiles")
          .select("role, active")
          .eq("id", user.id)
          .single();

      /*
       * Profile could not be loaded.
       */
      if (error || !profile) {
        console.error(
          "Unable to verify portal role:",
          error
        );

        await supabase.auth.signOut();

        router.replace(
          "/?error=account"
        );

        return;
      }

      /*
       * Account is disabled.
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
       * Employees cannot access Administration.
       *
       * Supervisors and Administrators can.
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

    checkAdminAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  /*
   * Don't render the administration pages
   * while access is being checked.
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">
          Checking permissions...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}