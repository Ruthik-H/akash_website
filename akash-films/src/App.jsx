import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutAkash from './components/AboutAkash';
import Services from './components/Services';
import SkillsStrip from './components/SkillsStrip';
import SelectedWork from './components/SelectedWork';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-[#060606] text-[#F3F2EE] film-grain selection:bg-[#E5601A] selection:text-white">
      {/* 1. Fixed Cinematic Navigation */}
      <Navbar />

      <main>
        {/* 2. 3D Cinematic Camera Studio Intro & Hero Reveal */}
        <Hero />

        {/* 3. Behind the Lens — Editorial About Akash */}
        <AboutAkash />

        {/* 4. What I Bring to the Frame — 8 Core Creative Services */}
        <Services />

        {/* 5. Cinematic Skills Strip Marquee */}
        <SkillsStrip />

        {/* 6. My World, Frame by Frame — Preserved Instagram Reels Gallery */}
        <SelectedWork />

        {/* 7. Contact & Footer */}
        <Contact />
      </main>
    </div>
  );
}
