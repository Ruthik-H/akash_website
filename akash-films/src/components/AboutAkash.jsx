import React from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, Sparkles, Sliders, MapPin } from 'lucide-react';
import { siteConfig } from '../config';

export default function AboutAkash() {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-28 bg-[#090909] relative overflow-hidden border-t border-white/[0.06]">
      {/* Subtle atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-80 bg-[#E5601A]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="text-left"
        >
          {/* Header pill */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5601A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5601A] font-semibold">
              ABOUT AKASH GOWDA
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F3F2EE] mb-6 sm:mb-8">
            BEHIND THE LENS
          </h2>

          {/* Editorial Introduction */}
          <div className="space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg text-[#B0AEA9] font-light leading-relaxed">
            <p>
              I'm <span className="text-[#F3F2EE] font-semibold">Akash Gowda</span>, a passionate videographer, filmmaker, video editor, photographer, and colorist. I love turning ordinary moments into powerful visual stories through thoughtful cinematography, creative editing, and cinematic color grading.
            </p>
            <p>
              From capturing a moment through the lens to shaping its final look in post-production, I enjoy every stage of the creative process. My goal is to create visuals that do more than look beautiful — they should make people feel something.
            </p>
          </div>

          {/* Clean Pillars Card Bar without photo */}
          <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E5601A]/40 transition-colors">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#E5601A]/20 flex items-center justify-center text-[#E5601A]">
                  <Clapperboard size={14} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5601A] font-bold">DISCIPLINE</span>
              </div>
              <p className="text-sm font-semibold text-[#F3F2EE]">Cinematography</p>
              <p className="text-xs text-[#8E8E8A] mt-0.5">Motion, Framing &amp; Lighting</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E5601A]/40 transition-colors">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#E5601A]/20 flex items-center justify-center text-[#E5601A]">
                  <Sliders size={14} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5601A] font-bold">POST-CRAFT</span>
              </div>
              <p className="text-sm font-semibold text-[#F3F2EE]">Color Grading &amp; Editing</p>
              <p className="text-xs text-[#8E8E8A] mt-0.5">DaVinci Resolve &amp; Sound Rhythm</p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#E5601A]/40 transition-colors">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#E5601A]/20 flex items-center justify-center text-[#E5601A]">
                  <MapPin size={14} />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5601A] font-bold">LOCATION</span>
              </div>
              <p className="text-sm font-semibold text-[#F3F2EE]">Based in India</p>
              <p className="text-xs text-[#8E8E8A] mt-0.5">Available for Worldwide Projects</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
