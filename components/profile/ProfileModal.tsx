"use client";

type ProfileModalProps = {
  employee: {
    name: string;
    title: string;
    employeeId: string;
    status: string;
    role: string;
    email: string;
  };
  onClose: () => void;
};

export default function ProfileModal({
  employee,
  onClose,
}: ProfileModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              My Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Employee account information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Employee */}
        <div className="mt-6 border-b pb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            {employee.name}
          </h3>

          <p className="text-gray-600">
            {employee.title}
          </p>
        </div>

        {/* Employee Information */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Employee Information
          </h3>

          <div className="mt-3 space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Employee ID
              </span>

              <span className="font-medium text-gray-900">
                {employee.employeeId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Status
              </span>

              <span className="font-medium text-gray-900">
                {employee.status}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Role
              </span>

              <span className="font-medium text-gray-900">
                {employee.role}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Email
              </span>

              <span className="font-medium text-gray-900 text-right break-all">
                {employee.email}
              </span>
            </div>

          </div>
        </div>

        {/* Account */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Account
          </h3>

          <button
            type="button"
            className="mt-3 w-full rounded-lg border px-4 py-3 text-left hover:bg-gray-50"
          >
            <p className="font-medium text-gray-900">
              Change Password
            </p>

            <p className="text-sm text-gray-500">
              Update your account password
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}