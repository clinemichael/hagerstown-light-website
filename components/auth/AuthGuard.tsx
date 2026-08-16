"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAccess = async () => {
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
       * Get the user's portal profile.
       */
      const { data: profile, error } =
        await supabase
          .from("profiles")
          .select("active")
          .eq("id", user.id)
          .single();

      /*
       * Profile doesn't exist or could not be loaded.
       */
      if (error || !profile) {
        console.error(
          "Unable to verify portal account:",
          error
        );

        await supabase.auth.signOut();

        router.replace(
          "/?error=account"
        );

        return;
      }

      /*
       * Account has been disabled.
       */
      if (!profile.active) {
        await supabase.auth.signOut();

        router.replace(
          "/?error=disabled"
        );

        return;
      }

      /*
       * Account is valid and active.
       */
      if (mounted) {
        setLoading(false);
      }
    };

    checkAccess();

    /*
     * Monitor authentication changes.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        /*
         * User signed out.
         */
        if (!session) {
          router.replace("/");
          return;
        }

        /*
         * Re-check the portal profile whenever
         * the authentication state changes.
         */
        const { data: profile, error } =
          await supabase
            .from("profiles")
            .select("active")
            .eq("id", session.user.id)
            .single();

        /*
         * Profile could not be verified.
         */
        if (error || !profile) {
          console.error(
            "Unable to verify portal account:",
            error
          );

          await supabase.auth.signOut();

          router.replace(
            "/?error=account"
          );

          return;
        }

        /*
         * Account has been disabled.
         */
        if (!profile.active) {
          await supabase.auth.signOut();

          router.replace(
            "/?error=disabled"
          );

          return;
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  /*
   * Prevent protected pages from rendering
   * while authentication is being checked.
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">
          Checking authentication...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}