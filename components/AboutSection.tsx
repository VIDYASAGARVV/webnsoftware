// components/AboutSection.tsx
"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

interface AboutSectionProps {
  aboutData?: {
    eyebrow: string;
    title: string;
    description: string;
    points?: string[];
  } | null;
}

export default function AboutSection({ aboutData: propAboutData }: AboutSectionProps) {
  // Fallback Data if Database/Backend is down
  const [content, setContent] = useState({
    eyebrow: "About Us",
    title: "One digital partner for your next business idea.",
    description: "WebnSoftware brings web development, AI-powered video content and digital marketing into one flexible digital experience.",
    points: [
      "Business Website . e-Commerce . Custome Software", 
      "AI VIDEOS . REELS", 
      "Meta Ads . Strategic Targeting",
    ]
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    // If layout page passes data directly via SSR props
    if (propAboutData) {
      setContent({
        eyebrow: propAboutData.eyebrow || "About Us",
        title: propAboutData.title || "One digital partner for your next business idea.",
        description: propAboutData.description || "",
        points: Array.isArray(propAboutData.points) && propAboutData.points.length > 0 
          ? propAboutData.points 
          : content.points
      });
      return;
    }

    const fetchAboutData = async () => {
      try {
        const res = await fetch(`${apiUrl}/about`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setContent({
              eyebrow: data.eyebrow || "About Us",
              title: data.title || "We build modern software",
              description: data.description || "",
              points: Array.isArray(data.points) && data.points.length > 0 
                ? data.points 
                : content.points
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch custom about data array:", error);
      }
    };

    fetchAboutData();
  }, [apiUrl, propAboutData]);

  // Dynamic border logic based on index positions
  const getCardStyles = (index: number) => {
    const cycle = index % 3;
    if (cycle === 0) return { text: "text-[#b6ff00]", border: "hover:border-[#b6ff00]/30" };
    if (cycle === 1) return { text: "text-blue-400", border: "hover:border-blue-400/30" };
    return { text: "text-purple-400", border: "hover:border-purple-400/30" };
  };

  return (
    <section id="about" className="relative overflow-hidden bg-slate-950 px-6 py-12 text-white sm:py-12">
      {/* Background Decorative Layout Glows */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#b6ff00]/10 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Main Grid Container */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        
        {/* LEFT COMPONENT DETAILS */}
        <div>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} text={content.description} />
          
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#b6ff00]" />
            <span className="text-sm text-slate-300">Building digital experiences for modern businesses</span>
          </div>
        </div>

        {/* RIGHT DISPLAY PANEL (Loops up to 6 or more items) */}
        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-[#b6ff00]/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl sm:p-9">
            
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-full bg-[#b6ff00] px-4 py-2 text-xs font-bold tracking-wider text-black">
                WHY WEBNSOFTWARE
              </span>
              <span className="text-sm text-slate-500">
                01 — {String(content.points.length).padStart(2, '0')}
              </span>
            </div>

            {/* Dynamic Features List Grid Wrapper (Adds scroll if content exceeds) */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
              {content.points.map((pointText, index) => {
                const styles = getCardStyles(index);
                return (
                  <div 
                    key={index} 
                    className={`group flex items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-4 transition duration-300 ${styles.border} hover:bg-white/[0.05]`}
                  >
                    <strong className={`text-3xl font-bold ${styles.text}`}>
                      {String(index + 1).padStart(2, '0')}
                    </strong>
                    <div>
                      <p className="font-semibold text-white text-sm sm:text-base">{pointText}</p>
                      <p className="mt-0.5 text-xs text-slate-500">Verified core business expertise roadmap feature</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Status bar */}
            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
              <div className="h-px flex-1 bg-gradient-to-r from-[#b6ff00] to-transparent" />
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Digital • AI • Web</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
