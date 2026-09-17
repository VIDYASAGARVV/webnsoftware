// import Header from "../components/Header";
// import HeroSection from "../components/HeroSection";

// import ServiceSection from "../components/ServiceSection";
// import AIVideosSection from "../components/AIVideosSection";
// import MarketingSection from "../components/MarketingSection";
// import AboutSection from "../components/AboutSection";
// import ContactSection from "../components/ContactSection";
// import Footer from "../components/Footer";
// // import { siteContent } from "../lib/content";

// export default function Home() {
//   return (
//     <>
//       <Header />
//       <main>
   
//   <HeroSection/>
//         <ServiceSection />
//         <AIVideosSection />
//         <MarketingSection />
//         <AboutSection />
//         <ContactSection />
//       </main>
//       <Footer />
//     </>
//   );
// }

import { companyContent } from "../lib/content";
import { getWhatsAppUrl } from "../lib/whatsapp";
import ContactSection from "../components/ContactSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import AboutSection from "../components/AboutSection";
export default function Home() {
  return (
    <>
      <Navbar />
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
<section id="home" className="relative bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.20),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.20),transparent_35%)] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

          <div className="max-w-4xl">

            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-blue-300 backdrop-blur">
              Digital Solutions • AI • Marketing
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              We build
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                digital experiences
              </span>
              that grow businesses.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {companyContent.heading}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <a
                href={getWhatsAppUrl(
                  "Hi WebNSoftware, I want to discuss my project."
                )}
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


      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className=" mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            What we build
          </span>

          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            Digital products for modern businesses.
          </h2>
        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-3">

          {companyContent.services.map((service) => (

            <div
              key={service.id}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-blue-400/40 hover:bg-white/[0.07]"
            >

              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                0{service.id}
              </div>

              <h3 className="text-2xl font-semibold">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {service.shortDescription}
              </p>

              <a
                href={getWhatsAppUrl(service.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center rounded-full bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-400 transition hover:bg-green-500 hover:text-white"
              >
                WhatsApp Us →
              </a>

            </div>

          ))}

        </div>

      </section>


      {/* AI VIDEOS */}
   {/* AI VIDEOS */}
<section   id="ai-videos" className="relative overflow-hidden border-y border-white/10">

  {/* Background Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.20),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.20),transparent_35%)]" />

  <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">

    {/* Heading */}
    <div className="mx-auto max-w-3xl text-center">

      <span className="inline-flex rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm font-medium text-purple-300">
        ✦ AI CONTENT STUDIO
      </span>

      <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
        AI videos that make
        <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          your brand unforgettable.
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
        Create scroll-stopping AI videos for your business, products,
        social media and advertising campaigns.
      </p>

    </div>


    {/* Video Cards */}
    <div className="mt-16 grid gap-8 md:grid-cols-2">

      {companyContent.aiVideos.map((item) => (

        <div
          key={item.id}
          className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-purple-400/40"
        >

          {/* Video */}
          <div className="relative aspect-video overflow-hidden">

            <video
              src={item.video}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* AI Badge */}
            <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold backdrop-blur-md">
              ✦ AI POWERED
            </div>

            {/* Play Indicator */}
            <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
              ▶
            </div>

          </div>


          {/* Content */}
          <div className="p-7">

            <h3 className="text-2xl font-semibold">
              {item.title}
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              {item.shortDescription}
            </p>

            <a
              href={getWhatsAppUrl(item.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-400"
            >
              WhatsApp Us
              <span>→</span>
            </a>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>

      {/* REELS */}
    {/* REELS */}
<section id="reels" className="relative overflow-hidden bg-black">

  {/* Background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(236,72,153,0.16),transparent_40%)]" />

  <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">

    {/* Heading */}
    <div className="mx-auto max-w-3xl text-center">

      <span className="inline-flex rounded-full border border-pink-400/20 bg-pink-400/10 px-4 py-2 text-sm font-medium text-pink-300">
         REELS STUDIO
      </span>

      <h2 className="mt-6 text-4xl font-bold sm:text-6xl">
        Shoot.
        <span className="text-pink-400"> Create.</span>
        <span className="text-blue-400"> Deliver.</span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
        Professional iPhone reels for brands, businesses and creators —
        produced quickly and delivered ready to post.
      </p>

    </div>


    {/* Reels */}
    <div className="mt-16 grid justify-items-center gap-10 sm:grid-cols-2">

      {companyContent.reels.map((item) => (

        <div
          key={item.id}
          className="group w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl transition duration-500 hover:-translate-y-2 hover:border-pink-400/40"
        >

          {/* Vertical Video */}
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem]">

            <video
              src={item.video}
              autoPlay
              muted
              loop
              playsInline
              className="h-400 w-full object-cover transition duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />


            {/* Top Badge */}
            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs backdrop-blur-md">
              📱 iPHONE REELS
            </div>


            {/* Content inside video */}
            <div className="absolute bottom-5 left-5 right-5">

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.shortDescription}
              </p>

              <a
                href={getWhatsAppUrl(item.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-400"
              >
                Book Now →
              </a>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>

      {/* DIGITAL MARKETING */}
      <section  id="marketing" className="border-t border-white/5">

        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="max-w-2xl">

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Growth
            </span>

            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              Digital marketing that connects with customers.
            </h2>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {companyContent.digitalMarketing.map((item) => (

              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
              >

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {item.shortDescription}
                </p>

                <a
                  href={getWhatsAppUrl(item.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex rounded-full bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-400 hover:bg-green-500 hover:text-white"
                >
                  Get Details →
                </a>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">

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
          href={getWhatsAppUrl(
            "Hi WebNSoftware, I would like to discuss a new project."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex rounded-full bg-green-500 px-8 py-4 font-semibold text-white transition hover:bg-green-400"
        >
          Talk to us on WhatsApp
        </a>

      </section>
   <AboutSection/>
      <ContactSection />

    </main>
     <Footer />

  <WhatsAppButton />
  </>
  );
}