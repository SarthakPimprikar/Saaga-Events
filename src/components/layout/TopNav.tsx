"use client";

import { useRouter } from 'next/navigation';
import { LogOut, Bell, Search, User } from 'lucide-react';

export default function TopNav() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <header className="h-20 bg-black/50 backdrop-blur-md border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-96">
        <Search className="w-4 h-4 text-gray-400 mr-3" />
        <input 
          type="text" 
          placeholder="Search modules..." 
          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border border-black"></span>
        </button>
        
        <div className="h-8 w-px bg-white/10 mx-2"></div>

        <button className="flex items-center gap-3 hover:bg-white/5 p-1.5 pr-4 rounded-full border border-transparent hover:border-white/10 transition-all">
          <div className="w-9 h-9 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center border border-purple-500/30">
            <User className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium hidden md:block">Profile</span>
        </button>

        <button 
          onClick={handleLogout}
          className="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-colors ml-2"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
