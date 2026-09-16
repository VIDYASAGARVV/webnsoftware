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