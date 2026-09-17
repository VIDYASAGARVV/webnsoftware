"use client";

import { useEffect, useState } from "react";

// హీరో హెడర్ డేటా స్ట్రక్చర్ టైప్ (mediaUrl యాడ్ చేసాం)
interface HeroHeaderData {
  sectionKey: string;
  eyebrow: string;
  title: string;
  text: string;
  mediaUrl?: string; // 🚀 డేటాబేస్ నుండి వచ్చే ఇమేజ్ URL కోసం
}

export default function HeroSection() {
  const [heroData, setHeroData] = useState<HeroHeaderData | null>(null);

  useEffect(() => {
    const fetchHeroHeading = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        const res = await fetch(`${apiUrl}/headings/hero`);
        if (res.ok) {
          const result = await res.json();
          
          if (result && result.success && Array.isArray(result.data)) {
            const match = result.data.find((item: any) => item.sectionKey === "hero");
            if (match) setHeroData(match);
          } 
          else if (result && result.success && result.data) {
            setHeroData(result.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch hero section heading:", error);
      }
    };

    fetchHeroHeading();
  }, []);

  // టైటిల్ లో చివరి పదాన్ని <span> తో హైలైట్ చేయడానికి హెల్పర్ ఫంక్షన్
  const renderTitle = (rawTitle: string) => {
    if (!rawTitle) return <>Build. Promote. <span>Grow.</span></>;
    const parts = rawTitle.split(".");
    if (parts.length >= 3) {
      return (
        <>
          {parts[0]}. {parts[1]}. <span>{parts[2]}</span>
        </>
      );
    }
    return rawTitle;
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        {/* ఎడమవైపు టెక్స్ట్ కంటెంట్ */}
        <div>
          <p className="eyebrow">
            {heroData?.eyebrow ? heroData.eyebrow : "WEBNSOFTWARE • DIGITAL STUDIO"}
          </p>
          <h1>
            {heroData ? renderTitle(heroData.title) : <>Build. Promote. <span>Grow.</span></>}
          </h1>
          <p className="hero-copy">
            {heroData?.text ? heroData.text : "A clean Next.js website with dynamic sections for your brand."}
          </p>
          <div className="hero-actions">
            <a className="button" href="#services">Explore Services</a>
            <a className="button ghost" href="#contact-us">Talk to Us</a>
          </div>
        </div>

        {/* కుడివైపు: 🚀 ఇమేజ్ టైప్ ప్రదర్శన (Image/Fallback Section) */}
        <div className="hero-wireframe" aria-hidden="true">
        {/* <div className="hero-image-container" style={{ position: "relative", width: "100%", height: "100%", minHeight: "350px" }}> */}
          {heroData?.mediaUrl ? (
            // డేటాబేస్ లో ఇమేజ్ లింక్ ఉంటే ఇది డిస్‌ప్లే అవుతుంది
            <img 
              src={heroData.mediaUrl} 
              alt={heroData.title || "Hero Image"} 
              style={{
                width: "100%",
                height: "auto",
                background: "cover",
                borderRadius: "12px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            />
          ) : (
            // ఒకవేళ డేటాబేస్ లో ఇమేజ్ లేకపోతే పాత స్టాటిక్ వైర్‌ఫ్రేమ్ బ్యాకప్‌గా ఉంటుంది
            <div className="hero-wireframe" aria-hidden="true">
              <div className="wire-line long" />
              <div className="wire-line medium" />
              <div className="wire-cards">
                <div /><div /><div />
              </div>
              <div className="wire-line short" />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
