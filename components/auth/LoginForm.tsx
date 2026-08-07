export default function LoginForm() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

      <h2 className="text-2xl font-bold text-brand-blue mb-6">
        Employee Login
      </h2>

      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            className="mt-1 w-full rounded-lg border px-4 py-3"
            placeholder="employee@hld.local"
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            className="mt-1 w-full rounded-lg border px-4 py-3"
            placeholder="Password"
          />
        </div>


        <button
          className="
          w-full
          bg-brand-blue
          text-white
          py-3
          rounded-lg
          font-semibold
          hover:bg-opacity-90
          transition
          "
        >
          Sign In
        </button>

      </div>

    </div>
  );
}