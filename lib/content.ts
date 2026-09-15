export type Service = {
  title: string;
  description: string;
  icon: string;
};

export type Video = {
  title: string;
  description: string;
  duration: string;
  category: string;
  videoUrl?: string;
};

export type MarketingService = {
  title: string;
  description: string;
  points: string[];
};

export const siteContent = {
  brand: "WebnSoftware",
  tagline: "Digital products, AI videos & growth solutions",
  header: {
    nav: ["Home", "Services", "AI Videos", "Digital Marketing", "About Us", "Contact Us"],
    cta: "Get Started"
  },
  services: [
    {
      title: "Web Development",
      description: "Fast, responsive and scalable websites built for modern businesses.",
      icon: "01"
    },
    {
      title: "E-commerce",
      description: "Conversion-focused online stores with simple product and order management.",
      icon: "02"
    },
    {
      title: "Business Solutions",
      description: "Custom digital solutions that simplify daily business workflows.",
      icon: "03"
    },
    {
      title: "UI / UX Design",
      description: "Clean interfaces and user journeys designed around your customers.",
      icon: "04"
    }
  ] satisfies Service[],
  aiVideos: [
    {
      title: "AI Product Promo",
      description: "Short-form product video concept generated for social media campaigns.",
      duration: "00:30",
      category: "Product",  
      videoUrl: "/videos/promo.mp4",
    },
    {
      title: "AI Business Ad",
      description: "A cinematic business advertisement concept for lead generation.",
      duration: "00:45",
      category: "Business",
      videoUrl: "/videos/business.mp4",
    },
    {
      title: "AI Explainer",
      description: "An easy-to-understand explainer video for a digital service.",
      duration: "01:00",
      category: "Explainer",
      videoUrl: "/videos/promo.mp4",
    }
  ] satisfies Video[],
  marketing: [
    {
      title: "SEO & Content",
      description: "Build long-term organic visibility with useful, search-focused content.",
      points: ["Keyword strategy", "On-page SEO", "Content planning"]
    },
    {
      title: "Social Media",
      description: "Consistent creative campaigns that turn attention into conversations.",
      points: ["Content calendar", "Creative posts", "Performance tracking"]
    },
    {
      title: "Paid Advertising",
      description: "Targeted campaigns designed around leads, sales and measurable growth.",
      points: ["Campaign setup", "Audience targeting", "Conversion tracking"]
    }
  ] satisfies MarketingService[],
  about: {
    eyebrow: "About Us",
    title: "One digital partner for your next business idea.",
    description:
      "WebnSoftware brings web development, AI-powered video content and digital marketing into one flexible digital experience. This starter site is structured around dynamic content so sections can be changed without rewriting the page layout."
  },
  contact: {
    title: "Let's build something useful.",
    description: "Tell us what you are planning and we'll turn the requirement into a clear digital roadmap."
  }
};