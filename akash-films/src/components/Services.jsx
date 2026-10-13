import React from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, Scissors, Palette, Camera, Compass, Share2, Film, SlidersHorizontal } from 'lucide-react';

const servicesList = [
  {
    num: '01',
    title: 'Cinematography & Videography',
    description: 'Capturing compelling footage through composition, lighting, movement, and visual storytelling.',
    icon: Clapperboard,
  },
  {
    num: '02',
    title: 'Professional Video Editing',
    description: 'Shaping raw footage into engaging stories through pacing, transitions, sound, and rhythm.',
    icon: Scissors,
  },
  {
    num: '03',
    title: 'Cinematic Color Grading',
    description: 'Developing the mood and visual identity of footage through color, contrast, skin tones, and tonal balance.',
    icon: Palette,
  },
  {
    num: '04',
    title: 'Photography',
    description: 'Capturing expressive portraits, creative compositions, events, and visual moments.',
    icon: Camera,
  },
  {
    num: '05',
    title: 'Creative Direction',
    description: 'Developing visual concepts, shot ideas, mood boards, and creative approaches for projects.',
    icon: Compass,
  },
  {
    num: '06',
    title: 'Social Media Content',
    description: 'Creating engaging reels, short-form videos, promotional edits, and visually compelling digital content.',
    icon: Share2,
  },
  {
    num: '07',
    title: 'Film & Brand Production',
    description: 'Helping shape visual content for personal projects, brands, events, and promotional campaigns.',
    icon: Film,
  },
  {
    num: '08',
    title: 'Post-Production & Visual Finishing',
    description: 'Refining footage through color correction, finishing, sound synchronization, and final export preparation.',
    icon: SlidersHorizontal,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#060606] relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5601A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#E5601A] font-semibold">
                EXPERTISE &amp; SERVICES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F3F2EE]">
              WHAT I BRING TO THE FRAME
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#8E8E8A] max-w-sm font-light">
            Comprehensive creative production from camera capture to final master delivery.
          </p>
        </div>

        {/* 8 Services Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group relative p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.08] hover:border-[#E5601A]/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono tracking-widest text-[#E5601A] font-bold">
                      {service.num}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-white/[0.04] group-hover:bg-[#E5601A]/20 flex items-center justify-center text-[#A1A19E] group-hover:text-[#E5601A] transition-colors">
                      <Icon size={16} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-[#F3F2EE] group-hover:text-[#E5601A] transition-colors mb-2.5 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#8E8E8A] font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Subtle indicator bar */}
                <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 group-hover:text-[#E5601A] transition-colors">
                    CINEMA SPEC
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#E5601A] transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
