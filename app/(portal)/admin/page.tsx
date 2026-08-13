import Link from "next/link";

export default function AdministrationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Administration
      </h1>

      <p className="mt-2 text-gray-600">
        Manage HLD Operations system settings and employees.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <Link
  href="/admin/employees"
  className="block rounded-xl border bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-blue transition"
>
  <h2 className="text-xl font-semibold">
    Employees
  </h2>

  <p className="mt-2 text-gray-600">
    View and manage HLD employees.
  </p>
</Link>

        <Link
  href="/admin/accounts"
  className="block rounded-xl border bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-blue transition"
>
  <h2 className="text-xl font-semibold">
    User Accounts
  </h2>
</Link>

          <p className="mt-2 text-gray-600">
            Manage portal accounts, roles, and access.
          </p>
        </div>

      </div>
  );
}