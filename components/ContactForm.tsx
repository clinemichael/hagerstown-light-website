export default function ContactForm() {
  return (
    <form className="bg-brand-light p-8 rounded-xl shadow-lg space-y-6">

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Name:
        </label>

        <input
  type="text"
  className="w-full  bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
/>
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Email:
        </label>

        <input
          type="email"
          className="w-full bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Phone:
        </label>

        <input
          type="tel"
            className="w-full bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Subject:
        </label>

        <input
          type="text"
          className="w-full bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Message:
        </label>

        <textarea   className="w-full bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"/>
      </div>

      <button
  type="submit"
  className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
>
  Send Message
</button>

    </form>
  );
}