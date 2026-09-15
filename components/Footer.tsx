"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [siteData, setSiteData] = useState<any>({ brand: "WebnSoftware", tagline: "Digital products & growth solutions" });

  useEffect(() => {
    async function loadFooterData() {
      try {
        const res = await fetch("/api/content");
        const result = await res.json();
        if (result.success && result.data) {
          setSiteData(result.data);
        }
      } catch (err) {
        console.error("Footer data load error:", err);
      }
    }
    loadFooterData();
  }, []);

  return (
    <footer className="footer" style={{ borderTop: "1px solid #303832", padding: "60px 0 30px", background: "var(--dark)" }}>
      <div className="container">
        
        {/* 🌟 టాప్ సెక్షన్: బ్రాండ్ వివరాలు మరియు లింక్స్ */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px", marginBottom: "5px", paddingBottom: "40px", borderBottom: "1px solid #1f2621" }}>
          
          {/* ఎడమ వైపు: బ్రాండ్ నేమ్ & ట్యాగ్‌లైన్ */}
          <div>
            <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#fff", letterSpacing: "-1px", margin: "0 0 12px 0" }}>
              {siteData.brand}
            </h3>
            <p style={{ color: "#aab2ad", fontSize: "14px", lineHeight: "1.6", maxWidth: "280px", margin: 0 }}>
              {siteData.tagline || "Digital products, AI videos & growth solutions."}
            </p>
          </div>

          {/* మధ్యలో: క్విక్ నావిగేషన్ లింక్స్ */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#7a827e", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 16px 0" }}>
              Navigation
            </h4>
            <div style={{ display: "grid", gap: "10px", fontSize: "14px" }}>
              {["Services", "AI Videos", "Digital Marketing", "About Us", "Contact Us"].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`} 
                  style={{ color: "#aab2ad", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#aab2ad"}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* కుడి వైపు: సోషల్ మీడియా లింక్స్ */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "800", color: "#7a827e", textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 16px 0" }}>
              Connect
            </h4>
            <div style={{ display: "flex", gap: "15px", fontSize: "14px" }}>
              {["Youtube", "Facebook", "Instagram"].map((platform) => (
                <a 
                  key={platform}
                  href="#" 
                  style={{ color: "#aab2ad", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#aab2ad"}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* 🌟 బాటమ్ సెక్షన్: కాపీరైట్ & బ్యాక్ టు టాప్ బటన్ */}
        <div className="footer-inner" style={{ paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#7a827e" }}>
          <span>© {new Date().getFullYear()} {siteData.brand}. All rights reserved.</span>
          
          <a 
            href="#ai-videos" /* మీ మెయిన్ సెక్షన్ ఐడి */
            style={{ 
              color: "#fff", 
              fontWeight: "700", 
              display: "flex", 
              alignItems: "center", 
              gap: "6px", 
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              background: "#171c18",
              padding: "10px 16px",
              borderRadius: "999px",
              border: "1px solid #303832"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#303832";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            Back to top ↑
          </a>
        </div>

      </div>
    </footer>
  );
}
