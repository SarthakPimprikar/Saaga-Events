"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed.");
      } else {
        // Route based on role
        if (data.role === 'ADMIN') {
          router.push("/dashboard");
        } else if (data.role === 'CMS') {
          router.push("/cms");
        } else if (data.role === 'LEAD_MGT') {
          router.push("/lead-mgt");
        } else {
          router.push("/dashboard"); // Fallback
        }
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
      
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/30">
          <ShieldCheck className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Admin Portal</h2>
        <p className="text-gray-400 text-sm mt-2">Sign in to manage Saaga Events</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl mb-6 text-sm border border-red-400/20"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Select Your Role</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'ADMIN', label: 'Admin' },
              { id: 'CMS', label: 'CMS' },
              { id: 'LEAD_MGT', label: 'Lead Exec' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                disabled={loading}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all disabled:opacity-50 ${
                  role === r.id 
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-300'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder-gray-500 transition-all disabled:opacity-50 outline-none"
            placeholder="admin@saagaevents.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder-gray-500 transition-all disabled:opacity-50 outline-none pr-12"
              placeholder="••••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 py-3.5 px-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:hover:bg-white disabled:active:scale-100"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Authenticating...
            </>
          ) : (
            "Secure Sign In"
          )}
        </button>
      </form>
    </motion.div>
  );
}
