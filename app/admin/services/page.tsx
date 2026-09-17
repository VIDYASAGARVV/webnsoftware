'use client';
import { useState, useEffect } from 'react';

// 🚀 TypeScript Data Structure
interface Service {
  _id: string;
  title: string;
  description: string;
  section: string; 
  mediaUrl: string;
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('service');
  const [mediaUrl, setMediaUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔄 EDIT MODE STATES
  const [editingId, setEditingId] = useState<string | null>(null);

  // 📄 PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // 1. Load data from Backend
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/content/services');
      const responseData = await res.json();
      
      if (!res.ok) throw new Error('Failed to retrieve items');

      if (responseData && responseData.success && Array.isArray(responseData.data)) {
        setServices(responseData.data);
      } else if (Array.isArray(responseData)) {
        setServices(responseData);
      } else if (responseData && Array.isArray(responseData.services)) {
        setServices(responseData.services);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Add or Update Handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !mediaUrl.trim()) {
      alert("All fields are mandatory!");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const url = editingId 
        ? `http://localhost:5000/api/content/update/${editingId}`
        : 'http://localhost:5000/api/content/add';
        
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, section: category, mediaUrl: mediaUrl.trim() }),
      });

      if (!res.ok) throw new Error('Failed to save record.');

      clearForm();
      fetchServices();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // 3. Setup Edit Values
  const handleEditClick = (item: Service) => {
    setEditingId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.section);
    setMediaUrl(item.mediaUrl || '');
  };

  const clearForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setCategory('service');
    setMediaUrl('');
  };

  // 4. Delete Handler
  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/content/delete/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Could not delete');
      if (editingId === id) clearForm();
      fetchServices();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // 📊 Pagination Math
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = services.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(services.length / recordsPerPage);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manage Content Services</h1>
        <p className="mt-2 text-sm text-gray-500">Configure cards displayed across core marketing pages.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Form Block */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {editingId ? "⚡ Edit Module" : "Add New Module"}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Service Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Next.js Architecture" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Target Section Location</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-800">
                <option value="service">Services Section Block</option>
                <option value="marketing">Marketing Section Block</option>
                <option value="ai-videos">Ai-Videos </option>
                                <option value="hero">Hero Section Block</option>

              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description Paragraph</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Explain details..." required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Media URL</label>
              <input type="text" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Link here..." required />
            </div>

            <div className="flex flex-col gap-2">
              <button type="submit" className={`w-full text-white font-medium py-2 rounded-md transition text-sm ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {editingId ? "Update Component Live" : "Publish Live Component"}
              </button>
              {editingId && (
                <button type="button" onClick={clearForm} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-md transition text-sm">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Side: Data Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Active Aggregations</h2>
              <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">{services.length} Total</span>
            </div>

            {loading ? (
              <div className="p-8 text-center text-gray-400">Loading catalog modules...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-500">{error}</div>
            ) : services.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No services found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Module Identity</th>
                      <th className="px-6 py-3">Category Tag</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {currentRecords.map((item) => (
                      <tr key={item._id} className={`hover:bg-gray-50/70 transition ${editingId === item._id ? 'bg-amber-50/50' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-800">{item.title}</div>
                          <div className="text-xs text-gray-400 max-w-sm truncate">{item.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded capitalize font-medium">
                            {item.section}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                          <button onClick={() => handleEditClick(item)} className="text-blue-600 hover:text-blue-900 font-medium text-xs bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded transition">
                            Edit
                          </button>
                          <button onClick={() => handleDeleteService(item._id)} className="text-red-600 hover:text-red-900 font-medium text-xs bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded transition">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {!loading && services.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="text-xs text-gray-500">
                Showing <span className="font-semibold">{indexOfFirstRecord + 1}</span> to{" "}
                <span className="font-semibold">{indexOfLastRecord > services.length ? services.length : indexOfLastRecord}</span> of{" "}
                <span className="font-semibold">{services.length}</span> outcomes
              </div>
              <div className="inline-flex gap-2">
                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 text-xs border border-gray-300 rounded bg-white font-medium disabled:opacity-50">Previous</button>
                <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 text-xs border border-gray-300 rounded bg-white font-medium disabled:opacity-50">Next</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}