import { companyContent } from "../lib/content";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden bg-slate-950 px-6 py-24 text-white sm:py-28"
    >

      {/* Background Glow */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#b6ff00]/10 blur-3xl" />

      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />


      {/* Main Container */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">

        {/* LEFT CONTENT */}
        <div>

          <SectionHeading
            eyebrow={companyContent.about.eyebrow}
            title={companyContent.about.title}
            text={companyContent.about.description}
          />

          {/* Small CTA */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl">

            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#b6ff00]" />

            <span className="text-sm text-slate-300">
              Building digital experiences for modern businesses
            </span>

          </div>

        </div>


        {/* RIGHT PANEL */}
        <div className="relative">

          {/* Glow behind card */}
          <div className="absolute inset-0 rounded-[2rem] bg-[#b6ff00]/10 blur-2xl" />


          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-xl sm:p-9">

            {/* Top */}
            <div className="mb-8 flex items-center justify-between">

              <span className="rounded-full bg-[#b6ff00] px-4 py-2 text-xs font-bold tracking-wider text-black">
                WHY WEBNSOFTWARE
              </span>

              <span className="text-sm text-slate-500">
                01 — 03
              </span>

            </div>


            {/* Stats */}
            <div className="space-y-2">

              {/* Item 01 */}
              <div className="group flex items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-5 transition duration-300 hover:border-[#b6ff00]/30 hover:bg-white/[0.05]">

                <strong className="text-3xl font-bold text-[#b6ff00]">
                  01
                </strong>

                <div>
                  <p className="font-semibold">
                    Simple, modular sections
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Clean and flexible website structure
                  </p>
                </div>

              </div>


              {/* Item 02 */}
              <div className="group flex items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-5 transition duration-300 hover:border-blue-400/30 hover:bg-white/[0.05]">

                <strong className="text-3xl font-bold text-blue-400">
                  02
                </strong>

                <div>
                  <p className="font-semibold">
                    Next.js App Router architecture
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Modern frontend architecture
                  </p>
                </div>

              </div>


              {/* Item 03 */}
              <div className="group flex items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-5 transition duration-300 hover:border-purple-400/30 hover:bg-white/[0.05]">

                <strong className="text-3xl font-bold text-purple-400">
                  03
                </strong>

                <div>
                  <p className="font-semibold">
                    Content separated from UI
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Easy to connect with backend APIs
                  </p>
                </div>

              </div>

            </div>


            {/* Bottom line */}
            <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">

              <div className="h-px flex-1 bg-gradient-to-r from-[#b6ff00] to-transparent" />

              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Digital • AI • Web
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import SectionHeading from "./SectionHeading";

// interface AboutData {
//   eyebrow: string;
//   title: string;
//   description: string;
//   points: string[];
// }

// export default function AboutSection() {
//   const [about, setAbout] = useState<AboutData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAboutData = async () => {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
//       try {
//         const res = await fetch(`${apiUrl}/about`);
//         if (res.ok) {
//           const result = await res.json();
//           if (result.success && result.data) {
//             setAbout(result.data);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch about content:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAboutData();
//   }, []);

//   if (loading) return <p className="text-center muted">Loading About Us...</p>;
//   if (!about) return null;

//   return (
//     <section id="about-us" className="section about-section">
//       <div className="container about-grid">
//         <SectionHeading
//           eyebrow={about.eyebrow}
//           title={about.title}
//           text={about.description}
//         />
//         <div className="about-panel">
//           <span className="mini-label">WHY WEBNSOFTWARE</span>
          
//           {about.points && about.points.map((point, index) => (
//             <div className="stat-row" key={index}>
//               <strong>0{index + 1}</strong>
//               <span>{point}</span>
//             </div>
//           ))}
          
//         </div>
//       </div>
//     </section>
//   );
// }
