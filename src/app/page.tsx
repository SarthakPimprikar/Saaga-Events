"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, Heart, Utensils, Gift, Coffee, LayoutGrid, Users, Lightbulb, Wine, Bookmark, Star, GraduationCap, Play, Trophy, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check on mount
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 flex flex-col relative font-sans">
      {/* Background removed as user requested only image in middle */}

      {/* Navbar (Fixed and dynamic transparency based on scroll position) */}
      <nav 
        className={`fixed top-0 left-0 z-50 w-full px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          isScrolled 
            ? "bg-black/60 backdrop-blur-md py-4 shadow-lg border-b border-white/5" 
            : "bg-transparent backdrop-blur-none py-8 border-b-0 border-transparent"
        }`}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-1">
            <div className="w-full h-full border border-[#e5b869] rounded-full flex items-center justify-center">
              <span className="text-[#c19a53] font-serif font-bold text-2xl" style={{ fontFamily: "var(--font-playfair)" }}>S</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-medium tracking-widest text-lg leading-tight uppercase">Sega Event</span>
            <span className="text-xs tracking-widest text-gray-300 uppercase">India</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium tracking-widest uppercase mt-2">
          <div className="relative flex flex-col items-center">
            <Link href="/" className="text-white hover:text-[#e5b869] transition-colors">Home</Link>
            <div className="absolute -bottom-2 flex flex-col items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#e5b869] mb-0.5"></div>
              <div className="w-8 h-0.5 bg-[#e5b869]"></div>
            </div>
          </div>
          <Link href="#about" className="text-gray-100 hover:text-[#e5b869] transition-colors">About</Link>
          <Link href="#services" className="text-gray-100 hover:text-[#e5b869] transition-colors">Services</Link>
          <Link href="#events" className="text-gray-100 hover:text-[#e5b869] transition-colors">Events</Link>
          <Link href="#contact" className="text-gray-100 hover:text-[#e5b869] transition-colors">Contact</Link>
        </div>

        {/* CTA Button */}
        <button className="hidden md:block px-8 py-3.5 bg-[#e5b869] text-white font-medium text-sm tracking-widest uppercase rounded-full hover:bg-yellow-600 transition-colors">
          Get a Quote
        </button>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <img
            src="/hero-bg.png"
            alt="Hero Content"
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </main>

      {/* Bottom Cards */}
      <div className="relative z-10 w-full px-6 md:px-12 py-16 mt-0">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-[90rem] mx-auto">
          {[
            { title: "Corporate Events", icon: Building2 },
            { title: "Weddings", icon: Heart },
            { title: "Premium Catering", icon: Utensils },
            { title: "Corporate Gifting", icon: Gift },
            { title: "Vending Solutions", icon: Coffee },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              className="group flex flex-col items-center justify-center py-12 px-4 rounded-[1.5rem] border border-white/20 bg-black hover:border-[#e5b869]/60 transition-colors cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full border-2 border-[#e5b869] flex items-center justify-center mb-6 group-hover:bg-[#e5b869]/10 transition-colors">
                <item.icon className="w-6 h-6 text-[#e5b869]" strokeWidth={2} />
              </div>
              <h3 className="text-[#e5b869] font-semibold text-sm text-center tracking-wide">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <section id="about" className="relative z-10 w-full px-6 md:px-12 py-24 max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="/about-us.png"
                alt="About Us Concert"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating About Us badge */}
            <div className="absolute -top-4 right-8 bg-[#1a1122]/90 border border-white/10 rounded-full px-6 py-2.5 flex items-center gap-2 shadow-2xl backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-[#e5b869]"></div>
              <span className="text-[#e5b869] text-sm font-semibold tracking-wider">About Us</span>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col"
          >
            <h2 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.85] tracking-normal uppercase mb-10 text-[#ead5f5] origin-left whitespace-nowrap"
              style={{ transform: "scaleX(0.6)" }}
            >
              CRAFTING<br />
              <span className="text-[#e5b869]">UNFORGETTABLE</span> EVENTS<br />
              WITH PRECISION
            </h2>

            <p className="text-[#dfcdd0] text-base md:text-lg leading-relaxed mb-12 max-w-xl">
              We believe that every event is a story waiting to be told. Our team
              of expert architects and designers work tirelessly to ensure every
              detail reflects your unique essence, blending raw structural
              honesty with premium digital luxury.
            </p>

            <div className="flex flex-col w-full max-w-xl">
              {/* Item 01 */}
              <div className="flex items-center gap-6 py-6 border-b-2 border-white/80">
                <span className="text-[#e5b869] font-semibold text-xl">01</span>
                <span className="font-medium tracking-widest text-sm uppercase text-[#ead5f5]">Visionary Concept Design</span>
              </div>
              
              {/* Item 02 */}
              <div className="flex items-center gap-6 py-6 border-b-2 border-white/80">
                <span className="text-[#e5b869] font-semibold text-xl">02</span>
                <span className="font-medium tracking-widest text-sm uppercase text-[#ead5f5]">End-To-End Production</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight Video Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="relative w-full mt-24 rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl border border-white/10"
        >
          <img
            src="/highlight-video.png"
            alt="Watch Our Highlight Reel 2024"
            className="w-full h-auto block transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>

          {/* Yellow Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#d69f38] flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all duration-300">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4l14 8-14 8z" />
              </svg>
            </div>
          </div>

          {/* Bottom Left Text */}
          <div className="absolute bottom-6 left-8 md:bottom-10 md:left-12">
            <h3 
              className="text-white font-bold text-base md:text-xl tracking-wider uppercase origin-left"
              style={{ transform: "scaleX(0.85)" }}
            >
              WATCH OUR HIGHLIGHT REEL 2024
            </h3>
          </div>
        </motion.div>
      </section>

      {/* Featured Experiences Section */}
      <section id="projects" className="relative z-10 w-full px-6 md:px-12 py-24 max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-[2.75rem] font-medium mb-3 text-white tracking-tight">Featured Experiences</h2>
            <p className="text-gray-300 text-base md:text-lg font-extralight">Signature projects that redefine excellence.</p>
          </div>
          <Link href="#projects" className="flex items-center gap-2 text-white hover:text-[#e5b869] transition-colors font-semibold tracking-wide">
            View All Projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: "/featured-1.png", category: "CORPORATE", title: "Tech Global Summit" },
            { img: "/featured-2.png", category: "LUXURY WEDDINGS", title: "Royal Palace Union" },
            { img: "/featured-3.png", category: "EXHIBITIONS", title: "Auto-Expo Pavilion" },
            { img: "/featured-4.png", category: "AWARDS", title: "Industry Excellence Night" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group relative w-full aspect-[2/3] rounded-[1.5rem] overflow-hidden cursor-pointer shadow-lg"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1105]/95 via-black/40 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-start">
                <span className="bg-[#f2dca5] text-black text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-widest mb-3 shadow-md">
                  {item.category}
                </span>
                <h3 className="text-white text-lg font-medium mb-1 leading-tight">{item.title}</h3>
                <div className="flex items-center gap-2 text-[#d6a54b] text-sm font-medium mt-1 tracking-wide">
                  View Project <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 w-full px-6 md:px-12 py-24 max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e5b869]"></div>
            <span className="text-[#e5b869] font-bold text-sm tracking-widest uppercase">Services</span>
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.85] tracking-tight uppercase text-[#ead5f5] origin-left whitespace-nowrap"
            style={{ transform: "scaleX(0.7)" }}
          >
            SHAPING MOMENTS WITH<br />
            <span className="text-[#e5b869]">MEANING</span>
          </h2>
        </div>

        {/* Service Rows */}
        <div className="flex flex-col gap-5">
          {[
            {
              num: "1",
              title: "CONFERENCE EVENT",
              desc: "Strategic Gatherings Connecting People, Brands, and Ideas For Collaboration.",
              list1: ["VENUE COORDINATION", "TECH SUPPORT"],
              list2: ["SPEAKER MANAGEMENT", "GUEST ENGAGEMENT"]
            },
            {
              num: "2",
              title: "PRIVATE EVENT",
              desc: "Personalized Celebrations Reflecting Your Story, Style, And Unique Personality.",
              list1: ["THEME PLANNING", "CATERING SETUP"],
              list2: ["DECOR STYLING", "PHOTOGRAPHY"]
            },
            {
              num: "3",
              title: "SIGNATURE EVENT",
              desc: "Creative Experiences Designed To Inspire, Engage, And Impress Guests.",
              list1: ["CONCEPT CREATION", "VISUAL DESIGN"],
              list2: ["INTERACTIVE ELEMENTS", "CULINARY EXP"]
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="group flex flex-col lg:flex-row lg:items-center justify-between gap-5 py-6 md:py-10 px-6 md:px-8 rounded-[1.25rem] border border-white/20 bg-transparent hover:bg-white transition-all duration-500 cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              {/* Left: Num & Title */}
              <div className="flex items-center gap-6 lg:w-[30%]">
                <span className="text-gray-500 font-bold text-xs group-hover:text-gray-800 transition-colors duration-500">#{item.num}</span>
                <h3 
                  className="text-[#ead5f5] group-hover:text-black font-bold text-xl md:text-2xl uppercase tracking-normal origin-left transition-colors duration-500 whitespace-nowrap"
                  style={{ transform: "scaleX(0.65)", wordSpacing: "0.15em" }}
                >
                  {item.title}
                </h3>
              </div>

              {/* Middle: Desc */}
              <div className="lg:w-[30%]">
                <p className="text-gray-300 group-hover:text-black font-normal text-sm md:text-base leading-snug transition-colors duration-500">
                  {item.desc}
                </p>
              </div>

              {/* Right: Lists & Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:w-[40%] gap-6">
                <div className="flex gap-4 lg:gap-8">
                  <div className="flex flex-col gap-1 w-[140px] md:w-[160px]">
                    {item.list1.map((li, i) => (
                      <span key={i} className="text-gray-400 group-hover:text-black text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 whitespace-nowrap">
                        • {li}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-1">
                    {item.list2.map((li, i) => (
                      <span key={i} className="text-gray-400 group-hover:text-black text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 whitespace-nowrap">
                        • {li}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Button */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d6a54b] flex items-center justify-center shrink-0 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <ArrowUpRight className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Some Of Our Work Section */}
      <section id="work" className="relative z-10 w-full px-4 md:px-8 py-24 max-w-[100rem] mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold uppercase text-white tracking-tighter mb-4 whitespace-nowrap origin-center" style={{ transform: "scaleX(0.75)" }}>
            SOME OF <span className="text-[#e5b869]">OUR WORK</span>
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl font-light">
            From exhibitions to corporate events, we create impactful experiences that<br className="hidden md:block" /> leave a lasting impression.
          </p>
        </div>

        {/* Top Grid Area */}
        <div className="flex flex-col md:grid md:grid-cols-4 gap-3 md:gap-4 mb-3 md:mb-4">
          
          {/* Left Column (1/4) */}
          <div className="md:col-span-1 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50">
            <img src="/exhibitions-trade-shows.png" alt="Exhibitions & Trade Shows" className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-sm leading-tight pr-4">Exhibitions &<br/>Trade Shows</span>
            </div>
          </div>

          {/* Middle Column (2/4) */}
          <div className="md:col-span-2 flex flex-col gap-3 md:gap-4">
            {/* Upper: 2 items */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 items-start">
              <div className="rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50">
                <img src="/brand-activations.png" alt="Brand Activations" className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <span className="text-white font-bold text-sm leading-tight pr-4">Brand Activations</span>
                </div>
              </div>
              <div className="rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50">
                <img src="/corporate-conferences.png" alt="Corporate Conferences" className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-white font-bold text-sm leading-tight pr-4">Corporate<br/>Conferences</span>
                </div>
              </div>
            </div>
            {/* Lower: 3 items */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
                <img src="/product-launches.png" alt="Product Launches" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 z-20 flex flex-col items-start gap-2 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                    <Lightbulb className="w-3 h-3" />
                  </div>
                  <span className="text-white font-bold text-[10px] md:text-xs leading-tight pr-2">Product Launches</span>
                </div>
              </div>

              <div className="rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
                <img src="/gala-dinners.png" alt="Gala Dinners" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 z-20 flex flex-col items-start gap-2 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                    <Wine className="w-3 h-3" />
                  </div>
                  <span className="text-white font-bold text-[10px] md:text-xs leading-tight pr-2">Gala Dinners</span>
                </div>
              </div>

              <div className="rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
                <img src="/corporate-milestones.png" alt="Corporate Milestones" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 z-20 flex flex-col items-start gap-2 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                    <Bookmark className="w-3 h-3" />
                  </div>
                  <span className="text-white font-bold text-[10px] md:text-xs leading-tight pr-2">Corporate<br/>Milestones</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (1/4) */}
          <div className="md:col-span-1 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50">
            <img src="/exhibitions-kiosks.png" alt="Exhibitions & Kiosks" className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-sm leading-tight pr-4">Exhibitions &<br/>Kiosks</span>
            </div>
          </div>
        </div>

        {/* Bottom Grid Area */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4">
          {/* Box 1 (Matches Top Left) */}
          <div className="col-span-1 md:col-span-3 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
            <img src="/award-ceremonies.png" alt="Award Ceremonies" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                <Star className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-sm md:text-base leading-tight pr-2">Award<br/>Ceremonies</span>
            </div>
          </div>

          {/* Box 2 (Matches 1/3 of Top Middle) */}
          <div className="col-span-1 md:col-span-2 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
            <img src="/seminars-summits.png" alt="Seminars & Summits" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-xs md:text-sm leading-tight pr-2">Seminars &<br/>Summits</span>
            </div>
          </div>

          {/* Box 3 (Matches 1/3 of Top Middle) */}
          <div className="col-span-1 md:col-span-2 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
            <img src="/stage-production.png" alt="Stage & Production" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                <Play className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-xs md:text-sm leading-tight pr-2">Stage &<br/>Production</span>
            </div>
          </div>

          {/* Box 4 (Matches 1/3 of Top Middle) */}
          <div className="col-span-1 md:col-span-2 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
            <img src="/award-functions.png" alt="Award Functions" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                <Trophy className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-xs md:text-sm leading-tight pr-2">Award<br/>Functions</span>
            </div>
          </div>

          {/* Box 5 (Matches Top Right) */}
          <div className="col-span-2 md:col-span-3 rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
            <img src="/music-concerts.png" alt="Music Concerts" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                <Music className="w-4 h-4" />
              </div>
              <span className="text-white font-bold text-sm md:text-base leading-tight pr-2">Music<br/>Concerts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Gallery Section */}
      <section id="gallery" className="relative z-10 w-full px-4 md:px-8 py-24 max-w-[100rem] mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold uppercase text-white tracking-normal mb-4 whitespace-nowrap origin-center" style={{ transform: "scaleX(0.65)", wordSpacing: "0.15em" }}>
            EXPLORE <span className="text-[#e5b869]">OUR GALLERY</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-4xl font-light leading-relaxed">
            Step into a collection of unforgettable celebrations, remarkable experiences, and beautifully crafted
            moments that showcase our passion for creating extraordinary events.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-5">
          {/* Top Row */}
          <div className="col-span-2 rounded-[2rem] relative overflow-hidden shadow-lg h-[300px] md:h-[450px] group cursor-pointer">
            <img src="/gallery-1.png" alt="Gallery Image 1" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
          <div className="col-span-2 rounded-[2rem] relative overflow-hidden shadow-lg h-[300px] md:h-[450px] group cursor-pointer">
            <img src="/gallery-2.png" alt="Gallery Image 2" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>

          {/* Bottom Row */}
          <div className="col-span-1 rounded-[2rem] relative overflow-hidden shadow-lg h-[250px] md:h-[350px] group cursor-pointer">
            <img src="/gallery-3.png" alt="Gallery Image 3" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
          <div className="col-span-1 rounded-[2rem] relative overflow-hidden shadow-lg h-[250px] md:h-[350px] group cursor-pointer">
            <img src="/gallery-4.png" alt="Gallery Image 4" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
          <div className="col-span-2 rounded-[2rem] relative overflow-hidden shadow-lg h-[250px] md:h-[350px] group cursor-pointer">
            <img src="/gallery-5.png" alt="Gallery Image 5" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Featured Projects New Section */}
      <section id="featured-projects-new" className="relative z-10 w-full px-4 md:px-8 py-24 max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e5b869]"></div>
            <span className="text-[#e5b869] font-bold text-xs tracking-[0.2em] uppercase">FEATURED PROJECTS</span>
          </div>
          <h2 
            className="text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[0.9] tracking-[0.05em] uppercase text-[#ead5f5] origin-left whitespace-nowrap"
            style={{ transform: "scaleX(0.55) scaleY(1.3)" }}
          >
            A GLIMPSE INTO THE EVENTS WE'VE BROUGHT TO <span className="text-[#e5b869]">LIFE.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8 md:gap-10">
          {[
            {
              badge: "Conference Event",
              title: "INNOVATE GLOBAL SUMMIT 2026",
              desc: "Curating A Dynamic Platform Connecting Global Innovators, Visionaries, And Industry Leaders In Dubai.",
              date: "Feb 12-14, 2026",
              location: "JW Marriott Marquis, Dubai",
              img: "/innovate-global-summit-2026.png"
            },
            {
              badge: "Private Event",
              title: "TIMELESS MOMENTS ANNIVERSARY GALA",
              desc: "Crafting Unforgettable Luxury Experiences Celebrating Milestones With Elegance And Sophistication in Los Angeles.",
              date: "Jan 24-26, 2026",
              location: "The Ritz-Carlton, Los Angeles",
              img: "/timeless-moments-anniversary-gala.png"
            }
          ].map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row w-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all duration-500">
              {/* Image Side */}
              <div className="md:w-[35%] relative h-[300px] md:h-auto overflow-hidden bg-[#111]">
                {item.img === "/featured-new-1.png" || item.img === "/featured-new-2.png" ? (
                  <div className="w-full h-full animate-pulse bg-white/5"></div>
                ) : (
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                <div className="absolute top-6 left-6">
                  <div className="bg-[#2a2035]/80 backdrop-blur-md border border-white/10 text-[#e5b869] text-[11px] font-bold tracking-wider px-4 py-2 rounded-lg">
                    {item.badge}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-[65%] p-6 md:p-10 md:pl-12 lg:pl-16 flex flex-col justify-center relative">
                {/* Circular Button positioned absolutely top right */}
                <div className="absolute top-10 right-10 hidden lg:flex items-center justify-center w-24 h-24 rounded-full border border-[#e5b869] group-hover:bg-[#e5b869]/10 transition-colors cursor-pointer">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                    <path id={"textPath" + index} fill="none" d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" />
                    <text className="text-[11px] uppercase fill-white font-semibold tracking-widest">
                      <textPath href={"#textPath" + index} startOffset="25%" textAnchor="middle">view details</textPath>
                    </text>
                  </svg>
                  <ArrowUpRight className="text-[#e5b869] w-6 h-6" />
                </div>

                <h3 className="text-xl md:text-2xl lg:text-[1.5rem] xl:text-[1.75rem] font-semibold text-[#ead5f5] uppercase tracking-normal -mt-12 mb-8 w-full whitespace-nowrap overflow-hidden text-ellipsis origin-left" style={{ transform: "scaleY(1.65)" }}>
                  {item.title}
                </h3>
                <p className="text-[#dfcdd0] text-base md:text-lg font-light leading-relaxed max-w-lg mb-20">
                  {item.desc}
                </p>

                {/* Divider */}
                <div className="w-full h-[2px] bg-white/40 mb-8 rounded-full"></div>

                {/* Date and Location */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[#e5b869] text-[10px] md:text-xs font-medium uppercase tracking-widest mb-2">DATE:</h4>
                    <p className="text-white text-sm md:text-base font-light tracking-wide">{item.date}</p>
                  </div>
                  <div>
                    <h4 className="text-[#e5b869] text-[10px] md:text-xs font-medium uppercase tracking-widest mb-2">LOCATION:</h4>
                    <p className="text-white text-sm md:text-base font-light tracking-wide">{item.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 w-full px-4 md:px-8 py-24 max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="relative mb-8 w-full pb-4 md:pb-8">
          <div className="w-full min-w-0 overflow-visible">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#e5b869]"></div>
              <span className="text-[#e5b869] font-bold text-xs tracking-[0.2em] uppercase">TESTIMONIALS</span>
            </div>
            <h2 
              className="text-4xl md:text-5xl lg:text-[4rem] font-bold leading-[0.9] tracking-normal uppercase text-[#ead5f5] origin-left whitespace-normal lg:whitespace-nowrap"
              style={{ transform: "scaleX(0.75)" }}
            >
              STORIES FROM <span className="text-[#e5b869]">THE PEOPLE</span> WE'VE CELEBRATED<br />WITH
            </h2>
          </div>
          
          {/* Nav Buttons */}
          <div className="hidden md:flex absolute bottom-4 right-0 items-center gap-4 z-20">
            <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center hover:border-white/70 hover:bg-white/5 transition-all cursor-pointer group">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/30 flex items-center justify-center hover:border-white/70 hover:bg-white/5 transition-all cursor-pointer group">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              text: "\"They Transformed Our Vision Into An Unforgettable Experience. Every Detail Was Flawless—Guests Still Talk About It Months Later!\"",
              name: "Michael Carter",
              title: "Global CEO, TechNova",
              img: "/testimonial-1.png"
            },
            {
              text: "\"Professional, Creative, And Calm Under Pressure. Our Corporate Event Ran Smoother Than We Imagined—Highly Recommended For Their Team.\"",
              name: "Emily Thompson",
              title: "Director of Communications",
              img: "/testimonial-2.png"
            }
          ].map((item, index) => (
            <div key={index} className="bg-[#050505] border border-white/10 rounded-[1.5rem] p-10 md:p-14 flex flex-col gap-8 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#e5b869] text-[#e5b869]" />
                ))}
              </div>
              <p className="text-[#ead5f5] text-lg md:text-xl font-light italic leading-relaxed">
                {item.text}
              </p>
              <div className="flex items-center gap-4 mt-auto pt-4">
                <div className="w-14 h-14 rounded-full border border-[#e5b869] p-[2px]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#111] flex items-center justify-center">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-white font-bold text-base tracking-wide">{item.name}</span>
                  <span className="text-gray-400 text-xs font-medium tracking-wide">{item.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
