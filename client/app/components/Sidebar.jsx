import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Grid,
  BarChart,
  MessageCircle,
  Plus,
} from "lucide-react";
import "./bg.css";

export default function Sidebar() {
  const [username, setUsername] = useState("");

  // Fetch the username from local storage
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <aside className="fixed w-20 h-screen p-3 text-white bg-gradient-to-b from-[#071023] to-[#0b1626] border-r border-transparent shadow-xl">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center justify-center mt-6">
            <img src="/logo1.png" alt="logo" className="w-16 h-8 object-contain" />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="mt-12">
          <Link href="/dashboard">
            <button className="flex flex-col items-center justify-center gap-2 py-3 px-4 text-[#C9CBD0] hover:bg-[rgba(255,255,255,0.03)] w-full transition-all duration-200 rounded">
              <Grid size={24} />
              <span className="text-xs">Dashboard</span>
            </button>
          </Link>
          <Link href="/allreports">
            <button className="flex flex-col items-center justify-center gap-2 py-3 px-4 text-[#C9CBD0] hover:bg-[rgba(255,255,255,0.03)] w-full transition-all duration-200 rounded">
              <BarChart size={24} />
              <span className="text-xs">Reports</span>
            </button>
          </Link>
          {/* Chat removed - focus on sessions and reports for now */}
          <Link href="/session">
            <button className="flex flex-col items-center justify-center gap-2 rounded-lg  py-3 px-4 mt-8 text-white bg-gradient-to-r from-var(--accent) to-var(--accent-2) hover:opacity-90 w-full transition-all duration-200">
              <Plus size={24} />
              <span className="text-xs">New Session</span>
            </button>
          </Link>
        </nav>
        {/* Username */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center text-center px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1e293b] to-[#0b1626] flex items-center justify-center mb-2">{username ? username.charAt(0).toUpperCase() : 'U'}</div>
          <div className="text-[12px] text-[#cbd5e1]">{username || 'Guest'}</div>
        </div>
      </aside>
    </div>
  );
}