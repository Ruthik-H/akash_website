import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Clapperboard, Scissors, Palette, Camera, FastForward, Play } from 'lucide-react';
import CameraCanvas3D from './CameraCanvas3D';
import InstagramIcon from './InstagramIcon';
import { siteConfig } from '../config';

export default function Hero() {
  const [introStep, setIntroStep] = useState(0); // 0: intro active, 1: hero revealed

  const handleSkipIntro = () => {
    setIntroStep(1);
  };

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 md:py-0 overflow-hidden bg-[#060606]">
      {/* 1. Real 3D Cinema Camera Studio Canvas (Jelly-Smooth 60fps) */}
      <CameraCanvas3D onIntroComplete={() => setIntroStep(1)} />

      {/* Cinematic optical lens flare background (Hardware-accelerated) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[950px] h-[250px] md:h-[380px] bg-gradient-to-r from-[#E5601A]/15 via-[#C85210]/10 to-transparent rounded-full blur-[70px] pointer-events-none transform-gpu" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#060606]/40 to-[#060606] pointer-events-none" />

      {/* Viewfinder corner guides */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-12 left-12 w-6 h-6 border-t-2 border-l-2 border-[#E5601A]" />
        <div className="absolute top-12 right-12 w-6 h-6 border-t-2 border-r-2 border-[#E5601A]" />
        <div className="absolute bottom-12 left-12 w-6 h-6 border-b-2 border-l-2 border-[#E5601A]" />
        <div className="absolute bottom-12 right-12 w-6 h-6 border-b-2 border-r-2 border-[#E5601A]" />
      </div>

      {/* Quick Skip Intro Button */}
      {introStep === 0 && (
        <button
          onClick={handleSkipIntro}
          className="absolute top-24 right-6 md:right-12 z-30 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-[11px] font-mono tracking-wider uppercase text-[#A1A19E] hover:text-[#F3F2EE] transition-all backdrop-blur-md cursor-pointer"
        >
          <span>Skip Intro</span>
          <FastForward size={12} className="text-[#E5601A]" />
        </button>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <AnimatePresence mode="wait">
          
          {/* ========================================================
              3D CINEMA INTRO (Ultra-Smooth 2.2s Camera Sweep)
             ======================================================== */}
          {introStep === 0 ? (
            <motion.div
              key="intro-motion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center pointer-events-none px-4"
            >
              {/* Studio Clapperboard Label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-md mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-mono tracking-widest text-[#E5601A] font-bold uppercase">
                  CINEMA CAMERA IN MOTION &bull; 4K RAW
                </span>
              </motion.div>

              {/* Studio Title Teaser */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl sm:text-6xl font-black uppercase tracking-wider text-[#F3F2EE] drop-shadow-2xl"
              >
                AKASH FILMS
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.2 }}
                className="text-xs sm:text-sm font-light text-[#A1A19E] tracking-[0.3em] uppercase mt-2 font-mono"
              >
                EVERY FRAME HAS A STORY
              </motion.p>
            </motion.div>
          ) : (

            /* ========================================================
               PHASE 3 & 4: DRAMATIC HERO REVEAL (100% MOBILE COMPATIBLE)
             ======================================================== */
            <motion.div
              key="hero-reveal"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Left Column: Typography & CTAs (col-span-7) */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left max-w-xl">
                {/* Brand Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md w-fit mb-4 shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-[#E5601A] animate-ping" />
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[#D8D6D0]">
                    AKASH FILMS &bull; DIRECTOR &bull; COLORIST
                  </span>
                </div>

                {/* Name: AKASH GOWDA with responsive mobile text sizes */}
                <h1 className="font-display text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black uppercase tracking-tight text-[#F3F2EE] leading-[0.94] mb-3 drop-shadow-2xl">
                  AKASH <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3F2EE] via-[#E8E6DF] to-[#E5601A]">
                    GOWDA
                  </span>
                </h1>

                {/* Sub-Brand label */}
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E5601A] mb-3">
                  AKASH FILMS
                </p>

                {/* Exact Tagline requested */}
                <p className="text-sm sm:text-base md:text-lg text-[#A9A9A4] font-light max-w-lg leading-relaxed mb-6 tracking-wide">
                  "Filmmaker. Visual Storyteller. Creator of Cinematic Experiences."
                </p>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 mb-8">
                  <a
                    href="#work"
                    onClick={handleScrollToWork}
                    className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E5601A] to-[#F26E29] hover:from-[#F26E29] hover:to-[#E5601A] text-white font-semibold text-xs md:text-sm tracking-widest uppercase transition-all shadow-xl shadow-[#E5601A]/25 hover:shadow-[#E5601A]/40 hover:scale-[1.02] cursor-pointer"
                  >
                    <span>EXPLORE THE WORK</span>
                    <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                  </a>

                  <a
                    href={siteConfig.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 hover:border-[#E5601A]/50 bg-white/[0.03] hover:bg-white/[0.08] text-[#F3F2EE] font-medium text-xs md:text-sm tracking-wider uppercase transition-all backdrop-blur-sm"
                  >
                    <InstagramIcon size={15} className="text-[#E5601A]" />
                    <span>{siteConfig.instagram.handle}</span>
                  </a>
                </div>

                {/* Technical Specs Strip */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center gap-6 md:gap-10 text-[#82827D] text-[11px] sm:text-xs uppercase tracking-widest">
                  <div>
                    <span className="text-[#F3F2EE] font-bold block text-xs sm:text-sm tracking-wider">Cinematography</span>
                    <span>Visual Storyteller</span>
                  </div>
                  <div className="w-px h-7 bg-white/[0.1]" />
                  <div>
                    <span className="text-[#F3F2EE] font-bold block text-xs sm:text-sm tracking-wider">Color Grade</span>
                    <span>Tone &amp; Lighting</span>
                  </div>
                  <div className="w-px h-7 bg-white/[0.1] hidden sm:block" />
                  <div className="hidden sm:block">
                    <span className="text-[#E5601A] font-bold block text-xs sm:text-sm tracking-wider">12+ Reels</span>
                    <span>Live Showcase</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Akash's Portrait — Sized for mobile and desktop */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[360px] aspect-[9/14] rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-[#E5601A]/35 shadow-2xl shadow-black group">
                  <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-[#101010]">
                    <img
                      src={siteConfig.heroPortrait}
                      alt="Akash Gowda"
                      className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-[0.98] transition-transform duration-700 group-hover:scale-105"
                      decoding="async"
                      fetchPriority="high"
                    />

                    {/* Subtle cinema vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-black/25 opacity-85 pointer-events-none" />

                    {/* Live REC Indicator */}
                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[9px] font-mono tracking-widest text-[#E5601A] font-bold">REC &bull; 4K</span>
                    </div>

                    {/* Floating Instagram Tag Icon */}
                    <a
                      href={siteConfig.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 hover:bg-[#E5601A] text-white backdrop-blur-md border border-white/10 transition-colors"
                      aria-label="View on Instagram"
                    >
                      <InstagramIcon size={13} />
                    </a>

                    {/* Bottom Credential Bar */}
                    <div className="absolute bottom-3.5 inset-x-3.5 p-3 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-[#E5601A] font-bold mb-0.5">
                          {siteConfig.brand}
                        </p>
                        <p className="text-xs sm:text-sm text-[#F3F2EE] font-semibold tracking-wide">
                          Akash Gowda
                        </p>
                        <p className="text-[10px] text-[#A1A19E]">
                          {siteConfig.instagram.handle}
                        </p>
                      </div>

                      <a
                        href={siteConfig.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-full bg-[#E5601A]/20 hover:bg-[#E5601A] text-[#E5601A] hover:text-white text-[10px] sm:text-[11px] font-semibold tracking-wider transition-all border border-[#E5601A]/40"
                      >
                        Follow
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#9E9E9A]">EXPLORE THE WORK</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#E5601A] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
