// app/admin/headings/page.tsx (Part 1 - Logic Framework)
'use client';
import { useState, useEffect } from 'react';

interface HeadingRecord {
  _id?: string;
  id?: string;
  sectionKey: string;
  eyebrow: string;
  title: string;
  text: string;
}

export default function AdminHeadingsPage() {
  const [headings, setHeadings] = useState<HeadingRecord[]>([]);
  const [form, setForm] = useState<HeadingRecord>({
    sectionKey: 'services',
    eyebrow: '',
    title: '',
    text: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // 1. FETCH REGISTRIES
  const fetchHeadings = async () => {
    try {
      const res = await fetch(`${apiUrl}/headings`);
      const responseData = await res.json();
      if (res.ok && responseData.success) {
        setHeadings(responseData.data || []);
      } else {
        setHeadings([]);
      }
    } catch (err) {
      console.error("Failed to load headings:", err);
      setError("Could not connect to the backend settings server.");
    }
  };

  useEffect(() => {
    fetchHeadings();
  }, []);

  // 2. FORM SUBMISSION VALIDATION LOGIC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // 🚀 STAGE CHECK: Prevent duplicating a sectionKey record if not editing
    if (!isEditing) {
      const isDuplicate = headings.some(
        (h) => h.sectionKey.toLowerCase() === form.sectionKey.toLowerCase()
      );
      if (isDuplicate) {
        setError(`The section key config "${form.sectionKey}" is already registered. Please edit the entry below.`);
        return;
      }
    }

    setLoading(true);
    const url = isEditing 
      ? `${apiUrl}/headings/${currentId}` 
      : `${apiUrl}/headings`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to save heading details.');
      }

      setSuccess(isEditing ? 'Heading configuration updated successfully!' : 'New Heading metadata initialized!');
      fetchHeadings();
      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Transmission transaction exception.');
    } finally {
      setLoading(false);
    }
  };

  // 3. SECURE ACTION DISPATCH LOGICS (EDIT, DELETE & RESET)
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to completely remove this custom section heading parameter?')) {
      try {
        const res = await fetch(`${apiUrl}/headings/${id}`, { method: 'DELETE' });
        const result = await res.json();
        
        if (res.ok && result.success) {
          setSuccess("Configuration profile cleared successfully.");
          fetchHeadings();
          if (currentId === id) resetForm();
        } else {
          setError(result.error || "Failed to complete deletion routine.");
        }
      } catch (err) {
        console.error("Deletion exception error:", err);
        setError("Network connectivity interface failure.");
      }
    }
  };

  const startEdit = (record: HeadingRecord) => {
    setError(null);
    setSuccess(null);
    setForm({
      sectionKey: record.sectionKey,
      eyebrow: record.eyebrow || '',
      title: record.title || '',
      text: record.text || ''
    });
    setCurrentId(record._id || record.id || null);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({
      sectionKey: 'services',
      eyebrow: '',
      title: '',
      text: ''
    });
    setIsEditing(false);
    setCurrentId(null);
  };
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Manage Section Headings Configuration
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Configure standalone dynamically bound layout subheadings, eyebrows, and description parameters.
          </p>
        </div>
        
        {/* Input Input Form Element */}
        <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-800 p-6 rounded-2xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Status Alert Panels */}
          {error && (
            <div className="col-span-1 md:col-span-2 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-2 text-sm">
              <span className="text-base">⚠️</span>
              <div>
                <p className="font-semibold">Validation Guard:</p>
                <p className="mt-0.5 opacity-90">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="col-span-1 md:col-span-2 bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl flex items-start gap-2 text-sm">
              <span className="text-base">✅</span>
              <div>
                <p className="font-semibold">Success:</p>
                <p className="mt-0.5 opacity-90">{success}</p>
              </div>
            </div>
          )}

          {/* Section Key Identifier Select Form Dropdown Element */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Section Identifier Key</label>
            <select 
              className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white disabled:opacity-40"
              value={form.sectionKey} 
              onChange={e => setForm({...form, sectionKey: e.target.value})} 
              disabled={isEditing}
              required
            >
              <option value="services">services</option>
              <option value="about-us">about-us</option>
              <option value="contact">contact</option>
              <option value="hero">hero</option>
            </select>
          </div>

          {/* Eyebrow Input Text Element Form Layer */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Eyebrow (Small Tagtext)</label>
            <input type="text" placeholder="e.g., What we build" className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white" value={form.eyebrow} onChange={e => setForm({...form, eyebrow: e.target.value})} />
          </div>

          {/* Core Headline Title */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Heading Title</label>
            <input type="text" placeholder="e.g., Digital products for modern businesses." className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          </div>

          {/* Subtext Description Block TextArea Layout */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Text Content / Sub-description</label>
            <textarea placeholder="Write layout text summaries here..." className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white h-24 resize-none" value={form.text} onChange={e => setForm({...form, text: e.target.value})} />
          </div>

          {/* Interactive Trigger Interface Buttons */}
          <div className="md:col-span-2 flex gap-3 mt-2">
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 transition text-white px-6 py-3 font-semibold rounded-xl text-sm">
              {loading ? 'Processing Transaction...' : isEditing ? 'Update Heading Config' : 'Create Section Key'}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="bg-slate-700 hover:bg-slate-600 transition text-white px-6 py-3 font-semibold rounded-xl text-sm">
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* Live Grid Table Matrix With Interactive Status and Deletion Pillars */}
        <div className="border border-slate-800 bg-slate-800/20 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Section Identifier</th>
                <th className="p-4">Status</th>
                <th className="p-4">Heading Meta Previews</th>
                <th className="p-4 text-right">Actions Dashboard</th>
              </tr>
            </thead>
            <tbody>
              {headings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    No active runtime bound section keys initialized. Populate data variables above.
                  </td>
                </tr>
              ) : (
                headings.map((record, index) => (
                  <tr key={`${record._id || record.id || index}-${index}`} className="border-b border-slate-800 hover:bg-slate-800/40 transition">
                    
                    {/* Identifier Column Key */}
                    <td className="p-4 font-mono text-sm text-yellow-400 font-semibold">{record.sectionKey}</td>
                    
                    {/* Live Status Badge Component Node */}
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                        Live Active
                      </span>
                    </td>
                    
                    {/* Heading Descriptions */}
                    <td className="p-4 max-w-sm">
                      <div className="font-bold text-white text-sm line-clamp-1">{record.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{record.text || 'No descriptive description subtext.'}</div>
                    </td>
                    
                    {/* Operations Column Action (Edit & Complete Delete) */}
                    <td className="p-4 text-right space-x-4">
                      <button onClick={() => startEdit(record)} className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(record._id || record.id || '')} className="text-red-400 hover:text-red-300 font-semibold text-sm transition">
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
