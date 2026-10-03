// app/admin/hero/page.tsx
'use client';
import { useState, useEffect } from 'react';

export default function AdminHeroPage() {
  const [heading, setHeading] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/hero') // Fallback route or your Node.js absolute API URL
      .then((res) => res.json())
      .then((data) => setHeading(data.heading || ''));
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:5000/api/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ heading }),
    });
    setLoading(false);
    if (res.ok) alert('Hero heading updated successfully!');
  };

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Manage Hero Section</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Hero Heading Text</label>
          <textarea
            className="w-full p-2 border rounded-md h-32"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
        >
          {loading ? 'Saving...' : 'Update Heading'}
        </button>
      </form>
    </div>
  );
}
