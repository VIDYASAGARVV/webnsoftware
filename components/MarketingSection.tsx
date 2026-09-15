"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

// కార్డ్స్ డేటా టైప్
interface MarketingService {
  _id: string;
  title: string;
  description: string;
  mediaUrl: string;
  section: string;
  points?: string[];
}

export default function MarketingSection() {
  const [marketingItems, setMarketingItems] = useState<MarketingService[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. మార్కెటింగ్ సర్వీసెస్ కార్డ్స్ డేటా తెచ్చే useEffect మాత్రమే ఇక్కడ ఉంటుంది
  useEffect(() => {
    const fetchMarketingData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        const res = await fetch(`${apiUrl}/content/services`);
        if (res.ok) {
          const data = await res.json();
          
          if (data && data.success && Array.isArray(data.data)) {
            // 🚀 FILTER LAYER: 'marketing' సెక్షన్ కార్డ్స్ ని మాత్రమే ఫిల్టర్ చేస్తుంది
            const marketingOnly = data.data.filter(
              (item: MarketingService) => item.section === "marketing"
            );
            setMarketingItems(marketingOnly);
          }
        }
      } catch (error) {
        console.error("Failed to fetch marketing items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketingData();
  }, []);

  return (
    <section id="digital-marketing" className="section">
      <div className="container">
        
        {/* 2. 🚀 కేవలం sectionKey="marketing" పంపితే చాలు, కాంపోనెంట్ దానంతట అదే API (/headings/marketing) నుండి డేటా తెచ్చుకుంటుంది */}
        <SectionHeading sectionKey="marketing" />

        {loading ? (
          <p className="text-center muted">Loading marketing campaigns...</p>
        ) : marketingItems.length === 0 ? (
          <p className="text-center muted">No digital marketing cards configured in database.</p>
        ) : (
          <div className="grid marketing-grid">
            {marketingItems.map((service, index) => (
              <Link key={service._id || index} href={`/services/${service._id}`} className="card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
