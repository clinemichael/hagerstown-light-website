"use client";
import {useState} from "react";
import {ChangeEvent, FormEvent} from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    console.log("Form submitted!");
  };

  return (
    <form 
    onSubmit={handleSubmit}
    className="bg-brand-light p-8 rounded-xl shadow-lg space-y-6">

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Name:
        </label>

        <input
         type="text"
         name="name"
         value={formData.name}
         onChange={handleChange}
         className="w-full  bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Email:
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Phone:
        </label>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Subject:
        </label>

        <input
          type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          className="w-full bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-brand-dark mb-2">
          Message:
        </label>

        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-white rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
      </div>

      <button
        type="submit"
         className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
          Send Message
        </button>

    </form>
  );
}