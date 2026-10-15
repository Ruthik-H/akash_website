import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { siteConfig } from '../config';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080808]/90 backdrop-blur-md py-3 sm:py-4 border-b border-white/[0.06] shadow-2xl'
          : 'bg-transparent py-4 sm:py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-sm md:text-base font-bold text-[#F3F2EE] transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#E5601A] transition-transform group-hover:scale-125" />
          <span className="flex items-baseline gap-1.5">
            <span className="font-editorial italic font-normal text-lg sm:text-xl tracking-normal text-[#F3F2EE] group-hover:text-[#E5601A] transition-colors">
              Aaku
            </span>
            <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.22em] text-[#E5601A] font-bold uppercase">
              Films
            </span>
          </span>
        </a>

        {/* Navigation Items */}
        <nav className="flex items-center gap-5 md:gap-8">
          <a
            href="#about"
            className="text-xs uppercase tracking-[0.2em] text-[#A1A19E] hover:text-[#F3F2EE] transition-colors hidden md:inline-block"
          >
            About
          </a>
          <a
            href="#services"
            className="text-xs uppercase tracking-[0.2em] text-[#A1A19E] hover:text-[#F3F2EE] transition-colors hidden lg:inline-block"
          >
            Services
          </a>
          <a
            href="#work"
            className="text-xs uppercase tracking-[0.2em] text-[#A1A19E] hover:text-[#F3F2EE] transition-colors"
          >
            Work
          </a>
          <a
            href="#contact"
            className="text-xs uppercase tracking-[0.2em] text-[#A1A19E] hover:text-[#F3F2EE] transition-colors hidden sm:inline-block"
          >
            Contact
          </a>

          {/* Instagram Button */}
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 hover:border-[#E5601A]/60 bg-white/[0.03] hover:bg-[#E5601A]/10 text-[#F3F2EE] hover:text-[#E5601A] transition-all"
            aria-label="Instagram profile"
          >
            <InstagramIcon size={13} />
            <span className="hidden sm:inline">Instagram</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </a>
        </nav>
      </div>
    </header>
  );
}
