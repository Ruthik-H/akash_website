import React from 'react';

const skills = [
  'CINEMATOGRAPHY',
  'EDITING',
  'COLOR GRADING',
  'PHOTOGRAPHY',
  'STORYTELLING',
];

export default function SkillsStrip() {
  return (
    <div className="relative py-6 bg-[#080808] border-y border-white/[0.08] overflow-hidden">
      {/* Amber lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-10 bg-[#E5601A]/10 blur-[50px] pointer-events-none" />

      {/* Marquee Animation */}
      <div className="flex select-none overflow-hidden">
        <div className="flex shrink-0 items-center gap-8 md:gap-14 animate-marquee py-1 transform-gpu will-change-transform">
          {[...skills, ...skills, ...skills].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-14">
              <span className="font-display text-xs md:text-sm font-bold tracking-[0.35em] text-[#C4C3BE] hover:text-[#E5601A] transition-colors uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="text-[#E5601A] opacity-60 text-xs">&bull;</span>
            </div>
          ))}
        </div>

        {/* Second row for seamless continuous loop */}
        <div className="flex shrink-0 items-center gap-8 md:gap-14 animate-marquee py-1 transform-gpu will-change-transform" aria-hidden="true">
          {[...skills, ...skills, ...skills].map((item, idx) => (
            <div key={`dup-${idx}`} className="flex items-center gap-8 md:gap-14">
              <span className="font-display text-xs md:text-sm font-bold tracking-[0.35em] text-[#C4C3BE] hover:text-[#E5601A] transition-colors uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="text-[#E5601A] opacity-60 text-xs">&bull;</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
