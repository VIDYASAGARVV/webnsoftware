'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 🚀 1. మీ అసలైన ఆన్‌లైన్ రెండర్ బ్యాకెండ్ API లింక్‌ను ఇక్కడ పక్కాగా ఇచ్చాము
      // const apiUrl = (process.env.NEXT_PUBLIC_API_URL as string) || 'https://webnsoftware-backend.onrender.com/api';
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text(); 
        throw new Error(`Server error (${res.status}): Something went wrong.`);
      }
      
      const data = await res.json();

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({ name: data.name, role: data.role }));

      if (data.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/'); 
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Account Login</h2>
        {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md text-gray-700" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md text-gray-700" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
          Sign In
        </button>
      <div className="mt-6 border border-slate-800 bg-slate-600 p-4 rounded-xl flex items-start gap-3 text-sm text-slate-300">
  {/* Info Icon Anchor */}
  <span className="text-base text-blue-400 mt-0.5">ℹ️</span>
  
  <div>
    <p className="font-semibold text-white tracking-wide mb-1">
      Demo Administrator Access
    </p>
    <div className="space-y-1 opacity-90 font-mono text-xs">
      <div>
        <span className="text-slate-400 font-sans">Admin Email:</span> admin@webnsoftware.com
      </div>
      <div>
        <span className="text-slate-400 font-sans">Password:</span> adminpassword123
      </div>
    </div>
  </div>
</div>

      </form>
    </div>
  );
}
