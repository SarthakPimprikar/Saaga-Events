"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Sparkles, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <span className="text-xl font-bold tracking-tight">Saaga Events</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <button className="px-5 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-32 pb-24 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 mb-8 backdrop-blur-md"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>High-end & Secure Setup</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-8 leading-[1.1]"
        >
          Elevating Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Next.js</span> Experience
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
        >
          A premium foundation built with React Compiler, Tailwind CSS, and MongoDB. Delivering seamless performance across iOS, Android, and Web platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95">
            Start Building
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-md">
            View Documentation
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="w-full max-w-5xl mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <CalendarDays className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Event Management</h3>
            <p className="text-gray-400 leading-relaxed">
              Robust capabilities backed by MongoDB to seamlessly handle scalable data and event coordination globally.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Architecture</h3>
            <p className="text-gray-400 leading-relaxed">
              Enterprise-grade security built directly into your application schema and API endpoints out of the box.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">React Compiler</h3>
            <p className="text-gray-400 leading-relaxed">
              Automatically optimized components, avoiding unnecessary re-renders for blazing fast multi-device performance.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
