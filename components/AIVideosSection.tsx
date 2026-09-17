"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

// కంటెంట్ టేబుల్ నుండి వచ్చే వీడియో కార్డ్స్ డేటా టైప్
interface AIVideoService {
  _id: string;
  title: string;
  description: string;
  mediaUrl: string; // కంటెంట్ టేబుల్ నుండి వచ్చే అసలైన యూట్యూబ్ లింక్
  section: string;
}

export default function AIVideosSection() {
  const [videoItems, setVideoItems] = useState<AIVideoService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        // cache: "no-store" యాడ్ చేయడం వల్ల పాత క్యాష్ క్లియర్ అయి లైవ్ కంటెంట్ వస్తుంది
        const res = await fetch(`${apiUrl}/content/services`, {
          cache: "no-store"
        });
        if (res.ok) {
          const data = await res.json();
          
          if (data && data.success && Array.isArray(data.data)) {
            // content టేబుల్ నుండి కేవలం 'ai-videos' సెక్షన్ రికార్డులను ఫిల్టర్ చేస్తున్నాము
            const aiVideosOnly = data.data.filter(
              (item: AIVideoService) => item.section && item.section.trim().toLowerCase() === "ai-videos"
            );
            setVideoItems(aiVideosOnly);
          }
        }
      } catch (error) {
        console.error("Failed to fetch AI video items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, []);
  return (
    <section id="ai-videos" className="section dark-section">
      <div className="container">
        
        {/* 🚀 ఇది మీ హెడర్ ని (మీరు పంపిన ఆ JSON టెక్స్ట్ ని) డేటాబేస్ నుండి తెచ్చి డిస్‌ప్లే చేస్తుంది */}
        <SectionHeading sectionKey="ai-videos" />
        
        {loading ? (
          <p className="text-center muted">Loading AI videos...</p>
        ) : videoItems.length === 0 ? (
          <p className="text-center muted">No AI video cards configured in database.</p>
        ) : (
          <div className="grid video-grid">
            {videoItems.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ప్రతి వీడియో కార్డ్ కోసం విడిగా చిన్న కాంపోనెంట్
function VideoCard({ video }: { video: AIVideoService }) {

  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      let videoId = "";

      // YouTube Shorts
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        videoId = parsedUrl.pathname.split("/shorts/")[1]?.split("/")[0];
      }

      // YouTube Watch URL
      else if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v") || "";
      }

      // youtu.be URL
      else if (parsedUrl.hostname === "youtu.be") {
        videoId = parsedUrl.pathname.split("/")[1]?.split("/")[0];
      }

      // YouTube embed URL already
      else if (parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/embed/")[1]?.split("/")[0];
      }

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

    } catch (error) {
      console.error("Invalid YouTube URL:", error);
    }

    return "";
  };

  const embedUrl = getEmbedUrl(video.mediaUrl);

  const isYouTube =
    video.mediaUrl?.includes("youtube.com") ||
    video.mediaUrl?.includes("youtu.be");

  return (
    <article className="video-card">

      <div
        className="video-preview"
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          aspectRatio: "9 / 16",
          maxHeight: "400px",
          minHeight: "250px",
          background: "#000",
          borderRadius: "8px",
        }}
      >

        {video.mediaUrl && (
          isYouTube ? (
            <iframe
              src={embedUrl}
              title={video.title}
              frameBorder="0"
              loading="lazy"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
                web-share
              "
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "8px",
              }}
            />
          ) : (
            <video
              controls
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source
                src={video.mediaUrl}
                type="video/mp4"
              />

              Your browser does not support the video tag.
            </video>
          )
        )}

      </div>

      <div className="video-body">
        <h3 className="mt-2 text-lg font-semibold">
          {video.title}
        </h3>

        <p className="text-sm text-gray-400">
          {video.description}
        </p>
      </div>

    </article>
  );
}