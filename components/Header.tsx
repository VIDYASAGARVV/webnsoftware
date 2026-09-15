"use client";

import { useState } from "react";
import { siteContent } from "../lib/content";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // మొబైల్ లింక్ క్లిక్ చేసినప్పుడు మెనూ క్లోజ్ అవ్వడానికి ఫంక్షన్
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="site-header relative z-50">
      <div className="container nav-wrap flex items-center justify-between py-4">
        {/* Brand Name Logo */}
        <a className="brand text-xl font-bold" href="#home">
          {siteContent.brand}
        </a>

        {/* 📱 Mobile Toggle Hamburger Button Component */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none z-50"
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            // ❌ Close Icon Layout (X shape using custom paths)
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // ☰ Hamburger Icon Layout (3 Lines shape)
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* 🖥️ Desktop Navigation Links View Layout */}
        <nav className="hidden md:flex items-center space-x-6" aria-label="Primary navigation">
          {siteContent.header.nav.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-")}`}
              className="hover:text-blue-600 transition"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* 📱 Mobile Overlay Navigation Menu Component Drawer */}
        <nav 
          className={`fixed inset-0 bg-white flex flex-col h-90 items-center justify-center space-y-4 py-2 text-lg font-medium transition-all duration-300 md:hidden ${
            isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
          }`}
          aria-label="Mobile navigation"
        >
          {siteContent.header.nav.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-")}`}
              onClick={handleLinkClick}
              className="text-gray-800 hover:text-blue-600 transition text-xl"
            >
              {item}
            </a>
          ))}
          <a 
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition" 
            href="#contact-us"
            onClick={handleLinkClick}
          >
            {siteContent.header.cta}
          </a>
        </nav>

        {/* Desktop CTA Button Container */}
        <a className="nav-cta hidden md:hide" href="#contact-us">
          {siteContent.header.cta}
        </a>
      </div>
    </header>
  );
}
