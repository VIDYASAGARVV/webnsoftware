"use client";

import { useEffect, useState } from "react";

type Props = {
  sectionKey?: string; // 🚀 బ్యాకెండ్ నుండి తెచ్చుకోవడానికి కీ (Optional)
  eyebrow?: string;
  title?: string;      // Optional చేసాం ఎందుకంటే బ్యాకెండ్ నుండి రావచ్చు
  text?: string;
};

export default function SectionHeading({ sectionKey, eyebrow: propEyebrow, title: propTitle, text: propText }: Props) {
  const [headingData, setHeadingData] = useState({
    eyebrow: propEyebrow || "",
    title: propTitle || "",
    text: propText || ""
  });
  const [loading, setLoading] = useState(!!sectionKey); // sectionKey ఉంటేనే లోడింగ్ ఆన్ అవుతుంది

  useEffect(() => {
    // ఒకవేళ sectionKey పంపితే బ్యాకెండ్ API నుండి డేటా తెచ్చుకుంటుంది
    if (sectionKey) {
      const fetchHeading = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        try {
          const res = await fetch(`${apiUrl}/headings`); // మీ అడ్మిన్ పేజీలో వాడినట్లుగా పూర్తి అర్రేను తెచ్చుకుంటుంది
          if (res.ok) {
            const result = await res.json();
            
            // బ్యాకెండ్ నుండి వచ్చే రెస్పాన్స్ (result.success మరియు result.data) వెరిఫికేషన్
            if (result.success && Array.isArray(result.data)) {
              // మీ sectionKey (e.g., 'services' లేదా 'about-us') తో మ్యాచ్ అయ్యే రికార్డును వెతుకుతుంది
              const matchedHeading = result.data.find((h: { sectionKey: string; status: string; }) => h.sectionKey === sectionKey && h.status === 'active');
              
              if (matchedHeading) {
                setHeadingData({
                  eyebrow: matchedHeading.eyebrow || "",
                  title: matchedHeading.title || "",
                  text: matchedHeading.text || "" // మీ మోడల్ లో ఫీల్డ్ పేరు 'text'
                });
              }
            }
          }
        } catch (error) {
          console.error(`Failed to fetch heading for ${sectionKey}:`, error);
        } finally {
          setLoading(false);
        }
      };

      fetchHeading();
    }
  }, [sectionKey]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl text-center animate-pulse">
        <div className="h-4 bg-slate-800 rounded mx-auto w-1/4 mb-3"></div>
        <div className="h-10 bg-slate-800 rounded mx-auto w-3/4"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl text-center mb-10">
      {/* 1. EYEBROW TAG */}
      {headingData.eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 block mb-3">
          {headingData.eyebrow}
        </span>
      )}
      
      {/* 2. MAIN GRADIENT TITLE */}
      <h2 className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
        {headingData.title || "Digital products for modern businesses."}
      </h2>
      
      {/* 3. SUBTEXT DESCRIPTION */}
      {headingData.text && (
        <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          {headingData.text}
        </p>
      )}
    </div>
  );
}
