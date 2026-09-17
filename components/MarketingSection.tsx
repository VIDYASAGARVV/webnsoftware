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

  useEffect(() => {
    const fetchMarketingData = async () => {
      // ప్రొడక్షన్ లేదా లోకల్ యుఆర్ఎల్ బ్యాకప్ సురక్షితంగా సెట్ చేయబడింది
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        // const res = await fetch(`${apiUrl}/content/services`);
        const res = await fetch(`${apiUrl}/content/services`, {
      cache: "no-store", 
    });
        if (res.ok) {
          const data = await res.json();
          // console.log("Marketing:::", data);
          
          if (data && data.success && Array.isArray(data.data)) {
            // 🚀 SMART FILTER LAYER: ట్రిమ్ (.trim()) చేయడం వల్ల టెక్స్ట్ పక్కన స్పేస్ లు ఉన్నా క్లీన్ అయిపోతాయి
            const marketingOnly = data.data.filter(
              (item: MarketingService) => 
                item.section && item.section.trim().toLowerCase() === "marketing"
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
        
        {/* కేవలం sectionKey="marketing" పంపితే చాలు */}
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
                {/* 🚀 తెల్లటి గ్యాప్స్ (\n) ఉన్నా డిస్క్రిప్షన్ లైన్ బై లైన్ అందంగా కనిపించడానికి whiteSpace స్టైల్ వాడాము */}
                <p style={{ whiteSpace: "pre-line" }}>{service.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
