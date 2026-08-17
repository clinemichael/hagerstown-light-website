import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const allowedRoles = [
  "Employee",
  "Supervisor",
  "Administrator",
];

/*
 * ========================================
 * VERIFY ADMINISTRATOR
 * ========================================
 */

async function getAdminUser(request: Request) {
  const authorization =
    request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return {
      error: NextResponse.json(
        {
          error: "Unauthorized.",
        },
        { status: 401 }
      ),
    };
  }

  const accessToken =
    authorization.replace("Bearer ", "");

  /*
   * Get public Supabase configuration.
   *
   * These are safe to use for verifying
   * the user's access token.
   */
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (
    !supabaseUrl ||
    !supabasePublishableKey
  ) {
    console.error(
      "Supabase public environment variables are missing."
    );

    return {
      error: NextResponse.json(
        {
          error:
            "Supabase configuration is missing.",
        },
        { status: 500 }
      ),
    };
  }

  /*
   * Create a client using the user's
   * access token.
   */
  const supabaseUser = createClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      global: {
        headers: {
          Authorization:
            `Bearer ${accessToken}`,
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  /*
   * Verify the authenticated user.
   */
  const {
    data: { user },
    error: userError,
  } = await supabaseUser.auth.getUser();

  if (userError || !user) {
    return {
      error: NextResponse.json(
        {
          error: "Unauthorized.",
        },
        { status: 401 }
      ),
    };
  }

  /*
   * Create the server-side admin client.
   */
  let supabaseAdmin;

  try {
    supabaseAdmin =
      getSupabaseAdmin();
  } catch (error) {
    console.error(
      "Unable to initialize Supabase admin client:",
      error
    );

    return {
      error: NextResponse.json(
        {
          error:
            "Server database configuration is missing.",
        },
        { status: 500 }
      ),
    };
  }

  /*
   * Load the user's portal profile.
   */
  const {
    data: profile,
    error: profileError,
  } =
    await supabaseAdmin
      .from("profiles")
      .select("role, active")
      .eq("id", user.id)
      .single();

  if (profileError || !profile) {
    return {
      error: NextResponse.json(
        {
          error:
            "Your portal account could not be verified.",
        },
        { status: 403 }
      ),
    };
  }

  /*
   * Disabled accounts cannot use
   * the portal account API.
   */
  if (!profile.active) {
    return {
      error: NextResponse.json(
        {
          error:
            "Your portal account is disabled.",
        },
        { status: 403 }
      ),
    };
  }

  /*
   * Portal account management is
   * Administrator-only.
   */
  if (
    profile.role !== "Administrator"
  ) {
    return {
      error: NextResponse.json(
        {
          error:
            "Administrator access is required.",
        },
        { status: 403 }
      ),
    };
  }

  return {
    user,
    supabaseAdmin,
  };
}

/*
 * ========================================
 * CREATE PORTAL ACCOUNT
 * ========================================
 */

export async function POST(
  request: Request
) {
  try {
    const auth =
      await getAdminUser(request);

    if ("error" in auth) {
      return auth.error;
    }

    const {
      supabaseAdmin,
    } = auth;

    const body =
      await request.json();

    const {
      full_name,
      email,
      password,
      role,
    } = body;

    /*
     * Validate required fields.
     */
    if (
      !full_name?.trim() ||
      !email?.trim() ||
      !password ||
      !role
    ) {
      return NextResponse.json(
        {
          error:
            "Name, email, password, and role are required.",
        },
        { status: 400 }
      );
    }

    /*
     * Validate role.
     */
    if (
      !allowedRoles.includes(role)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid portal role.",
        },
        { status: 400 }
      );
    }

    /*
     * Validate password.
     */
    if (password.length < 8) {
      return NextResponse.json(
        {
          error:
            "Temporary password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    /*
     * Create Supabase Auth user.
     */
    const {
      data: authData,
      error: authError,
    } =
      await supabaseAdmin.auth.admin.createUser(
        {
          email: email.trim(),
          password,
          email_confirm: true,
        }
      );

    if (
      authError ||
      !authData.user
    ) {
      return NextResponse.json(
        {
          error:
            authError?.message ??
            "Unable to create the login account.",
        },
        { status: 400 }
      );
    }

    /*
     * Create portal profile.
     */
    const {
      error: profileError,
    } =
      await supabaseAdmin
        .from("profiles")
        .insert({
          id: authData.user.id,
          full_name:
            full_name.trim(),
          role,
          active: true,
        });

    /*
     * Roll back the Auth user if
     * profile creation fails.
     */
    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(
        authData.user.id
      );

      return NextResponse.json(
        {
          error:
            profileError.message,
        },
        { status: 500 }
      );
    }

    /*
     * Return the newly-created account.
     */
    return NextResponse.json(
      {
        success: true,

        account: {
          id: authData.user.id,
          full_name:
            full_name.trim(),
          email:
            email.trim(),
          role,
          active: true,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Create portal account error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}

/*
 * ========================================
 * UPDATE PORTAL ACCOUNT
 * ========================================
 *
 * Can update:
 *
 * - Full name
 * - Role
 * - Active status
 * - Password
 *
 */

export async function PATCH(
  request: Request
) {
  try {
    const auth =
      await getAdminUser(request);

    if ("error" in auth) {
      return auth.error;
    }

    const {
      supabaseAdmin,
    } = auth;

    const body =
      await request.json();

    const {
      account_id,
      full_name,
      role,
      active,
      password,
    } = body;

    /*
     * Account ID is required.
     */
    if (!account_id) {
      return NextResponse.json(
        {
          error:
            "Account ID is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Build profile updates.
     */
    const profileUpdates: {
      full_name?: string;
      role?: string;
      active?: boolean;
      updated_at: string;
    } = {
      updated_at:
        new Date().toISOString(),
    };

    /*
     * Update full name.
     */
    if (
      full_name !== undefined
    ) {
      if (
        !full_name.trim()
      ) {
        return NextResponse.json(
          {
            error:
              "Name cannot be empty.",
          },
          { status: 400 }
        );
      }

      profileUpdates.full_name =
        full_name.trim();
    }

    /*
     * Update role.
     */
    if (role !== undefined) {
      if (
        !allowedRoles.includes(role)
      ) {
        return NextResponse.json(
          {
            error:
              "Invalid portal role.",
          },
          { status: 400 }
        );
      }

      profileUpdates.role =
        role;
    }

    /*
     * Update active status.
     */
    if (active !== undefined) {
      profileUpdates.active =
        Boolean(active);
    }

    /*
     * Update the profile.
     */
    const {
      error: profileError,
    } =
      await supabaseAdmin
        .from("profiles")
        .update(profileUpdates)
        .eq("id", account_id);

    if (profileError) {
      return NextResponse.json(
        {
          error:
            profileError.message,
        },
        { status: 500 }
      );
    }

    /*
     * Update password if supplied.
     */
    if (
      password !== undefined
    ) {
      if (
        password.length < 8
      ) {
        return NextResponse.json(
          {
            error:
              "Temporary password must be at least 8 characters.",
          },
          { status: 400 }
        );
      }

      const {
        error: passwordError,
      } =
        await supabaseAdmin.auth.admin.updateUserById(
          account_id,
          {
            password,
          }
        );

      if (passwordError) {
        return NextResponse.json(
          {
            error:
              passwordError.message,
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Update portal account error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}