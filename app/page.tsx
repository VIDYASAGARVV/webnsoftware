// app/page.tsx
import { getHeroContent, getServices, getAboutContent } from "../lib/content";
import { getWhatsAppUrl } from "../lib/whatsapp";
import ContactSection from "../components/ContactSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutSection from "../components/AboutSection";
import ServiceSection from "../components/ServiceSection";

export default async function Home() {
  // Backend API ల నుండి డేటాను పారలల్ (Parallel) గా Fetch చేస్తున్నాము
  const [heroData, services, aboutData] = await Promise.all([
    getHeroContent(),
    getServices(),
    getAboutContent()
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-white">

        {/* 1. MODULAR HERO SECTION */}
        {/* <HeroSection heroData={heroData} /> */}

        {/* 2. MODULAR SERVICE SECTION */}
        <ServiceSection services={services} />

        {/* FINAL CTA SECTION */}
        <section className="mx-auto max-w-5xl px-6 py-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Let's work together
          </span>
          <h2 className="mt-4 text-4xl font-bold sm:text-6xl">
            Have an idea?
            <span className="block text-slate-400">Let&apos;s build it.</span>
          </h2>
          <a
            href={getWhatsAppUrl("Hi WebNSoftware, I would like to discuss a new project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-green-500 px-8 py-4 font-semibold text-white transition hover:bg-green-400"
          >
            Talk to us on WhatsApp
          </a>
        </section>

        {/* 3. DYNAMIC ABOUT SECTION */}
        <AboutSection aboutData={aboutData} />
        
        {/* 4. DYNAMIC CONTACT SECTION */}
        <ContactSection />
        
      </main>
      <Footer />
    </>
  );
}
