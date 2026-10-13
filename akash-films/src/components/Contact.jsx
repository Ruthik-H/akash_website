import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import InstagramIcon from './InstagramIcon';
import { siteConfig } from '../config';

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#080808] relative pt-24 pb-12 border-t border-white/[0.08]">
      {/* Cinematic accent glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-[#E5601A]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Contact Statement */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5601A] font-semibold block mb-4">
              COLLABORATION &amp; COMMISSIONS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#F3F2EE] leading-tight mb-6">
              {siteConfig.contact.headline}
            </h2>
            <p className="text-base md:text-lg text-[#999994] font-light max-w-xl mx-auto mb-10 leading-relaxed">
              {siteConfig.contact.subtext}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#E5601A] hover:bg-[#F26E29] text-white font-semibold text-xs md:text-sm tracking-wider uppercase transition-all shadow-xl shadow-[#E5601A]/20 hover:shadow-[#E5601A]/35"
              >
                <InstagramIcon size={16} />
                <span>Follow {siteConfig.instagram.handle}</span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/12 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.06] text-[#F3F2EE] font-medium text-xs md:text-sm tracking-wider uppercase transition-all"
              >
                <Mail size={16} className="text-[#E5601A]" />
                <span>Get in Touch</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-[#71716D]">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-[#F3F2EE] tracking-wider text-sm">
              {siteConfig.brand}
            </span>
            <span>&bull;</span>
            <span>&copy; {currentYear} {siteConfig.creator}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E5601A] transition-colors"
            >
              Instagram
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-[#F3F2EE] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
