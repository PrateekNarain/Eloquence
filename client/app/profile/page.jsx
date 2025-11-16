"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../components/bg.css';

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('username');
    const rawId = localStorage.getItem('userId');
    setUsername(raw && raw !== 'undefined' ? raw : '');
    setUserId(rawId && rawId !== 'undefined' ? rawId : null);
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!userId) {
      setStatus({ type: 'error', message: 'No userId available' });
      return;
    }
    try {
      const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';
      const token = localStorage.getItem('token');
      const res = await fetch(`${API}/auth/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId, username }),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || 'Update failed');
      // update localStorage
      localStorage.setItem('username', j.username || username);
      setStatus({ type: 'success', message: 'Profile updated' });
      setTimeout(() => router.push('/dashboard'), 900);
    } catch (err) {
      setStatus({ type: 'error', message: String(err) });
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <div className="pro-card p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Edit Profile</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm muted-text block mb-2">Username</label>
              <input value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 bg-[#0f172a] border border-[#22303a] rounded" />
            </div>
            <div>
              <label className="text-sm muted-text block mb-2">Email (read-only)</label>
              <input value={userId || ''} readOnly className="w-full p-3 bg-[#0f172a] border border-[#22303a] rounded text-muted" />
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-[var(--primary)] text-white rounded">Save</button>
              <button type="button" onClick={() => router.push('/dashboard')} className="px-4 py-2 border rounded text-white">Cancel</button>
            </div>
            {status && (
              <div className={`text-sm ${status.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>{status.message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
