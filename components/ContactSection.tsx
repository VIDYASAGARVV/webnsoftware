"use client";

import { useState } from "react";
import { companyContent } from "../lib/content";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setStatus({
      type: "",
      message: "",
    });

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: "Enquiry sent successfully! 🎉",
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Cannot connect to server. Please check if backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-us"
      className="relative overflow-hidden bg-[#b6ff00] px-6 py-24 text-slate-950"
    >
      {/* Background Decorative Glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/30 blur-3xl" />

      <div className="absolute -bottom-40 -right-20 h-[450px] w-[450px] rounded-full bg-lime-300/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">

        {/* LEFT CONTENT */}
        <div>

          <span className="inline-flex rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm font-semibold backdrop-blur">
            CONTACT US
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            {companyContent.contact.title}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-800">
            {companyContent.contact.description}
          </p>


          {/* Contact Information */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                ✉
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Email
                </p>

                <p className="font-semibold">
                  hello@webnsoftware.com
                </p>
              </div>
            </div>


            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                ☎
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Phone
                </p>

                <p className="font-semibold">
                  +91 90000 00000
                </p>
              </div>
            </div>

          </div>

        </div>


        {/* FORM */}
        <div className="rounded-[2rem] border border-black/10 bg-black p-6 shadow-2xl sm:p-8">

          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Name
              </label>

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-400 transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
            </div>


            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Email
              </label>

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-400 transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
            </div>


            {/* Requirement */}
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Requirement
              </label>

              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-400 transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
              />
            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#b6ff00] px-6 py-4 font-bold text-black transition duration-300 hover:bg-white hover:shadow-lg hover:shadow-lime-400/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Enquiry →"}
            </button>


            {/* Status */}
            {status.message && (
              <div
                className={`rounded-xl px-4 py-3 text-center text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {status.message}
              </div>
            )}

          </form>

        </div>

      </div>
    </section>
  );
}