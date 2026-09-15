"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

interface Service {
  _id: string;
  title: string;
  description: string;
  mediaUrl: string; 
  section: string;
}

export default function ServiceSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // 🚀 హెడ్డింగ్ కోసం ఉన్న పాత useEffect మరియు headerData స్టేట్ ని తీసేశాము!

  // సర్వీస్ కార్డ్స్ డేటా తెచ్చే useEffect
  useEffect(() => {
    const fetchServices = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        const res = await fetch(`${apiUrl}/content/services`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.data)) {
            const servicesOnly = data.data.filter(
              (item: Service) => item.section === "service"
            );
            setServices(servicesOnly);
          }
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section id="services" className="section">
      <div className="container">
        
        {/* 🚀 కేవలం sectionKey పంపితే చాలు, కాంపోనెంట్ దానంతట అదే డేటా తెచ్చుకుంటుంది */}
        <SectionHeading sectionKey="service" />

        {loading ? (
          <p className="text-center muted">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center muted">No services found in database.</p>
        ) : (
          <div className="grid services-grid">
            {services.map((service, index) => (
              <article className="card service-card" key={service._id}>
                <span className="number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-gray-900 mt-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <Link 
                  href={`${service.mediaUrl}`} 
                  target="_blank"             
                  rel="noopener noreferrer"   
                  className="cursor-pointer text-left no-underline"
                >  
                  <span className="text-link inline-block mt-4 text-blue-600 font-medium">
                    Discuss this service →
                  </span>              
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
