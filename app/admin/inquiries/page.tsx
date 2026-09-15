'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || '{}');

        // 1. Session verification check
        if (!token || user.role !== 'admin') {
          router.push('/login');
          return;
        }

        // 2. Query secure backend collection logs
        const res = await fetch('http://localhost:5000/api/admin/inquiries', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const responseData = await res.json();
        if (!res.ok) throw new Error(responseData.message || 'Failed to fetch inquiries.');

        if (responseData && responseData.success && Array.isArray(responseData.data)) {
          setInquiries(responseData.data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [router]);

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Inquiries Log</h1>
        <p className="mt-1 text-sm text-gray-500">Monitor and track incoming contact submissions and feedback entries.</p>
      </div>

      {/* Global State Notifications */}
      {error && <p className="text-red-500 bg-red-50 p-3 rounded-md text-sm font-medium">{error}</p>}

      {/* Data Table Wrapper Layout */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-md font-semibold text-gray-800">Inbound Messages</h2>
          <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
            {inquiries.length} Messages total
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading incoming transmissions...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No contact messages received yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5">User Identity</th>
                  <th className="px-6 py-3.5">Message Content</th>
                  <th className="px-6 py-3.5">Submission Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {inquiries.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/60 transition">
                    {/* User Identity Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.email}</div>
                    </td>
                    
                    {/* Message Content Column */}
                    <td className="px-6 py-4">
                      <p className="text-gray-700 text-sm max-w-xl break-words whitespace-pre-line">
                        {item.message}
                      </p>
                    </td>

                    {/* Submission Date Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
