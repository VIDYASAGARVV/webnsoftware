import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

import ServiceSection from "../components/ServiceSection";
import AIVideosSection from "../components/AIVideosSection";
import MarketingSection from "../components/MarketingSection";
import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
// import { siteContent } from "../lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* <section id="home" className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">WEBNSOFTWARE • DIGITAL STUDIO</p>
              <h1>Build. Promote. <span>Grow.</span></h1>
              <p className="hero-copy">{siteContent.tagline}. A clean Next.js website with dynamic sections for your brand.</p>
              <div className="hero-actions">
                <a className="button" href="#services">Explore Services</a>
                <a className="button ghost" href="#contact-us">Talk to Us</a>
              </div>
            </div>
            <div className="hero-wireframe" aria-hidden="true">
              <div className="wire-line long" />
              <div className="wire-line medium" />
              <div className="wire-cards">
                <div /><div /><div />
              </div>
              <div className="wire-line short" />
            </div>
          </div>
        </section> */}
  <HeroSection/>
        <ServiceSection />
        <AIVideosSection />
        <MarketingSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}