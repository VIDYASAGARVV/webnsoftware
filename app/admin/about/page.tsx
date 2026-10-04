"use client";

import { useEffect, useState } from "react";

export default function AdminAboutPage() {
  const [eyebrow, setEyebrow] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  // 🚀 Upgraded state structure to hold 6 metric point highlights smoothly
  const [points, setPoints] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // 1. Fetch live operational record configs on mounted lifecycle hook
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await fetch(`${apiUrl}/about`);
        if (res.ok) {
          const result = await res.json();
          // API returns response directly or inside a nested data node depending on your route template
          const targetData = result.data ? result.data : result;
          
          if (targetData) {
            setEyebrow(targetData.eyebrow || "");
            setTitle(targetData.title || "");
            setDescription(targetData.description || "");
            
            // Sync up values into our updated 6-item state frame safely
            if (Array.isArray(targetData.points)) {
              const syncedPoints = ["", "", "", "", "", ""];
              targetData.points.forEach((val: string, i: number) => {
                if (i < 6) syncedPoints[i] = val;
              });
              setPoints(syncedPoints);
            }
          }
        }
      } catch (error) {
        console.error("Data load runtime crash:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, [apiUrl]);

  // 2. Capture index modifications safely into our localized array layer
  const handlePointChange = (index: number, value: string) => {
    const updatedPoints = [...points];
    updatedPoints[index] = value;
    setPoints(updatedPoints);
  };

  // 3. Dispatch payload mutations using PUT matching your controller definition
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    // Filter out blank lines if the user leaves any end items empty optional
    const filteredPoints = points.filter(p => p.trim() !== "");

    try {
      const res = await fetch(`${apiUrl}/about`, {
        method: "POST", // 🚀 Updated to PUT to align seamlessly with your operational backend controller
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eyebrow, title, description, points: filteredPoints }),
      });

      const result = await res.json();
      if (res.ok || result.success) {
        setMessage("About Section configuration updated successfully! 🎉");
      } else {
        setMessage("Failed to update layout properties. ❌");
      }
    } catch (error) {
      setMessage("Server connection failed. Verify node processes are running.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-sm text-slate-400 animate-pulse">
        Loading dynamic layout configuration... ⏳
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      {/* Title Header Card */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Manage About Us Grid Layout
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Configure core typography metrics and update up to 6 custom highlight cards dynamically.
        </p>
      </div>

      {/* Main UI Block Panel Container */}
      <div className="max-w-6xl mx-auto bg-slate-800/40 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h2 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-2">
          Edit Bio Content Section
        </h2>
        
        {/* Toast / Notification Pop-up Banner */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${
            message.includes('❌') 
              ? 'bg-red-500/10 border-red-500/30 text-red-400' 
              : 'bg-green-500/10 border-green-500/30 text-green-400'
          }`}>
            {message}
          </div>
        )}

        {/* Input Form Fields Layout */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Banner Segment Eyebrow */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Section Eyebrow Text
              </label>
              <input 
                type="text" 
                value={eyebrow} 
                onChange={(e) => setEyebrow(e.target.value)} 
                className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm" 
                placeholder="e.g. ABOUT US"
                required 
              />
            </div>

            {/* Headline Title */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Main Highlight Headline
              </label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm" 
                placeholder="e.g. We build digital products."
                required 
              />
            </div>

            {/* Big Paragraph Description Bio Block */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Core Bio Summary Description Paragraph
              </label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={4} 
                className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white text-sm resize-none leading-relaxed" 
                placeholder="Provide a comprehensive operational framework statement..."
                required 
              />
            </div>
          </div>

          {/* Dynamic 6 Points Highlights Array Grid Segment Split */}
          <div className="pt-4 border-t border-slate-700">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Why Webnsoftware (Configure Up to 6 Summary Metrics)
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-3 bg-slate-900/40 p-2 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-xl min-w-[42px] text-center font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <input 
                    type="text" 
                    value={point} 
                    placeholder={`Highlight bullet text message info 0${index + 1}`}
                    onChange={(e) => handlePointChange(index, e.target.value)} 
                    className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm" 
                    
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Trigger Actions Wrapper */}
          <div className="pt-4 border-t border-slate-700 flex justify-end">
            <button 
              type="submit" 
              disabled={saving} 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-semibold px-6 py-3 rounded-xl transition text-sm shadow-md"
            >
              {saving ? "🔄 Broadcasting changes live..." : "Save Component Content Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
