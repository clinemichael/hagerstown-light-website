"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /*
   * Check whether the user was redirected here
   * because their portal account was disabled.
   */
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const errorType = params.get("error");

    if (errorType === "disabled") {
      setError(
        "Your HLD Operations portal account has been disabled. Please contact an administrator for assistance."
      );
    } else if (errorType === "account") {
      setError(
        "We could not verify your portal account. Please contact an administrator for assistance."
      );
    }
  }, []);

  const handleLogin = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    /*
     * AuthGuard will perform the additional
     * profiles.active check after login.
     */
    window.location.href = "/dashboard";
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Employee Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            className="mt-1 w-full rounded-lg border px-4 py-3"
            placeholder="employee@hld.local"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setError("");
            }}
            className="mt-1 w-full rounded-lg border px-4 py-3"
            placeholder="Password"
            required
          />
        </div>

        {/* Error / Account Status */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* Sign In */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-brand-blue
            text-white
            py-3
            rounded-lg
            font-semibold
            hover:bg-opacity-90
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>
      </form>
    </div>
  );
}