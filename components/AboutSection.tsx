// components/AboutSection.tsx
import SectionHeading from "./SectionHeading";

interface AboutSectionProps {
  aboutData: {
    eyebrow: string;
    title: string;
    description: string;
  } | null;
}

export default function AboutSection({ aboutData }: AboutSectionProps) {
  // ఒకవేళ బ్యాకెండ్ డౌన్ అయితే చూపించాల్సిన ఫాల్‌బ్యాక్ డేటా
  const content = aboutData || {
    eyebrow: "About Us",
    title: "One digital partner for your next business idea.",
    description: "WebnSoftware brings web development, AI-powered video content and digital marketing into one flexible digital experience. This starter site is structured around dynamic content so sections can be changed without rewriting the page layout."
  };

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
            eyebrow={content.eyebrow}
            title={content.title}
            text={content.description}
          />

          {/* Small CTA */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#b6ff00]" />
            <span className="text-sm text-slate-300">
              Building digital experiences for modern businesses
            </span>
          </div>
        </div>

        {/* RIGHT PANEL (Features UI remain preserved) */}
        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-[#b6ff00]/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-xl sm:p-9">
            
            <div className="mb-8 flex items-center justify-between">
              <span className="rounded-full bg-[#b6ff00] px-4 py-2 text-xs font-bold tracking-wider text-black">
                WHY WEBNSOFTWARE
              </span>
              <span className="text-sm text-slate-500">01 — 03</span>
            </div>

            {/* Features Info Cards */}
            <div className="space-y-2">
              <div className="group flex items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-5 transition duration-300 hover:border-[#b6ff00]/30 hover:bg-white/[0.05]">
                <strong className="text-3xl font-bold text-[#b6ff00]">01</strong>
                <div>
                  <p className="font-semibold">Simple, modular sections</p>
                  <p className="mt-1 text-sm text-slate-500">Clean and flexible website structure</p>
                </div>
              </div>

              <div className="group flex items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-5 transition duration-300 hover:border-blue-400/30 hover:bg-white/[0.05]">
                <strong className="text-3xl font-bold text-blue-400">02</strong>
                <div>
                  <p className="font-semibold">Next.js App Router architecture</p>
                  <p className="mt-1 text-sm text-slate-500">Modern frontend architecture</p>
                </div>
              </div>

              <div className="group flex items-center gap-5 rounded-2xl border border-white/5 bg-black/20 p-5 transition duration-300 hover:border-purple-400/30 hover:bg-white/[0.05]">
                <strong className="text-3xl font-bold text-purple-400">03</strong>
                <div>
                  <p className="font-semibold">Content separated from UI</p>
                  <p className="mt-1 text-sm text-slate-500">Easy to connect with backend APIs</p>
                </div>
              </div>
            </div>

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
