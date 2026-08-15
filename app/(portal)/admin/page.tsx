import Link from "next/link";

export default function AdministrationPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-blue">
        Administration
      </h2>

      <p className="mt-2 text-gray-600">
        Manage HLD Operations system settings and employees.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Employee Management */}

        <Link
          href="/admin/employees"
          className="
            block
            rounded-xl
            border
            bg-white
            p-6
            shadow-sm
            transition
            hover:border-brand-blue
            hover:shadow-md
          "
        >
          <h3 className="text-lg font-semibold text-brand-blue">
            Employee Management
          </h3>

          <p className="mt-2 text-gray-600">
            Manage HLD employee information and portal access.
          </p>
        </Link>

        {/* Portal Accounts */}

        <Link
          href="/admin/accounts"
          className="
            block
            rounded-xl
            border
            bg-white
            p-6
            shadow-sm
            transition
            hover:border-brand-blue
            hover:shadow-md
          "
        >
          <h3 className="text-lg font-semibold text-brand-blue">
            Portal Accounts
          </h3>

          <p className="mt-2 text-gray-600">
            Manage portal accounts, roles, and access.
          </p>
        </Link>

        {/* Fleet Management */}

        <Link
          href="/admin/fleet"
          className="
            block
            rounded-xl
            border
            bg-white
            p-6
            shadow-sm
            transition
            hover:border-brand-blue
            hover:shadow-md
          "
        >
          <h3 className="text-lg font-semibold text-brand-blue">
            Fleet Management
          </h3>

          <p className="mt-2 text-gray-600">
            Edit, retire, and manage HLD fleet vehicles.
          </p>
        </Link>
      </div>
    </div>
  );
}