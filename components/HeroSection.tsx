// components/HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import { getWhatsAppUrl } from "../lib/whatsapp";

interface HeroSectionProps {
  heroData?: {
    heading: string;
  } | null;
}

export default function HeroSection({ heroData }: HeroSectionProps) {
  // 🚀 బ్యాకెండ్/డేటాబేస్ నుండి 'hero' కీ తో హెడ్డింగ్స్ వచ్చేంతవరకు చూపించాల్సిన ఫాల్‌బ్యాక్ డేటా
  const [headingContent, setHeadingContent] = useState({
    eyebrow: "Digital Solutions • AI • Marketing",
    title: "We build digital experiences that grow businesses.",
    text: heroData?.heading || "WebNSoftware helps businesses build modern websites, eCommerce platforms, custom software and powerful digital marketing solutions that turn ideas into real business growth."
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  // 🚀 బ్యాకెండ్ నుండి 'hero' కీ తో ఉన్న ఐటెమ్ ని వెతికి తెచ్చుకునే లాజిక్
  useEffect(() => {
    const fetchHeroHeading = async () => {
      try {
        const res = await fetch(`${apiUrl}/headings`);
        if (res.ok) {
          const result = await res.json();
          if (result.success && Array.isArray(result.data)) {
            // అడ్మిన్ ప్యానెల్ లో మీరు యాడ్ చేసిన 'hero' కీ ని వెతుకుతుంది
            const matched = result.data.find((h: any) => h.sectionKey === "hero");
            if (matched) {
              setHeadingContent({
                eyebrow: matched.eyebrow || "Digital Solutions • AI • Marketing",
                title: matched.title || "We build digital experiences that grow businesses.",
                // ఒకవేళ అడ్మిన్ ప్యానెల్ లో టెక్స్ట్ ఉంటే దాన్ని తీసుకుంటుంది, లేదంటే props నుండి వచ్చిన దాన్ని ఉంచుతుంది
                text: matched.text || heroData?.heading || headingContent.text
              });
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch dynamic hero heading configuration:", error);
      }
    };

    fetchHeroHeading();
  }, [apiUrl, heroData]);

  return (
    <section id="home" className="relative bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.20),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.20),transparent_35%)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_35%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-24 lg:px-8 lg:pt-24 pb-10">
        <div className="max-w-4xl">
          
          {/* 1. DYNAMIC EYEBROW TAG */}
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-1  sm:text  text-blue-300 backdrop-blur uppercase tracking-wider">
            {headingContent.eyebrow}
          </span>

          {/* 2. DYNAMIC MAIN TITLE WITH PRESERVED GRADIENT */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-4xl lg:text-3xl leading-tight text-white">
            {/* ఒకవేళ టైటిల్ లో 'digital experiences' ఉంటే దానికి అందమైన గ్రేడియంట్ అప్లై అయ్యేలా మీ ఒరిజినల్ స్టైల్స్ ని అలాగేPreserve చేసాను */}
            {headingContent.title.includes("digital experiences") ? (
              <>
                We build{" "}
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  digital experiences
                </span>
                {headingContent.title.replace("We build digital experiences", "")}
              </>
            ) : (
              headingContent.title
            )}
          </h1>

          {/* 3. DYNAMIC DESCRIPTION / TEXT CONTENT */}
          <p className="mt-6 max-w-3xl sm:text leading-8 text-slate-300">
            {headingContent.text}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={getWhatsAppUrl("Hi WebNSoftware, I want to discuss my project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-400"
            >
              Start on WhatsApp
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/10"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
