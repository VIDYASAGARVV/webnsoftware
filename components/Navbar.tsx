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

        <nav
          className="
            rounded-2xl
            border border-white/15
            bg-slate-900/85
            px-5 py-3
            shadow-[0_10px_40px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
          "
        >

          <div className="flex items-center justify-between">

            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-bold tracking-tight text-white"
            >
              Web
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-[#b6ff00] bg-clip-text text-transparent">
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
                  className="
                    text-sm
                    font-medium
                    text-slate-200
                    transition
                    duration-300
                    hover:text-[#b6ff00]
                  "
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
              className="
                hidden
                rounded-full
                bg-[#b6ff00]
                px-5 py-2.5
                text-sm
                font-bold
                text-slate-950
                shadow-lg
                shadow-[#b6ff00]/20
                transition
                duration-300
                hover:scale-105
                hover:bg-white
                md:block
              "
            >
              Let's Talk
            </a>


            {/* Mobile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="
                rounded-xl
                border border-white/15
                bg-white/5
                px-3 py-2
                text-white
                transition
                hover:bg-white/10
                md:hidden
              "
            >
              {open ? "✕" : "☰"}
            </button>

          </div>


          {/* Mobile Menu */}
          {open && (
            <div className="mt-4 border-t border-white/10 pt-4 md:hidden">

              <div className="flex flex-col gap-3">

                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="
                      rounded-xl
                      px-3 py-3
                      text-sm
                      font-medium
                      text-slate-200
                      transition
                      hover:bg-white/5
                      hover:text-[#b6ff00]
                    "
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
                  className="
                    mt-2
                    rounded-full
                    bg-[#b6ff00]
                    px-5 py-3
                    text-center
                    text-sm
                    font-bold
                    text-slate-950
                    transition
                    hover:bg-white
                  "
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