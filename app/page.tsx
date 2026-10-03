'use client';
import { useRef, useState } from 'react';
  
import { getHeroContent, getServices } from "../lib/content"; // dynamic methods
import { getWhatsAppUrl } from "../lib/whatsapp";
import ContactSection from "../components/ContactSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutSection from "../components/AboutSection";
import ServiceCard from "../components/ServiceCard";
// app/page.tsx (Part 1: Paste this right above your main Home function)

function ServiceCard({ service, index, getWhatsAppUrl }: { service: any, index: number, getWhatsAppUrl: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Desktop Hover Setup
  const handleMouseEnter = () => {
    if (service.videoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (service.videoUrl && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Mobile Click/Tap Setup
  const handleMobileToggle = () => {
    if (service.videoUrl && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[430px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.07] shadow-xl transition duration-500 hover:-translate-y-2 hover:border-blue-400/40 cursor-pointer"
    >
      {/* Media Rendering Section */}
      {service.videoUrl ? (
        <div className="absolute inset-0 h-full w-full" onClick={handleMobileToggle}>
          <video
            ref={videoRef}
            src={service.videoUrl}
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition duration-700"
          />
          {/* Mobile Play Button UI Overlay (Hidden once playing) */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 md:hidden pointer-events-none">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl">
                <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>
      ) : (
        <img
          src={service.imageUrl || '/images/placeholder.jpg'}
          alt={service.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
      )}

      {/* Shadows & Text Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 pointer-events-none" />

      <div className="absolute right-5 top-5 z-10 rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md uppercase tracking-wider">
        {service.category?.replace('-', ' ')}
      </div>

      <div className="absolute left-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-black/40 text-sm font-bold text-white backdrop-blur-md">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 pointer-events-auto">
        <h3 className="text-2xl font-bold text-white">{service.title}</h3>
        <p className="mt-3 line-clamp-3 leading-6 text-slate-200/80">{service.shortDescription}</p>

        <div className="mt-5">
          <a
            href={getWhatsAppUrl(service.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp about ${service.title}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition duration-300 hover:scale-110 hover:bg-green-400"
          >
            <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M20.52 3.48A11.86 11.86 0 0012.04 0C5.48 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.95L.05 24l6.3-1.65a11.88 11.88 0 005.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.43-8.42zM12.05 21.8a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.84 9.84 0 01-1.51-5.26C2.17 6.47 6.6 2.04 12.06 2.04a9.82 9.82 0 016.98 2.9 9.82 9.82 0 012.89 6.99c0 5.46-4.43 9.87-9.88 9.87zm5.41-7.39c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.09 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  // Backend API నుండి డేటాను పారలల్ (Parallel) గా ఫెచ్ చేస్తున్నాము
  const [heroData, services] = await Promise.all([
    getHeroContent(),
    getServices()
  ]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 text-white">

        {/* HERO SECTION */}
        <section id="home" className="relative bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.20),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.20),transparent_35%)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_35%)]" />

          <div className="relative mx-auto max-w-7xl px-6 pt-24 lg:px-8 lg:pt-24 pb-10">
            <div className="max-w-4xl">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-blue-300 backdrop-blur">
                Digital Solutions • AI • Marketing
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-4xl">
                We build
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  digital experiences
                </span>
                that grow businesses.
              </h1>

              {/* DYNAMIC HERO HEADING FROM BACKEND */}
              <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-300">
                {heroData?.heading}
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

        {/* SERVICES SECTION */}
   {/* SERVICES SECTION */}
<section id="services" className="relative overflow-hidden border-y border-white/10">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.20),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.20),transparent_35%)]" />

  <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        Our Expertise
      </span>
      <h2 className="mt-3 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
        Web, Marketing & AI Video Solutions
      </h2>
    </div>

    {/* app/page.tsx (Part 2: Replace your existing block with this) */}
<div className="mt-12 grid gap-6 md:grid-cols-3">
  {services && services.map((service, index) => (
    <ServiceCard 
      key={service._id || service.id || index} 
      service={service} 
      index={index}
      getWhatsAppUrl={getWhatsAppUrl}
    />
  ))}
</div>

  </div>
</section>


        {/* FINAL CTA */}
        <section className="mx-auto max-w-5xl px-6 py-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Let's work together
          </span>
          <h2 className="mt-4 text-4xl font-bold sm:text-6xl">
            Have an idea?
            <span className="block text-slate-400">
              Let&apos;s build it.
            </span>
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

        <AboutSection />
        {/* <ContactSection /> */}
      </main>
      <Footer />
    </>
  );
}
