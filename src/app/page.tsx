"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Building2, Heart, Utensils, Gift, Coffee, LayoutGrid, Users, Lightbulb, Wine, Bookmark, Star, GraduationCap, Play, Trophy, Music } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewDirection, setReviewDirection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const reviews = [
    {
      text: "\"They Transformed Our Vision Into An Unforgettable Experience. Every Detail Was Flawless—Guests Still Talk About It Months Later!\"",
      name: "Michael Carter",
      title: "Global CEO, TechNova",
      img: "https://ui-avatars.com/api/?name=Michael+Carter&background=e5b869&color=000"
    },
    {
      text: "\"Professional, Creative, And Calm Under Pressure. Our Corporate Event Ran Smoother Than We Imagined—Highly Recommended For Their Team.\"",
      name: "Emily Thompson",
      title: "Director of Communications",
      img: "https://ui-avatars.com/api/?name=Emily+Thompson&background=e5b869&color=000"
    },
    {
      text: "\"Absolutely stunning execution. The attention to detail in the lighting and stage design left our entire company breathless. A truly premium experience.\"",
      name: "Sarah Jenkins",
      title: "VP of Marketing, InnovateInc",
      img: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=e5b869&color=000"
    },
    {
      text: "\"From conceptualization to the final applause, Saaga Events delivered perfection. Their team feels like an extension of our own. Brilliant work.\"",
      name: "David Chen",
      title: "Founder, Apex Solutions",
      img: "https://ui-avatars.com/api/?name=David+Chen&background=e5b869&color=000"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in view
      const sections = ["home", "about", "services", "events", "contact"];
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check on mount
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30 flex flex-col relative font-sans overflow-x-hidden max-w-[100vw]">
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
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
            <img src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/footer-logo-clean.png.png" alt="Saaga Events Logo" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
          </div>
          
          {/* Vertical Divider */}
          <div className="w-[2px] h-10 bg-white/40 rounded-full"></div>
          
          <div className="flex flex-col">
            <span className="font-medium tracking-widest text-lg leading-tight uppercase">SAAGA EVENTS</span>
            <span className="text-xs tracking-widest text-gray-300 uppercase">India</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium tracking-widest uppercase mt-2">
          {["home", "about", "services", "events", "contact"].map((section) => (
            <div key={section} className="relative flex flex-col items-center">
              <Link 
                href={section === "home" ? "#home" : `#${section}`} 
                className={`${activeSection === section ? "text-[#d5a84e]" : "text-gray-400 hover:text-[#e5b869]"} transition-colors duration-300`}
              >
                {section}
              </Link>
              {activeSection === section && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute -bottom-2 flex flex-col items-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e5b869] mb-0.5"></div>
                  <div className="w-8 h-0.5 bg-[#e5b869]"></div>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block px-8 py-3.5 bg-[#d5a84e] hover:bg-[#c29841] text-black font-bold text-sm tracking-widest uppercase rounded-full transition-all hover:scale-105 shadow-[0_4px_14px_rgba(213,168,78,0.3)]">
            Get a Quote
          </button>
          
          {/* Hamburger Menu Icon */}
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 pb-10 px-6 lg:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {["home", "about", "services", "events", "contact"].map((section) => (
                <Link 
                  key={section}
                  href={section === "home" ? "#home" : `#${section}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-medium tracking-widest uppercase ${activeSection === section ? "text-[#d5a84e]" : "text-white hover:text-[#e5b869]"} transition-colors`}
                >
                  {section}
                </Link>
              ))}
              <button className="mt-8 px-8 py-4 bg-[#d5a84e] text-black font-bold text-lg tracking-widest uppercase rounded-full w-full max-w-xs">
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content */}
      <main id="home" className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full relative h-[70vh] md:h-[85vh] lg:h-screen min-h-[500px]"
        >
          <img
            src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/hero-image-new.jpeg.jpg"
            alt="Hero Content"
            className="w-full h-full object-cover"
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end px-4 text-center pb-24 md:pb-32">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-[4.5rem] font-medium tracking-wide leading-[1.2] md:leading-[1.1] mb-6 drop-shadow-2xl" style={{ fontFamily: "var(--font-playfair)" }}>
              <span className="text-[#ead5f5]">WE DON'T JUST PLAN </span>
              <span className="text-[#d5a84e]">EVENTS</span><br />
              <span className="text-[#d5a84e]">WE CREATE EXPERIENCES</span>
            </h1>
            
            <p className="text-white text-xs md:text-sm lg:text-base max-w-2xl mb-10 font-normal tracking-wide leading-relaxed drop-shadow-md">
              Saaga Events delivers end-to-end solutions in Events, Catering, <br className="hidden md:block" />
              Gifting and Beverage Services that create impact and leave lasting impressions.
            </p>
            
            <button className="bg-[#d5a84e] hover:bg-[#c29841] text-black font-bold text-[10px] md:text-xs tracking-[0.15em] uppercase px-6 md:px-7 py-3.5 md:py-4 rounded-full flex items-center gap-2 transition-transform hover:scale-105 shadow-[0_4px_14px_rgba(213,168,78,0.3)]">
              PLAN YOUR EVENT 
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
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
              className={`group flex flex-col items-center justify-center py-12 px-4 rounded-[1.5rem] border border-white/20 bg-black hover:border-[#e5b869]/60 transition-colors cursor-pointer ${
                index === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
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
                src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/about-us.png.png"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] md:leading-[0.85] tracking-normal uppercase mb-10 text-[#ead5f5]"
              
            >
              CRAFTING{" "}
              <br className="hidden md:block" />
              <span className="text-[#e5b869]">UNFORGETTABLE</span>{" "}
              <br className="md:hidden"/> 
              EVENTS{" "}
              <br className="hidden md:block" />
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
            src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/highlight-video.png.png"
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
            <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold uppercase text-white tracking-tighter mb-4">
              FEATURED <span className="text-[#e5b869]">EXPERIENCES</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-extralight">Signature projects that redefine excellence.</p>
          </div>
          <Link href="#projects" className="flex items-center gap-2 text-white hover:text-[#e5b869] transition-colors font-semibold tracking-wide">
            View All Projects <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/featured-1.png.png", category: "CORPORATE", title: "Tech Global Summit" },
            { img: "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/featured-2.png.png", category: "LUXURY WEDDINGS", title: "Royal Palace Union" },
            { img: "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/featured-3.png.png", category: "EXHIBITIONS", title: "Auto-Expo Pavilion" },
            { img: "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/featured-4.png.png", category: "AWARDS", title: "Industry Excellence Night" }
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
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.2] md:leading-[0.85] tracking-tight uppercase text-[#ead5f5]"
            
          >
            SHAPING MOMENTS WITH<br className="hidden md:block" />
            <span className="text-[#e5b869]"> MEANING</span>
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
      <section id="events" className="relative z-10 w-full px-4 md:px-8 py-24 max-w-[100rem] mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold uppercase text-white tracking-tighter mb-4 ">
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
            <img src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/exhibitions-trade-shows.png.png" alt="Exhibitions & Trade Shows" className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
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
                <img src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/brand-activations.png.png" alt="Brand Activations" className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-3 pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <span className="text-white font-bold text-sm leading-tight pr-4">Brand Activations</span>
                </div>
              </div>
              <div className="rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50">
                <img src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/corporate-conferences.png.png" alt="Corporate Conferences" className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
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
                <img src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/product-launches.png.png" alt="Product Launches" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 z-20 flex flex-col items-start gap-2 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                    <Lightbulb className="w-3 h-3" />
                  </div>
                  <span className="text-white font-bold text-[10px] md:text-xs leading-tight pr-2">Product Launches</span>
                </div>
              </div>

              <div className="rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
                <img src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/gala-dinners.png.png" alt="Gala Dinners" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-3 left-3 z-20 flex flex-col items-start gap-2 pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-black shadow-lg">
                    <Wine className="w-3 h-3" />
                  </div>
                  <span className="text-white font-bold text-[10px] md:text-xs leading-tight pr-2">Gala Dinners</span>
                </div>
              </div>

              <div className="rounded-[2rem] relative overflow-hidden group cursor-pointer shadow-lg bg-black/50 flex">
                <img src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/corporate-milestones.png.png" alt="Corporate Milestones" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
            <img src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/exhibitions-kiosks.png.png" alt="Exhibitions & Kiosks" className="block w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
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
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/award-ceremonies.png.png" alt="Award Ceremonies" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/seminars-summits.png.png" alt="Seminars & Summits" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/stage-production.png.png" alt="Stage & Production" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/award-functions.png.png" alt="Award Functions" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/music-concerts.png.png" alt="Music Concerts" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
          <h2 className="text-3xl md:text-5xl lg:text-5xl font-bold uppercase text-white tracking-normal mb-4 md:[word-spacing:0.15em]" >
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
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/gallery-1.png.png" alt="Gallery Image 1" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
          <div className="col-span-2 rounded-[2rem] relative overflow-hidden shadow-lg h-[300px] md:h-[450px] group cursor-pointer">
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/gallery-2.png.png" alt="Gallery Image 2" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>

          {/* Bottom Row */}
          <div className="col-span-1 rounded-[2rem] relative overflow-hidden shadow-lg h-[250px] md:h-[350px] group cursor-pointer">
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/gallery-3.png.png" alt="Gallery Image 3" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
          <div className="col-span-1 rounded-[2rem] relative overflow-hidden shadow-lg h-[250px] md:h-[350px] group cursor-pointer">
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/gallery-4.png.png" alt="Gallery Image 4" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          </div>
          <div className="col-span-2 rounded-[2rem] relative overflow-hidden shadow-lg h-[250px] md:h-[350px] group cursor-pointer">
            <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/gallery-5.png.png" alt="Gallery Image 5" className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
            className="text-3xl md:text-5xl lg:text-5xl font-bold leading-[1.2] md:leading-[0.9] tracking-[0.05em] uppercase text-[#ead5f5]"
            
          >
            A GLIMPSE INTO THE EVENTS <br className="md:hidden" /> WE'VE BROUGHT TO <span className="text-[#e5b869]">LIFE.</span>
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
              img: "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/innovate-global-summit-2026.png.png"
            },
            {
              badge: "Private Event",
              title: "TIMELESS MOMENTS ANNIVERSARY GALA",
              desc: "Crafting Unforgettable Luxury Experiences Celebrating Milestones With Elegance And Sophistication in Los Angeles.",
              date: "Jan 24-26, 2026",
              location: "The Ritz-Carlton, Los Angeles",
              img: "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/timeless-moments-anniversary-gala.png.png"
            }
          ].map((item, index) => (
            <div key={index} className="flex flex-col md:flex-row w-full bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all duration-500">
              {/* Image Side */}
              <div className="md:w-[35%] relative h-[300px] md:h-auto overflow-hidden bg-[#111]">
                {item.img === "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/featured-new-1.png.png" || item.img === "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/featured-new-2.png.png" ? (
                  <div className="w-full h-full animate-pulse bg-white/5"></div>
                ) : (
                  <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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

                <h3 className="text-xl md:text-2xl lg:text-[1.5rem] xl:text-[1.75rem] font-semibold text-[#ead5f5] uppercase tracking-normal mt-4 lg:-mt-12 mb-4 lg:mb-8 w-full overflow-hidden text-ellipsis lg:[transform:scaleY(1.65)]" style={{ transform: "scaleY(1)" }}>
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
              className="text-3xl md:text-5xl lg:text-5xl font-bold leading-[1.2] md:leading-[0.9] tracking-normal uppercase text-[#ead5f5]"
              
            >
              STORIES FROM <span className="text-[#e5b869]">THE PEOPLE</span> <br className="md:hidden" /> WE'VE CELEBRATED<br className="hidden md:block" />WITH
            </h2>
          </div>
          
          {/* Nav Buttons */}
          <div className="hidden md:flex absolute bottom-4 right-0 items-center gap-4 z-20">
            <button 
              onClick={() => {
                setReviewDirection(-1);
                setReviewIndex(Math.max(0, reviewIndex - 1));
              }}
              disabled={reviewIndex === 0}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all cursor-pointer group ${reviewIndex === 0 ? 'border-white/10 opacity-50 cursor-not-allowed' : 'border-white/30 hover:border-[#e5b869] hover:bg-[#e5b869]/10'}`}
            >
              <svg className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${reviewIndex === 0 ? 'text-white/30' : 'text-white/70 group-hover:text-[#e5b869]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => {
                setReviewDirection(1);
                setReviewIndex(Math.min(reviews.length - 2, reviewIndex + 1));
              }}
              disabled={reviewIndex >= reviews.length - 2}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all cursor-pointer group ${reviewIndex >= reviews.length - 2 ? 'border-white/10 opacity-50 cursor-not-allowed' : 'border-[#e5b869] bg-[#e5b869]/10 hover:bg-[#e5b869]/20 shadow-[0_0_15px_rgba(229,184,105,0.3)]'}`}
            >
              <svg className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${reviewIndex >= reviews.length - 2 ? 'text-white/30' : 'text-[#e5b869]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={reviewIndex}
            initial={{ opacity: 0, x: reviewDirection > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reviewDirection > 0 ? -40 : 40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Show 2 reviews, but hide the second one on mobile via CSS */}
            {reviews.slice(reviewIndex, reviewIndex + 2).map((item, index) => (
              <div 
                key={index}
                className={`bg-[#050505] border border-white/10 rounded-[1.5rem] p-10 md:p-14 flex-col gap-8 hover:border-white/20 transition-colors h-full ${index === 1 ? 'hidden md:flex' : 'flex'}`}
              >
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
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Blog Section */}
      <section id="blog" className="relative z-10 w-full px-4 md:px-8 py-24 max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 w-full">
          <div className="flex-1 min-w-0 overflow-visible">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#e5b869]"></div>
              <span className="text-[#e5b869] font-bold text-xs tracking-[0.2em] uppercase">BLOG</span>
            </div>
            <h2 
              className="text-3xl md:text-5xl lg:text-5xl font-bold leading-[1.2] md:leading-[0.9] tracking-normal uppercase text-[#ead5f5]"
              
            >
              INSIGHTS AND IDEAS FROM OUR EVENT
            </h2>
          </div>
          
          {/* Button */}
          <div className="flex items-center gap-4 shrink-0 pb-2">
            <button className="bg-[#2d1b36] hover:bg-[#3d244a] border border-white/5 text-[#ead5f5] px-8 py-4 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer">
              VIEW MORE
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "CREATIVE EVENT THEMES THAT WILL TRULY WOW YOUR GUESTS.",
              date: "NOV 20, 2024",
              img: "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/creative-events-themes-1.png.png"
            },
            {
              title: "10 CREATIVE WEDDING THEMES TO MAKE YOUR BIG DAY UNFORGETTABLE.",
              date: "NOV 18, 2024",
              img: "https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/10-creative-weddings.png.png"
            }
          ].map((item, index) => (
            <div key={index} className="flex flex-col gap-6 group cursor-pointer">
              {/* Image Container */}
              <div className="w-full aspect-[16/10] md:h-[320px] rounded-[1.5rem] overflow-hidden border border-white/20 relative">
                <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                  <motion.img initial={{ opacity: 0, filter: 'blur(10px)' }} whileInView={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }} src={item.img} alt={item.title} className="w-full h-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex flex-col gap-4 px-2 w-full overflow-hidden">
                <h3 className="text-sm md:text-base lg:text-lg font-bold text-[#ead5f5] uppercase leading-snug tracking-[0.02em] [word-spacing:0.1em] transition-colors md:overflow-hidden md:text-ellipsis w-full" >
                  {item.title}
                </h3>
                <div className="flex items-center gap-4 text-xs font-semibold tracking-widest uppercase mt-2">
                  <span className="text-[#dfcdd0]">{item.date}</span>
                  <span className="text-[#e5b869]">•</span>
                  <div className="flex items-center gap-2 text-[#e5b869] group-hover:translate-x-2 transition-transform">
                    <span>READ MORE</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 w-full px-4 md:px-8 py-24 max-w-[90rem] mx-auto">
        <div className="w-full bg-[#111111] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 lg:p-24 flex flex-col lg:flex-row gap-16 lg:gap-24 justify-between items-center relative overflow-hidden">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-between w-full h-full lg:min-h-[600px]">
            {/* Big Headline */}
            <div className="flex flex-col gap-8 font-light text-2xl md:text-3xl lg:text-4xl tracking-wide">
              <div className="text-white">LET'S MAKE</div>
              <div className="flex items-center gap-4">
                <span className="text-white">YOUR</span>
                <span className="text-[#e5b869]">NEXT</span>
              </div>
              <div className="text-[#e5b869]">EVENT</div>
              <div className="text-white">UNFORGETTABLE.</div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-8 mt-16 lg:mt-auto lg:mb-24">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#c59232] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#c59232]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-[9px] md:text-[10px] tracking-[0.2em] uppercase">CALL US</span>
                  <span className="text-white font-bold text-sm md:text-base tracking-wider">+1 (234) 567-890</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#c59232] flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#c59232]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-400 text-[9px] md:text-[10px] tracking-[0.2em] uppercase">EMAIL US</span>
                  <span className="text-white font-bold text-sm md:text-base tracking-wider">hello@evonte.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Box */}
          <div className="w-full lg:w-[500px] xl:w-[600px] bg-[#050505] rounded-[2rem] p-10 md:p-14 flex flex-col shrink-0">
            <div className="w-[90%] mx-auto flex flex-col gap-10">
              <h3 className="text-[#e5b869] font-medium text-2xl md:text-3xl leading-snug uppercase tracking-wide max-w-sm">
                MESSAGE US TO PLAN YOUR EVENT.
              </h3>

              <form className="flex flex-col gap-6 w-full">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-6 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c59232] transition-colors"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-6 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c59232] transition-colors"
              />
              <textarea 
                placeholder="Your Message Here..." 
                rows={4}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-6 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c59232] transition-colors resize-none"
              ></textarea>
              
              <button 
                type="button" 
                className="w-full bg-[#c59232] hover:bg-[#a67a28] text-black font-bold text-sm uppercase tracking-[0.2em] py-5 rounded-xl transition-all shadow-[0_0_30px_rgba(197,146,50,0.15)] hover:shadow-[0_0_40px_rgba(197,146,50,0.3)] mt-4"
              >
                SEND MESSAGE
              </button>
            </form>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-[#d5a84e] pt-24 pb-12 px-4 md:px-8 lg:px-16 flex flex-col items-center relative z-10">
        
        {/* Logo */}
        <div className="w-64 md:w-[22rem] flex items-center justify-center mb-24">
          <img src="https://res.cloudinary.com/dzpb0jlz0/image/upload/f_auto,q_auto/footer-logo-clean.png.png" alt="Saaga Events" className="w-full h-auto object-contain mix-blend-multiply" onError={(e) => e.currentTarget.style.display = 'none'} />
        </div>

        {/* Divider */}
        <div className="w-full max-w-[90rem] h-px bg-black mb-8"></div>

        {/* Footer Bottom Bar */}
        <div className="w-full max-w-[90rem] flex flex-col md:flex-row gap-10 justify-between items-center text-black font-bold text-[10px] md:text-[11px] tracking-widest uppercase">
          
          {/* Copyright */}
          <div>
            © 2024 SAGA EVENT. ALL RIGHTS RESERVED.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="#" className="hover:text-black/70 transition-colors">HOME</Link>
            <Link href="#" className="hover:text-black/70 transition-colors">ABOUT</Link>
            <Link href="#" className="hover:text-black/70 transition-colors">SERVICES</Link>
            <Link href="#" className="hover:text-black/70 transition-colors">PRIVACY</Link>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#d5a84e] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#d5a84e] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-[#d5a84e] transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12.713l11.985-9.713h-23.97l11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/></svg>
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
