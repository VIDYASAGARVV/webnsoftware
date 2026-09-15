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
          const res = await fetch(`${apiUrl}/headings/${sectionKey}`);
          if (res.ok) {
            const result = await res.json();
            if (result.success && result.data) {
              setHeadingData({
                eyebrow: result.data.eyebrow || "",
                title: result.data.title || "",
                text: result.data.text || ""
              });
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

  if (loading) return <div className="section-heading animate-pulse"><div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div><div className="h-8 bg-gray-200 rounded w-3/4"></div></div>;

  return (
    <div className="section-heading">
      {headingData.eyebrow && <p className="eyebrow">{headingData.eyebrow}</p>}
      <h2>{headingData.title}</h2>
      {headingData.text && <p className="muted">{headingData.text}</p>}
    </div>
  );
}
