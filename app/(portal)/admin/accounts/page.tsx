"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  ShieldCheck,
  ShieldOff,
  X,
  KeyRound,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type PortalAccount = {
  account_id: string;
  full_name: string;
  role: string;
  active: boolean;
};

const roles = [
  "Employee",
  "Supervisor",
  "Administrator",
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<PortalAccount[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [selectedAccount, setSelectedAccount] =
    useState<PortalAccount | null>(null);

  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editActive, setEditActive] = useState(true);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] =
    useState("");
  const [newRole, setNewRole] =
    useState("Employee");

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [temporaryPassword, setTemporaryPassword] =
    useState("");

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, role, active")
      .order("full_name");

    if (error) {
      console.error(
        "Error loading portal accounts:",
        error
      );

      setError(error.message);
      setLoading(false);
      return;
    }

    const formattedAccounts: PortalAccount[] =
      (data ?? []).map((account) => ({
        account_id: account.id,
        full_name: account.full_name,
        role: account.role,
        active: account.active,
      }));

    setAccounts(formattedAccounts);
    setLoading(false);
  }

  /*
   * Get the current user's access token.
   */
  async function getAccessToken() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session?.access_token ?? null;
  }

  /*
   * ADD ACCOUNT
   */
  async function createAccount() {
    if (
      !newName.trim() ||
      !newEmail.trim() ||
      !newPassword
    ) {
      setError(
        "Name, email, and temporary password are required."
      );
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Temporary password must be at least 8 characters."
      );
      return;
    }

    setSaving(true);
    setError("");

    const accessToken =
      await getAccessToken();

    if (!accessToken) {
      setError("Your session has expired.");
      setSaving(false);
      return;
    }

    const response = await fetch(
      "/api/admin/accounts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          full_name: newName.trim(),
          email: newEmail.trim(),
          password: newPassword,
          role: newRole,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setError(
        result.error ??
          "Unable to create the account."
      );

      setSaving(false);
      return;
    }

    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRole("Employee");

    setShowAddModal(false);

    setSaving(false);

    await loadAccounts();
  }

  /*
   * OPEN EDIT
   */
  function openEditModal(
    account: PortalAccount
  ) {
    setSelectedAccount(account);

    setEditName(account.full_name);
    setEditRole(account.role);
    setEditActive(account.active);

    setError("");
  }

  /*
   * CLOSE EDIT
   */
  function closeEditModal() {
    if (saving) return;

    setSelectedAccount(null);

    setEditName("");
    setEditRole("");
    setEditActive(true);

    setTemporaryPassword("");
  }

  /*
   * SAVE ACCOUNT
   */
  async function saveAccount() {
    if (!selectedAccount) return;

    if (!editName.trim()) {
      setError("Name is required.");
      return;
    }

    setSaving(true);
    setError("");

    const accessToken =
      await getAccessToken();

    if (!accessToken) {
      setError("Your session has expired.");
      setSaving(false);
      return;
    }

    const response = await fetch(
      "/api/admin/accounts",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          account_id:
            selectedAccount.account_id,
          full_name: editName.trim(),
          role: editRole,
          active: editActive,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setError(
        result.error ??
          "Unable to update the account."
      );

      setSaving(false);
      return;
    }

    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.account_id ===
        selectedAccount.account_id
          ? {
              ...account,
              full_name: editName.trim(),
              role: editRole,
              active: editActive,
            }
          : account
      )
    );

    setSaving(false);
    closeEditModal();
  }

  /*
   * SET TEMPORARY PASSWORD
   */
  async function setPassword() {
    if (!selectedAccount) return;

    if (!temporaryPassword) {
      setError(
        "Enter a temporary password."
      );
      return;
    }

    if (temporaryPassword.length < 8) {
      setError(
        "Temporary password must be at least 8 characters."
      );
      return;
    }

    setSaving(true);
    setError("");

    const accessToken =
      await getAccessToken();

    if (!accessToken) {
      setError("Your session has expired.");
      setSaving(false);
      return;
    }

    const response = await fetch(
      "/api/admin/accounts",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          account_id:
            selectedAccount.account_id,
          password: temporaryPassword,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setError(
        result.error ??
          "Unable to set the password."
      );

      setSaving(false);
      return;
    }

    setTemporaryPassword("");
    setShowPasswordModal(false);

    setSaving(false);

    alert(
      "Temporary password updated successfully."
    );
  }

  const filteredAccounts =
    accounts.filter((account) => {
      const searchText =
        search.toLowerCase();

      return (
        account.full_name
          .toLowerCase()
          .includes(searchText) ||
        account.role
          .toLowerCase()
          .includes(searchText)
      );
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Portal Accounts
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage access to the HLD Operations
            portal.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setError("");
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Account
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search accounts..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <strong>
            Unable to complete the request.
          </strong>

          <div className="mt-1">{error}</div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Name
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Role
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  Loading portal accounts...
                </td>
              </tr>
            ) : filteredAccounts.length ===
              0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No portal accounts found.
                </td>
              </tr>
            ) : (
              filteredAccounts.map(
                (account) => (
                  <tr
                    key={account.account_id}
                    onClick={() =>
                      openEditModal(account)
                    }
                    className="cursor-pointer transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {account.full_name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {account.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {account.active ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          <ShieldCheck
                            size={14}
                          />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                          <ShieldOff
                            size={14}
                          />
                          Disabled
                        </span>
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {/* ADD ACCOUNT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Add Portal Account
                </h2>

                <p className="text-sm text-gray-500">
                  Create login access for any authorized user.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddModal(false)
                }
                disabled={saving}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={newName}
                  onChange={(e) =>
                    setNewName(e.target.value)
                  }
                  placeholder="John Smith"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>

                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) =>
                    setNewEmail(e.target.value)
                  }
                  placeholder="john@example.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Temporary Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="At least 8 characters"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-1 text-xs text-gray-500">
                  The user should change this after signing in.
                </p>
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Portal Role
                </label>

                <select
                  value={newRole}
                  onChange={(e) =>
                    setNewRole(e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {roles.map((role) => (
                    <option
                      key={role}
                      value={role}
                    >
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setShowAddModal(false)
                }
                disabled={saving}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createAccount}
                disabled={saving}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving
                  ? "Creating..."
                  : "Create Account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT ACCOUNT MODAL */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Edit Portal Account
                </h2>

                <p className="text-sm text-gray-500">
                  Update portal account settings.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={saving}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Role */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Portal Role
                </label>

                <select
                  value={editRole}
                  onChange={(e) =>
                    setEditRole(e.target.value)
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  {roles.map((role) => (
                    <option
                      key={role}
                      value={role}
                    >
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Access */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Portal Access
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setEditActive(
                      !editActive
                    )
                  }
                  className={`mt-1 flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left ${
                    editActive
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {editActive
                        ? "Active"
                        : "Disabled"}
                    </div>

                    <div className="text-sm text-gray-500">
                      {editActive
                        ? "User can access the portal."
                        : "User cannot access the portal."}
                    </div>
                  </div>

                  {editActive ? (
                    <ShieldCheck
                      size={22}
                      className="text-green-600"
                    />
                  ) : (
                    <ShieldOff
                      size={22}
                      className="text-gray-500"
                    />
                  )}
                </button>
              </div>

              {/* Password */}
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 font-medium text-gray-900">
                      <KeyRound size={17} />
                      Password
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      Set a new temporary password for this user.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setTemporaryPassword("");
                      setShowPasswordModal(
                        true
                      );
                    }}
                    disabled={saving}
                    className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Set Temporary Password
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={saving}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveAccount}
                disabled={saving}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD MODAL */}
      {showPasswordModal &&
        selectedAccount && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-xl">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Set Temporary Password
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Set a new temporary password for{" "}
                  <strong>
                    {selectedAccount.full_name}
                  </strong>
                  .
                </p>
              </div>

              <div className="space-y-4 px-6 py-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    New Temporary Password
                  </label>

                  <input
                    type="password"
                    value={temporaryPassword}
                    onChange={(e) =>
                      setTemporaryPassword(
                        e.target.value
                      )
                    }
                    placeholder="At least 8 characters"
                    autoFocus
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
                  This will immediately replace the user's current password.
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordModal(
                      false
                    )
                  }
                  disabled={saving}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={setPassword}
                  disabled={saving}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving
                    ? "Updating..."
                    : "Set Password"}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}