import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const allowedRoles = [
  "Employee",
  "Supervisor",
  "Administrator",
];

async function getAdminUser(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      ),
    };
  }

  const accessToken = authorization.replace(
    "Bearer ",
    ""
  );

  const supabaseUser = createClient(
    supabaseUrl,
    supabasePublishableKey,
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const {
    data: { user },
    error: userError,
  } = await supabaseUser.auth.getUser();

  if (userError || !user) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      ),
    };
  }

  const { data: profile, error: profileError } =
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

  if (!profile.active) {
    return {
      error: NextResponse.json(
        {
          error: "Your portal account is disabled.",
        },
        { status: 403 }
      ),
    };
  }

  if (profile.role !== "Administrator") {
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

  return { user };
}

/*
 * CREATE PORTAL ACCOUNT
 */
export async function POST(request: Request) {
  try {
    const auth = await getAdminUser(request);

    if ("error" in auth) {
      return auth.error;
    }

    const body = await request.json();

    const {
      full_name,
      email,
      password,
      role,
    } = body;

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

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        {
          error: "Invalid portal role.",
        },
        { status: 400 }
      );
    }

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
     * Create the Supabase Auth user.
     */
    const {
      data: authData,
      error: authError,
    } =
      await supabaseAdmin.auth.admin.createUser({
        email: email.trim(),
        password,
        email_confirm: true,
      });

    if (authError || !authData.user) {
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
     * Create the portal profile.
     */
    const { error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .insert({
          id: authData.user.id,
          full_name: full_name.trim(),
          role,
          active: true,
        });

    /*
     * Roll back the Auth user if the profile fails.
     */
    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(
        authData.user.id
      );

      return NextResponse.json(
        {
          error: profileError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        account: {
          id: authData.user.id,
          full_name: full_name.trim(),
          email: email.trim(),
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
        error: "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}

/*
 * UPDATE ACCOUNT / SET TEMPORARY PASSWORD
 */
export async function PATCH(request: Request) {
  try {
    const auth = await getAdminUser(request);

    if ("error" in auth) {
      return auth.error;
    }

    const body = await request.json();

    const {
      account_id,
      full_name,
      role,
      active,
      password,
    } = body;

    if (!account_id) {
      return NextResponse.json(
        {
          error: "Account ID is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Update profile information.
     */
    const profileUpdates: {
      full_name?: string;
      role?: string;
      active?: boolean;
      updated_at: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    if (full_name !== undefined) {
      if (!full_name.trim()) {
        return NextResponse.json(
          {
            error: "Name cannot be empty.",
          },
          { status: 400 }
        );
      }

      profileUpdates.full_name =
        full_name.trim();
    }

    if (role !== undefined) {
      if (!allowedRoles.includes(role)) {
        return NextResponse.json(
          {
            error: "Invalid portal role.",
          },
          { status: 400 }
        );
      }

      profileUpdates.role = role;
    }

    if (active !== undefined) {
      profileUpdates.active = Boolean(active);
    }

    const { error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .update(profileUpdates)
        .eq("id", account_id);

    if (profileError) {
      return NextResponse.json(
        {
          error: profileError.message,
        },
        { status: 500 }
      );
    }

    /*
     * If a temporary password was supplied,
     * update it through Supabase Auth.
     */
    if (password !== undefined) {
      if (password.length < 8) {
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
        error: "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}