"use client";

import { useState } from "react";
import { getWhatsAppUrl } from "../lib/whatsapp";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "AI Videos", href: "#ai-videos" },
    { name: "Reels", href: "#reels" },
    { name: "Marketing", href: "#marketing" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50">

      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">

        <nav className="rounded-2xl border border-white/10 bg-black/60 px-5 py-3 shadow-2xl backdrop-blur-xl">

          <div className="flex items-center justify-between">

            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-bold tracking-tight bg-light"
            >
              Web
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                N
              </span>
              Software
            </a>


            {/* Desktop Menu */}
            <div className="hidden items-center gap-7 md:flex">

              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {item.name}
                </a>
              ))}

            </div>


            {/* Desktop CTA */}
            <a
              href={getWhatsAppUrl(
                "Hi WebNSoftware, I would like to discuss a project."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-green-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-400 md:block"
            >
              Let's Talk
            </a>


            {/* Mobile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg border border-white/10 px-3 py-2 md:hidden"
            >
              {open ? "✕" : "☰"}
            </button>

          </div>


          {/* Mobile Menu */}
          {open && (
            <div className="mt-4 border-t border-white/10 pt-4 md:hidden">

              <div className="flex flex-col gap-4">

                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-slate-300 hover:text-white"
                  >
                    {item.name}
                  </a>
                ))}

                <a
                  href={getWhatsAppUrl(
                    "Hi WebNSoftware, I would like to discuss a project."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-green-500 px-5 py-3 text-center text-sm font-semibold"
                >
                  Let's Talk on WhatsApp
                </a>

              </div>

            </div>
          )}

        </nav>

      </div>

    </header>
  );
}