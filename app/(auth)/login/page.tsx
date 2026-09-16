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

  //  try {
  // const res = await fetch('http://localhost:5000/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password }),
  // });

  // // 1. Check if the response is HTML or broken first
  // if (!res.ok) {
  //   // If it is an HTML page error, it won't crash your app now
  //   const errorText = await res.text(); 
  //   throw new Error(`Server error (${res.status}): Something went wrong.`);
  // }

  try {
  // 🚀 డైనమిక్ ఎన్విరాన్‌మెంట్ వేరియబుల్‌ని ఇక్కడ డిఫైన్ చేసాము
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://onrender.com';

  // 🚀 హార్డ్‌కోడ్ లింక్ తీసేసి, ${apiUrl} ని చేర్చాము
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  // 1. Check if the response is HTML or broken first
  if (!res.ok) {
    const errorText = await res.text(); 
    throw new Error(`Server error (${res.status}): Something went wrong.`);
  }
  
  // మీ మిగిలిన సక్సెస్ లాజిక్ ఇక్కడ వస్తుంది...



  // 2. Only parse JSON if the response is successful
  const data = await res.json();

  // Save user session details
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify({ name: data.name, role: data.role }));

  // Conditional Redirect based on role
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
      </form>
    </div>
  );
}
