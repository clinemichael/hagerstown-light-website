"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";
import type { PortalRole } from "@/lib/permissions";

export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      /*
       * Not logged in
       */
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
       * Profile doesn't exist
       */
      if (error || !profile) {
        console.error(
          "Unable to verify portal account access:",
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
       * Portal Accounts are
       * Administrator-only.
       */
      if (role !== "Administrator") {
        router.replace("/admin");
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