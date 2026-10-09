// components/ServiceSection.tsx
import ServiceCard from "./ServiceCard";
import SectionHeading from "./SectionHeading";

interface ServiceItem {
  _id?: string;
  id?: string;
  title: string;
  shortDescription: string;
  imageUrl?: string;
  videoUrl?: string;
  whatsappMessage: string;
  category: string;
}

interface ServiceSectionProps {
  services: ServiceItem[];
}

export default function ServiceSection({ services }: ServiceSectionProps) {
  return (
    <section id="service" className="relative bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.20),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.20),transparent_35%)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.18),transparent_35%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 lg:px-8">

        {/* 🚀 'services' కీ ఆధారంగా అడ్మిన్ కాన్ఫిగరేషన్స్ ఆటోమేటిక్‌గా లోడ్ అవుతాయి */}
        <SectionHeading sectionKey="services" />

        {/* Replace your existing <div className="mt-12 grid..."> block with this flex implementation */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 mb-6">
          {services && services.map((service, index) => (
            <div
              key={service._id || service.id || index}
              className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] max-w-[380px]"
            >
              <ServiceCard
                service={service}
                index={index}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
