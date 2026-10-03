// app/admin/dashboard/page.tsx
'use client';
import Link from 'next/link';

export default function AdminDashboard() {
  const adminModules = [
    {
      title: 'Hero Section',
      description: 'Manage main landing page heading and primary text.',
      link: '/admin/hero',
      icon: '✨',
    },
    {
      title: 'Services Section',
      description: 'Add, edit, or delete the services offered by WebNSoftware.',
      link: '/admin/services',
      icon: '💼',
    },
    {
      title: 'About Content',
      description: 'Update the company profile, story, and statistics.',
      link: '/admin/about',
      icon: 'ℹ️',
    },
    {
      title: 'Customer Enquiries',
      description: 'View messages sent through contact forms and WhatsApp logs.',
      link: '/admin/enquiries',
      icon: '📩',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="w-full mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Control Panel
            </h1>
            <p className="text-slate-400 text-sm mt-1">Welcome back! Manage your dynamic website content below.</p>
          </div>
          <Link 
            href="/"
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-full border border-slate-700 transition"
          >
            Go to Live Website →
          </Link>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminModules.map((module) => (
            <Link 
              key={module.link} 
              href={module.link}
              className="group block p-6 bg-slate-800/50 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/30 rounded-2xl shadow-lg transition duration-300"
            >
              <div className="text-3xl mb-4 bg-slate-900 w-12 h-12 flex items-center justify-center rounded-xl group-hover:scale-110 transition duration-300">
                {module.icon}
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                {module.title}
              </h2>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                {module.description}
              </p>
              <div className="mt-4 text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Manage Section <span>→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
