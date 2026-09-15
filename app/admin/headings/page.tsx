"use client";

import { useEffect, useState } from "react";

// హెడ్డింగ్ డేటా స్ట్రక్చర్ టైప్ డెఫినిషన్
interface HeadingRecord {
  _id?: string;
  sectionKey: string;
  eyebrow: string;
  title: string;
  text: string;
}

export default function AdminHeadingsPage() {
  // ఫారమ్ ఫీల్డ్స్ మరియు డ్రాప్‌డౌన్ కోసం స్టేట్స్
  const [sectionKey, setSectionKey] = useState("service");
  const [eyebrow, setEyebrow] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  
  // టేబుల్ డేటా మరియు పేజినేషన్ కోసం స్టేట్స్
  const [headingsList, setHeadingsList] = useState<HeadingRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // ఒక పేజీకి కనిపించాల్సిన రికార్డుల సంఖ్య

  // లోడింగ్, సేవింగ్ మరియు నోటిఫికేషన్ మెసేజ్ స్టేట్స్
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
const [imageFile, setImageFile] = useState<File | null>(null); // 🚀 ఇమేజ్ ఫైల్ కోసం స్టేట్
const [mediaUrl, setMediaUrl] = useState(""); // పాత ఇమేజ్ ప్రివ్యూ కోసం

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  // 1. అన్ని హెడ్డింగ్స్ డేటాను టేబుల్ కోసం తెచ్చుకోవడం
  const fetchAllHeadings = async () => {
    try {
      const res = await fetch(`${apiUrl}/headings`);
      if (res.ok) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setHeadingsList(result.data);
        } else if (Array.isArray(result)) {
          setHeadingsList(result);
        }
      }
    } catch (error) {
      console.error("టేబుల్ డేటా లోడ్ చేయడం విఫలమైంది:", error);
    }
  };

  // 2. సెలెక్ట్ చేసిన నిర్దిష్ట సెక్షన్ డేటాను ఫారమ్‌లోకి తెచ్చుకోవడం
  const fetchSingleHeading = async (key: string) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${apiUrl}/headings/${key}`);
      if (res.ok) {
        const result = await res.json();
        const heading = Array.isArray(result.data) 
          ? result.data.find((item: any) => item.sectionKey === key) 
          : result.data;

        if (heading) {
          setEyebrow(heading.eyebrow || "");
          setTitle(heading.title || "");
          setText(heading.text || "");
            setMediaUrl(heading.mediaUrl || ""); // ప్రివ్యూ కోసం
  setImageFile(null); // ఫైల్ రీసెట్
        } else {
          clearForm();
        }
      } else {
        clearForm();
      }
    } catch (error) {
      console.error("డేటా లోడ్ చేయడం విఫలమైంది:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setEyebrow("");
    setTitle("");
    setText("");
  };

  // 🚀 రికార్డ్ డిలీట్ చేయడానికి ఫంక్షన్
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section heading?")) return;
    
    try {
      const res = await fetch(`${apiUrl}/headings/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        setMessage("Heading successfully deleted! 🗑️");
        fetchAllHeadings(); // టేబుల్ ని రీఫ్రెష్ చేస్తుంది
        clearForm();
      } else {
        setMessage("Failed to delete record. ❌");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  useEffect(() => {
    fetchSingleHeading(sectionKey);
    fetchAllHeadings();
  }, [sectionKey, apiUrl]);
  // 3. హెడ్డింగ్ డేటాను సేవ్ లేదా అప్‌డేట్ చేయడం
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!title.trim()) {
    alert("Title field is mandatory!");
    return;
  }

  setSaving(true);
  setMessage("");

  // 🚀 ఫైల్ అప్‌లోడ్ సపోర్ట్ కోసం FormData వాడుతున్నాం
  const formData = new FormData();
  formData.append("sectionKey", sectionKey);
  formData.append("eyebrow", eyebrow);
  formData.append("title", title);
  formData.append("text", text);
  
  if (imageFile) {
    formData.append("image", imageFile); // 'image' అనేది బ్యాకెండ్ Multer కి మ్యాచ్ అవ్వాలి
  }

  try {
    const res = await fetch(`${apiUrl}/headings`, {
      method: "POST",
      // ⚠️ గమనిక: FormData వాడినప్పుడు "Content-Type" హెడర్ పెట్టకూడదు, బ్రౌజర్ ఆటోమేటిగ్గా తీసుకుంటుంది
      body: formData, 
    });

    const result = await res.json();
    if (result.success) {
      setMessage("Section Heading మరియు ఇమేజ్ విజయవంతంగా అప్‌డేట్ అయ్యింది! 🎉");
      if(result.data && result.data.mediaUrl) {
        setMediaUrl(result.data.mediaUrl); // కొత్త ఇమేజ్ ప్రివ్యూ అప్‌డేట్
      }
      fetchAllHeadings();
    } else {
      setMessage("అప్‌డేట్ చేయడం సాధ్యపడలేదు. ❌");
    }
  } catch (error) {
    setMessage("సర్వర్ కనెక్షన్ ఎర్రర్.");
  } finally {
    setSaving(false);
  }
};


  const handleEditClick = (record: HeadingRecord) => {
    setSectionKey(record.sectionKey);
    setEyebrow(record.eyebrow || "");
    setTitle(record.title || "");
    setText(record.text || "");
    setMediaUrl(record.mediaUrl || "");
setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = headingsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(headingsList.length / itemsPerPage);

  return (
    <div className="w-full max-w-7xl mx-auto my-8 px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manage Section Headings</h1>
        <p className="mt-2 text-sm text-gray-500">
          Dynamically override top banners, titles, and subtitle paragraphs for core UI layout zones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Heading Editor Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Heading Editor Form</h2>
          
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Select Target Layout Section
            </label>
            <select 
              value={sectionKey} 
              onChange={(e) => setSectionKey(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hero"> Hero Section Banner </option>
              <option value="service">Services Section Banner</option>
              <option value="marketing">Marketing Section Banner</option>
              <option value="ai-videos">AI Videos Section Banner</option>
            </select>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg text-sm font-medium border ${
              message.includes('❌') || message.includes('failed') ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'
            }`}>
              {message}
            </div>
          )}

          {loading ? (
            <div className="py-12 text-center text-sm text-gray-400 animate-pulse">
              Loading section meta credentials... ⏳
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 🚀 ఇమేజ్ అప్‌లోడ్ ఫీల్డ్ మరియు లైవ్ ప్రివ్యూ */}
<div>
  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
    Upload Section Image (Optional)
  </label>
  <input 
    type="file" 
    accept="image/*"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
      }
    }} 
    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
  />
  
  {/* ఆల్రెడీ ఇమేజ్ ఉంటే లేదా కొత్తగా సెలెక్ట్ చేస్తే చిన్న ప్రివ్యూ చూపిస్తుంది */}
  {(imageFile || mediaUrl) && (
    <div className="mt-2">
      <p className="text-xs text-gray-400 mb-1">Image Preview:</p>
      <img 
        src={imageFile ? URL.createObjectURL(imageFile) : mediaUrl} 
        alt="Preview" 
        className="h-20 w-auto rounded border border-gray-200 object-cover"
      />
    </div>
  )}
</div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Eyebrow Text
                </label>
                <input 
                  type="text" 
                  value={eyebrow} 
                  onChange={(e) => setEyebrow(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Main Section Title
                </label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Subtitle Context Text
                </label>
                <textarea 
                  value={text} 
                  onChange={(e) => setText(e.target.value)} 
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button 
                  type="submit" 
                  disabled={saving}
                  className={`w-full text-white font-medium py-2 rounded-md transition text-sm ${
                    saving ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {saving ? "🔄 Saving updates live..." : "Update Component Live"}
                </button>
              </div>
            </form>
          )}
        </div>
        {/* RIGHT COLUMN: Database Headings Data Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Active Headings Overview</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold border-b border-gray-200">
                  <th className="py-3 px-4">Section Key</th>
                  <th className="py-3 px-4">Eyebrow / Title</th>
                  <th className="py-3 px-4">Description Text</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-400">
                      No records active in data logs.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-blue-600">
                        <span className="bg-blue-50 px-2 py-1 rounded text-xs border border-blue-100">
                          {item.sectionKey}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-[150px] truncate">
                        <div className="text-xs text-gray-400 font-medium uppercase">{item.eyebrow || '-'}</div>
                        <div className="font-medium text-gray-900 truncate">{item.title}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-[180px] text-xs text-gray-500 truncate">
                        {item.text || '-'}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="px-2 py-1 bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white rounded text-xs font-medium transition"
                          >
                            Edit
                          </button>
                          {/* 🚀 కొత్తగా చేర్చిన డిలీట్ బటన్ */}
                          <button
                            onClick={() => item._id && handleDelete(item._id)}
                            className="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded text-xs font-medium transition border border-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION UI */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-4 py-4 mt-4 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs text-gray-500">
                    Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-semibold">
                      {Math.min(indexOfLastItem, headingsList.length)}
                    </span>{" "}
                    of <span className="font-semibold">{headingsList.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40"
                    >
                      <span>«</span>
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`relative inline-flex items-center px-3 py-2 text-xs font-semibold ${
                          currentPage === page ? "z-10 bg-blue-600 text-white" : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-40"
                    >
                      <span>»</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
