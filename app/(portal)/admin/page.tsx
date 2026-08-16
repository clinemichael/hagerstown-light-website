import Link from "next/link";

export default function AdministrationPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-blue">
        Administration
      </h1>

      <p className="mt-2 text-gray-600">
        Manage HLD Operations system settings,
        employees, crews, and fleet.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Employees */}

        <Link
          href="/admin/employees"
          className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
        >
          <h2 className="text-lg font-semibold">
            Employee Management
          </h2>

          <p className="mt-2 text-gray-600">
            Manage employee information,
            status, and portal access.
          </p>
        </Link>

        {/* Crews */}

        <Link
          href="/admin/crews"
          className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
        >
          <h2 className="text-lg font-semibold">
            Crew Management
          </h2>

          <p className="mt-2 text-gray-600">
            Manage crews, members, leads,
            vehicles, and crew status.
          </p>
        </Link>

        {/* Fleet */}

        <Link
          href="/admin/fleet"
          className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
        >
          <h2 className="text-lg font-semibold">
            Fleet Management
          </h2>

          <p className="mt-2 text-gray-600">
            Manage vehicles, maintenance,
            status, and fleet records.
          </p>
        </Link>

        {/* Accounts */}

        <Link
          href="/admin/accounts"
          className="block rounded-xl border bg-white p-6 shadow-sm transition hover:border-brand-blue hover:shadow-md"
        >
          <h2 className="text-lg font-semibold">
            Portal Accounts
          </h2>

          <p className="mt-2 text-gray-600">
            Manage portal accounts, roles,
            and access.
          </p>
        </Link>
      </div>
    </div>
  );
}