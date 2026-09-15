// import { siteContent } from "../lib/content";
// import SectionHeading from "./SectionHeading";

// export default function AboutSection() {
//   return (
//     <section id="about-us" className="section about-section">
//       <div className="container about-grid">
//         <SectionHeading
//           eyebrow={siteContent.about.eyebrow}
//           title={siteContent.about.title}
//           text={siteContent.about.description}
//         />
//         <div className="about-panel">
//           <span className="mini-label">WHY WEBNSOFTWARE</span>
//           <div className="stat-row"><strong>01</strong><span>Simple, modular sections</span></div>
//           <div className="stat-row"><strong>02</strong><span>Next.js App Router architecture</span></div>
//           <div className="stat-row"><strong>03</strong><span>Content separated from UI</span></div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

interface AboutData {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}

export default function AboutSection() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        const res = await fetch(`${apiUrl}/about`);
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            setAbout(result.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch about content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <p className="text-center muted">Loading About Us...</p>;
  if (!about) return null;

  return (
    <section id="about-us" className="section about-section">
      <div className="container about-grid">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          text={about.description}
        />
        <div className="about-panel">
          <span className="mini-label">WHY WEBNSOFTWARE</span>
          
          {about.points && about.points.map((point, index) => (
            <div className="stat-row" key={index}>
              <strong>0{index + 1}</strong>
              <span>{point}</span>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
