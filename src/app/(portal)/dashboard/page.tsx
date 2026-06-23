"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-full font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">Total Events</h3>
            <p className="text-4xl font-bold text-purple-400">12</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">Active Users</h3>
            <p className="text-4xl font-bold text-blue-400">3,492</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-semibold mb-2">System Status</h3>
            <p className="text-4xl font-bold text-emerald-400">Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
