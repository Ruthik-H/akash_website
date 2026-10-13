import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Play, Film } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { siteConfig } from '../config';

export default function SelectedWork() {
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'FASHION', 'AUTOMOTIVE', 'NATURE & TRAVEL'];

  const filteredReels = siteConfig.reels.filter((reel) => {
    if (filter === 'ALL') return true;
    if (filter === 'FASHION') return reel.category === 'FASHION' || reel.category === 'LIFESTYLE';
    if (filter === 'AUTOMOTIVE') return reel.category === 'AUTOMOTIVE' || reel.category === 'COMMERCIAL' || reel.category === 'MONOCHROME';
    if (filter === 'NATURE & TRAVEL') return reel.category === 'NATURE' || reel.category === 'TRAVEL REEL' || reel.category === 'EXPEDITION' || reel.category === 'CINEMATOGRAPHY' || reel.category === 'STORYTELLING' || reel.category === 'MOOD & TONE' || reel.category === 'PHOTOGRAPHY';
    return true;
  });

  return (
    <section id="work" className="py-28 md:py-36 bg-[#080808] relative">
      {/* Decorative top border line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E5601A]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5601A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#E5601A] font-semibold">
                CURATED FROM {siteConfig.instagram.handle}
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F3F2EE]">
              MY WORLD, FRAME BY FRAME
            </h2>
            <p className="text-sm md:text-base text-[#A1A19E] font-light mt-2 max-w-lg">
              Films, colors, moments, and stories captured through my lens.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-[#8E8E8A] text-xs md:text-sm max-w-xs font-light">
              Tap any frame to watch original audio, cuts &amp; behind-the-scenes on Instagram.
            </p>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-[#E5601A]/15 border border-white/10 hover:border-[#E5601A]/50 text-xs text-[#F3F2EE] hover:text-[#E5601A] transition-all shrink-0"
            >
              <InstagramIcon size={14} className="text-[#E5601A]" />
              <span>Open Profile</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                filter === cat
                  ? 'bg-[#E5601A] text-white shadow-lg shadow-[#E5601A]/20'
                  : 'bg-white/[0.03] hover:bg-white/[0.08] text-[#9A9A96] hover:text-[#F3F2EE] border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Compact Reel Grid — 4 columns on desktop, 3 on tablet, 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredReels.map((reel) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="group relative"
              >
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#121212] border border-white/[0.08] hover:border-[#E5601A]/60 shadow-lg shadow-black/60 transition-all duration-300 group-hover:-translate-y-1 transform-gpu"
                >
                  {/* Compact High-Density Reel Image */}
                  <img
                    src={reel.image}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter contrast-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Clean subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent group-hover:from-black/70 transition-colors" />

                  {/* Top Reel Tag badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#E5601A]">
                      {reel.category}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:bg-[#E5601A] group-hover:text-white transition-colors">
                      <Play size={10} fill="currentColor" />
                    </div>
                  </div>

                  {/* Bottom title & Instagram prompt */}
                  <div className="absolute bottom-3 inset-x-3 flex items-end justify-between">
                    <div className="min-w-0 pr-1">
                      <p className="text-[9px] tracking-wider uppercase text-[#A1A19E] mb-0.5 font-mono truncate">
                        REEL #{reel.id}
                      </p>
                      <h3 className="font-display text-xs sm:text-sm font-bold text-[#F3F2EE] group-hover:text-[#E5601A] transition-colors leading-tight line-clamp-1">
                        {reel.title}
                      </h3>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#E5601A] text-white flex items-center justify-center transition-all group-hover:rotate-45 shrink-0">
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Big Instagram Banner below works */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#E5601A]/15 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5601A] font-bold block mb-2">
              MORE ON INSTAGRAM
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#F3F2EE] mb-2">
              Follow {siteConfig.instagram.handle} for Daily Cuts &amp; BTS
            </h3>
            <p className="text-sm text-[#9A9A96] font-light max-w-lg">
              Check out original high-bitrate color grades, camera rigs, drone views, and director’s cuts updated weekly.
            </p>
          </div>

          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E5601A] hover:bg-[#F26E29] text-white font-semibold text-xs md:text-sm tracking-widest uppercase transition-all shadow-xl shadow-[#E5601A]/20 hover:shadow-[#E5601A]/40 shrink-0"
          >
            <InstagramIcon size={18} />
            <span>Visit @aakufilmss_</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
