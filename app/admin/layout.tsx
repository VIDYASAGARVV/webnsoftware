'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    // 1. Check if we are running in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      // 2. If token doesn't exist, redirect to login page immediately
      if (!token || !userStr) {
        router.replace('/login');
        return;
      }

      const user = JSON.parse(userStr);

      // 3. If the user is logged in but NOT an admin, kick them out to homepage
      if (user.role !== 'admin') {
        router.replace('/');
      } else {
        setAdminName(user.name);
        setLoading(false); // Authentication verified, stop loading
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.replace('/login');
  };

  // Loading Screen while verifying JWT state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium tracking-wide">Verifying Access Credentials...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { name: 'Dashboard Home', path: '/admin/dashboard' },
    {name: 'Headings Section', path: '/admin/headings'},
    { name: 'Manage Services', path: '/admin/services' },
     { name: 'Manage Inquiries', path: '/admin/inquiries' },
    { name: 'Manage About us', path: '/admin/about' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
        <div>
          <div className="p-5 font-bold text-xl border-b border-gray-800 text-blue-400">
            Admin Console
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item, idx) => (
              <Link key={idx} href={item.path} className="block px-4 py-2.5 rounded transition duration-200 hover:bg-gray-800 hover:text-white font-medium text-gray-300">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Sidebar Footer Account Action */}
        <div className="p-4 border-t border-gray-800 space-y-3">
          <div className="text-xs text-gray-400 px-2">Logged in as: <span className="text-white font-semibold">{adminName}</span></div>
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded text-center transition text-sm">
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Viewport panel view */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white shadow-sm p-4 text-right font-medium text-gray-600 border-b">
          Welcome back, {adminName} ✨
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
