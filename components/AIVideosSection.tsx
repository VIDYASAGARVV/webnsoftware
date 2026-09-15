"use client";

import { useEffect, useState } from "react";
import SectionHeading from "./SectionHeading";

// డేటా టైప్స్ డెఫినిషన్
interface AIVideoService {
  _id: string;
  title: string;
  description: string;
  mediaUrl: string; // వీడియో లింక్/URL (MP4 లేదా YouTube)
  section: string;
}

export default function AIVideosSection() {
  const [videoItems, setVideoItems] = useState<AIVideoService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      try {
        const res = await fetch(`${apiUrl}/content/services`);
        if (res.ok) {
          const data = await res.json();
          
          if (data && data.success && Array.isArray(data.data)) {
            // 🚀 FILTER LAYER: డేటాబేస్ నుండి కేవలం 'ai-videos' సెక్షన్ ఎంట్రీలను ఫిల్టర్ చేయడం
            const aiVideosOnly = data.data.filter(
              (item: AIVideoService) => item.section === "ai-videos"
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
        
        {/* 🚀 కేవలం sectionKey="ai-videos" ఇస్తే చాలు, కాంపోనెంట్ ఆటోమేటిక్ గా API నుండి హెడర్ తెచ్చుకుంటుంది */}
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
  
  // 🚀 Regular Expressions ఉపయోగించి YouTube ID ని పక్కాగా సంగ్రహించే ఫంక్షన్
  const getEmbedUrl = (url: string) => {
    if (!url) return "";

    try {
      // యూట్యూబ్ షార్ట్స్, నార్మల్ వీడియోస్ మరియు యుటి.బి లింక్స్ అన్నింటినీ గుర్తుపట్టే రెగ్యులర్ ఎక్స్ప్రెషన్
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
      const match = url.match(regExp);

      // ఒకవేళ ఐడీ దొరికితే మరియు దాని పొడవు 11 అక్షరాలు ఉంటే (యూట్యూబ్ ఐడీ స్టాండర్డ్ పొడవు)
      if (match && match[2].length === 11) {
        const videoId = match[2];
        return `https://youtube.com{videoId}`;
      }
    } catch (err) {
      console.error("Error parsing YouTube URL:", err);
    }

    // ఒకవేళ యూట్యూబ్ లింక్ కాకపోతే నార్మల్ వీడియో పాత్ ని అలాగే పంపుతుంది
    return url;
  };

  const embedUrl = getEmbedUrl(video.mediaUrl);
  // డేటాబేస్ లో ఉన్న లింక్ యూట్యూబ్ కి సంబంధించినదా అని చెక్ చేస్తుంది
  const isYouTube = video.mediaUrl?.includes("youtube.com") || video.mediaUrl?.includes("youtu.be");

  return (
    <article className="video-card">
      <div 
        className="video-preview" 
        style={{ 
          position: "relative", 
          overflow: "hidden",
          width: "100%",
          height: "100%",
          minHeight: "260px" // ఐఫ్రేమ్ ప్లేయర్ కరెక్ట్ గా కనిపించడానికి కనీస ఎత్తు
        }}
      >
        {video.mediaUrl && (
          isYouTube ? (
            // 🚀 యూట్యూబ్ వీడియోల కోసం ఐఫ్రేమ్ ఎంబెడ్ ప్లేయర్
            <iframe
              src={embedUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                zIndex: 1
              }}
            />
          ) : (
            // నార్మల్ లోకల్/సర్వర్ .mp4 ఫైల్స్ కోసం పాత ప్లేయర్
            <video 
              controls 
              style={{ 
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                zIndex: 1
              }}
            >
              <source src={video.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        )}
      </div>

      <div className="video-body">
        <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
        <p className="text-sm text-gray-400">{video.description}</p>
      </div>
    </article>
  );
}
