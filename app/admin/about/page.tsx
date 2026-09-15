"use client";

import { useEffect, useState } from "react";

export default function AdminAboutPage() {
  const [eyebrow, setEyebrow] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // 1. ప్రస్తుత డేటాను లోడ్ చేయడం
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(`${apiUrl}/about`);
        if (res.ok) {
          const result = await res.json();
          if (result.success && result.data) {
            setEyebrow(result.data.eyebrow);
            setTitle(result.data.title);
            setDescription(result.data.description);
            if (result.data.points) setPoints(result.data.points);
          }
        }
      } catch (error) {
        console.error("డేటా లోడ్ చేయడం విఫలమైంది:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, [apiUrl]);

  // 3. పాయింట్ల టెక్స్ట్ మారినప్పుడు హ్యాండిల్ చేయడం
  const handlePointChange = (index: number, value: string) => {
    const updatedPoints = [...points];
    updatedPoints[index] = value;
    setPoints(updatedPoints);
  };

  // 2. డేటాను సేవ్/అప్‌డేట్ చేయడం
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`${apiUrl}/about`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eyebrow, title, description, points }),
      });

      const result = await res.json();
      if (result.success) {
        setMessage("About Section విజయవంతంగా అప్‌డేట్ అయ్యింది! 🎉");
      } else {
        setMessage("అప్‌డేట్ చేయడం సాధ్యపడలేదు. ❌");
      }
    } catch (error) {
      setMessage("సర్వర్ కనెక్షన్ ఎర్రర్.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-gray-400 animate-pulse">
        డేటా లోడ్ అవుతోంది... ⏳
      </div>
    );
  }

  return (
    <div className="space-y-2 w-full max-w-5xl">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manage About Content</h1>
        <p className="mt-2 text-sm text-gray-500">Configure core typography and highlights displayed inside the landing bio panel.</p>
      </div>

      {/* Main Form Container Block */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-6 text-gray-800 border-b border-gray-100 pb-2">
          Edit About Us Component
        </h2>
        
        {/* Feedback Dynamic Message Popup */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${message.includes('❌') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Eyebrow Input Element */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Section Eyebrow Banner
            </label>
            <input 
              type="text" 
              value={eyebrow} 
              onChange={(e) => setEyebrow(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
              placeholder="e.g. ABOUT US"
              required 
            />
          </div>

          {/* Title Input Element */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Main Headline Title
            </label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
              placeholder="e.g. We build modular web layers."
              required 
            />
          </div>

          {/* Description Textarea Area Element */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Core Bio Description Paragraph
            </label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={4} 
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
              placeholder="Provide a modern overview statement..."
              required 
            />
          </div>

          {/* Why Webnsoftware Dynamic Loop Inputs Block */}
          <div className="space-y-3 pt-2 border-t border-gray-50">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
              Why Webnsoftware (3 Summary Highlights)
            </label>
            
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-2 rounded-md border border-blue-100 min-w-[36px] text-center">
                  0{index + 1}
                </span>
                <input 
                  type="text" 
                  value={point} 
                  placeholder={`Summary metric highlight item 0${index + 1}`}
                  onChange={(e) => handlePointChange(index, e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" 
                  required 
                />
              </div>
            ))}
          </div>

          {/* Form Action Submit Button Component Wrapper */}
          <div className="pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              disabled={saving} 
              className={`w-full text-white font-medium py-2 rounded-md transition text-sm shadow-sm ${saving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}`}
            >
              {saving ? "🔄 Saving updates live..." : "Save Component Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
