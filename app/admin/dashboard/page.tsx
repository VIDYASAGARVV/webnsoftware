'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// 🚀 FIX 1: Explicitly added totalUsers to the TypeScript type structure definition
interface DashboardMetrics {
  totalServices: number;
  aiVideosUploaded: number;
  newInquiries: number;
  totalUsers: number; // 👈 Added this missing type mapping rule
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminName, setAdminName] = useState('Admin');
  
  // 🚀 FIX 2: Added totalUsers: 0 initialization inside your initial state setup object
  const [metrics, setMetrics] = useState<DashboardMetrics>({ 
    totalServices: 0, 
    aiVideosUploaded: 0, 
    newInquiries: 0,
    totalUsers: 0 // 👈 Initialized to zero to prevent component rendering drops
  });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // 1. Session verification guard
    if (!token || user.role !== 'admin') {
      router.push('/login');
      return;
    }

    setAdminName(user.name || 'Admin');

    // 2. Fetch live metrics from secured API endpoint
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setFetchError('');
        
        const res = await fetch('http://localhost:5000/api/admin/metrics', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Pass JWT for access validation
          }
        });

        if (!res.ok) throw new Error('Could not load current database metrics.');

        const data = await res.json();
        
        // Unpack properties safely from the server response data object layer
        setMetrics({
          totalServices: data.totalServices || 0,
          aiVideosUploaded: data.aiVideosUploaded || 0,
          newInquiries: data.newInquiries || 0,
          totalUsers: data.totalUsers || 0, 
        });
      } catch (err: any) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  return (
    <div className="w-full">
      {/* Header section with Dynamic User Context */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, <span className="font-semibold text-blue-600">{adminName}</span>. 
            Here you can monitor submissions, modify site sections, and track operations metrics seamlessly.
          </p>
        </div>
      </div>

      {/* Global Dashboard Messages */}
      {fetchError && <p className="text-red-500 bg-red-50 p-3 rounded-md mb-4 text-sm font-medium">{fetchError}</p>}
      
      {/* Analytical grid sample cards layout - Expanded seamlessly to 4 slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        
        {/* Card 1: Services */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <h3 className="text-gray-400 font-semibold text-sm tracking-wider">TOTAL SERVICES</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {loading ? <span className="text-gray-300 animate-pulse">...</span> : metrics.totalServices}
          </p>
        </div>

        {/* Card 2: AI Videos */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-purple-500">
          <h3 className="text-gray-400 font-semibold text-sm tracking-wider">AI VIDEOS UPLOADED</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {loading ? <span className="text-gray-300 animate-pulse">...</span> : metrics.aiVideosUploaded}
          </p>
        </div>

        {/* Card 3: Inquiries */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-emerald-500">
          <h3 className="text-gray-400 font-semibold text-sm tracking-wider">NEW INQUIRIES</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {loading ? <span className="text-gray-300 animate-pulse">...</span> : metrics.newInquiries}
          </p>
        </div>

        {/* Card 4: Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-indigo-500">
          <h3 className="text-gray-400 font-semibold text-sm tracking-wider">TOTAL USERS</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            {loading ? <span className="text-gray-300 animate-pulse">...</span> : metrics.totalUsers}
          </p>
        </div>

      </div>
    </div>
  );
}
