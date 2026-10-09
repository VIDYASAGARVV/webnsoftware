// app/admin/services/page.tsx (Part 1 - States & Upload Logics)
'use client';
import { useState, useEffect, useRef } from 'react';

interface ServiceItem {
  _id?: string;
  id?: string;
  title: string;
  shortDescription: string;
  imageUrl?: string;
  videoUrl?: string;
  whatsappMessage: string;
  category: 'business-web' | 'ecommerce' | 'custom-soft' | 'digital-marketing' | 'ai-videos' | 'reels';
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [form, setForm] = useState<ServiceItem>({
    title: '',
    shortDescription: '',
    imageUrl: '',
    videoUrl: '',
    whatsappMessage: '',
    category: 'business-web'
  });

  // 🚀 File Upload States for Binaries
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // 🚀 Dom Element Nodes Refs for Resetting Input Elements
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading,setLoading] = useState<String | boolean>(false);
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  // 1. GET ALL SERVICES FROM BACKEND
  const fetchServices = async () => {
    try {
      const res = await fetch(`${apiUrl}/services`);
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load services:", err);
      setError("Could not connect to backend server.");
    }
  };

  useEffect(() => {
    fetchServices();
  }, [apiUrl]);

  // 2. SUBMIT DYNAMIC FILE FORM DATA PAYLOAD
    // 2. SUBMIT DYNAMIC FILE FORM DATA PAYLOAD (Fixed Order)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // 🚀 లోడింగ్ ఆన్ చేసాము

    const url = isEditing 
      ? `${apiUrl}/services/${currentId}` 
      : `${apiUrl}/services`;
    const method = isEditing ? 'PUT' : 'POST';

    try {
      // 🚀 Shifted to standard multi-part boundary transmission architecture
      const formData = new FormData();
      
      // 1. టెక్స్ట్ ఫీల్డ్స్‌ను కచ్చితంగా ముందే అపెండ్ చేయాలి (బ్యాకెండ్ req.body కి ముందే అందడానికి) 👇
      formData.append('title', form.title || '');
      formData.append('shortDescription', form.shortDescription || '');
      formData.append('whatsappMessage', form.whatsappMessage || '');
      formData.append('category', form.category);

      const isVideoCategory = ['ai-videos', 'reels'].includes(form.category);

      // 2. ఫైల్స్ ని టెక్స్ట్ ఫీల్డ్స్ తర్వాత అపెండ్ చేయాలి 👇
      if (isVideoCategory) {
        if (videoFile) {
          formData.append('video', videoFile);
        } else if (!isEditing) {
          throw new Error('Please select an MP4 video file to upload.');
        }
      } else {
        if (imageFile) {
          formData.append('image', imageFile);
        } else if (!isEditing) {
          throw new Error('Please select an image file to upload.');
        }
      }

      const res = await fetch(url, {
        method,
        body: formData, // 'Content-Type' హెడర్ పెట్టకూడదు, బ్రౌజర్ ఆటోమేటిక్‌గా బౌండరీ సెట్ చేస్తుంది
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Something went wrong while saving.');
      }

      alert(isEditing ? 'Service updated successfully!' : 'Service added successfully!');
      fetchServices();
      resetForm();
    } catch (err: any) {
      console.error("Error saving service:", err);
      setError(err.message || 'Server connection failed.');
    } finally {
      setLoading(false); // 🚀 లోడింగ్ ఆఫ్ చేసాము
    }
  };


  // 3. DELETE SERVICE
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        const res = await fetch(`${apiUrl}/services/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchServices();
        } else {
          const data = await res.json();
          setError(data.error || "Failed to delete item.");
        }
      } catch (err) {
        console.error("Error deleting service:", err);
        setError("Connection error while deleting.");
      }
    }
  };

  // 4. ACTION TRIGGERS (EDIT & RESET)
  const startEdit = (service: ServiceItem) => {
    setError(null);
    setForm({
      title: service.title || '',
      shortDescription: service.shortDescription || '',
      imageUrl: service.imageUrl || '',
      videoUrl: service.videoUrl || '',
      whatsappMessage: service.whatsappMessage || '',
      category: service.category
    });
    setCurrentId(service._id || service.id || null);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({
      title: '',
      shortDescription: '',
      imageUrl: '',
      videoUrl: '',
      whatsappMessage: '',
      category: 'business-web'
    });
    setImageFile(null);
    setVideoFile(null);
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (videoInputRef.current) videoInputRef.current.value = '';
    setIsEditing(false);
    setCurrentId(null);
    setError(null);
  };
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Manage All Services & Content Grid
          </h1>
        </div>
        
        {/* CRUD Input Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-800 p-6 rounded-2xl mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {error && (
            <div className="col-span-1 md:col-span-2 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-2 text-sm">
              <span className="text-base">⚠️</span>
              <div>
                <p className="font-semibold">Submit Error:</p>
                <p className="mt-0.5 opacity-90">{error}</p>
              </div>
            </div>
          )}

          {/* Title Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Service Title</label>
            <input type="text" placeholder="e.g., Custom AI Video Design" className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Category</label>
            <select className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white" value={form.category} onChange={e => setForm({...form, category: e.target.value as any})} required>
              <option value="business-web">Business Websites</option>
              <option value="ecommerce">e-Commerce Websites</option>
              <option value="custom-soft">Custom Software</option>
              <option value="digital-marketing">Digital Marketing + Meta Ads</option>
              <option value="ai-videos">AI Videos</option>
              <option value="reels">Social Media Reels</option>
            </select>
          </div>

          {/* 🚀 Dynamic File Upload Fields */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Upload Service Image (JPG, PNG, WEBP)</label>
            <input 
              ref={imageInputRef}
              type="file" 
              accept=".jpg,.jpeg,.png,.webp"
              className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none text-sm text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed" 
              onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
              disabled={['ai-videos', 'reels'].includes(form.category)} 
              required={!isEditing && !['ai-videos', 'reels'].includes(form.category)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Upload Service Video (MP4 only)</label>
            <input 
              ref={videoInputRef}
              type="file" 
              accept="video/mp4"
              className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none text-sm text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed" 
              onChange={e => setVideoFile(e.target.files ? e.target.files[0] : null)}
              disabled={!['ai-videos', 'reels'].includes(form.category)} 
              required={!isEditing && ['ai-videos', 'reels'].includes(form.category)}
            />
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Short Description</label>
            <textarea placeholder="Write a short summary..." className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white h-24 resize-none" value={form.shortDescription} onChange={e => setForm({...form, shortDescription: e.target.value})} required />
          </div>

          {/* WhatsApp Text Template */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">WhatsApp Message Text</label>
            <input type="text" placeholder="Pre-filled message when customer clicks WhatsApp icon..." className="p-3 bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-white" value={form.whatsappMessage} onChange={e => setForm({...form, whatsappMessage: e.target.value})} required />
          </div>

          {/* Action Trigger Buttons */}
          <div className="md:col-span-2 flex gap-3 mt-2">
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 transition text-white px-6 py-3 font-semibold rounded-xl text-sm">
              {isEditing ? 'Update Service' : 'Add New Item'}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="bg-slate-700 hover:bg-slate-600 transition text-white px-6 py-3 font-semibold rounded-xl text-sm">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Live Grid Table View Rendering */}
        <div className="border border-slate-800 bg-slate-800/20 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800 border-b border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Cloudinary Path Link</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    No items added yet. Complete the form above to add content.
                  </td>
                </tr>
              ) : (
                services.map((service, index) => (
                  <tr key={`${service._id || service.id || index}-${index}`} className="border-b border-slate-800 hover:bg-slate-800/40 transition">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{service.title}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1">{service.shortDescription}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
                        {service.category?.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-400 font-mono">
                      {service.videoUrl 
                        ? <a href={service.videoUrl} target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">🎥 View Video Clid</a> 
                        : service.imageUrl 
                          ? <a href={service.imageUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">🖼️ View Image Clid</a> 
                          : 'No Media Link'
                      }
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button onClick={() => startEdit(service)} className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(service._id || service.id || '')} className="text-red-400 hover:text-red-300 font-semibold text-sm transition">
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
