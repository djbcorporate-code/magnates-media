import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StudioTicker } from './components/StudioTicker';
import { HeroSection } from './components/HeroSection';
import { SocialConnectBanner } from './components/SocialConnectBanner';
import { FilmShowcase } from './components/FilmShowcase';
import { FestivalAccolades } from './components/FestivalAccolades';
import { BehindTheScenes } from './components/BehindTheScenes';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FilmModal } from './components/FilmModal';
import { SplashIntro } from './components/SplashIntro';
import { FILMS_DATA } from './data/films';

export function App() {
  const halftoneMode = true;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [introKey, setIntroKey] = useState(1);
  const [showSplash, setShowSplash] = useState(true);

  const handleOpenFeaturedReel = () => {
    // Open the featured DavNor Top 10 film
    const featured = FILMS_DATA.find((f) => f.id === 'player-4ps') || FILMS_DATA[0];
    setSelectedFilm(featured);
  };

  const handleReplayIntro = () => {
    setIntroKey((prev) => prev + 1);
    setShowSplash(true);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${
      halftoneMode ? 'bg-[#edebe4] text-zinc-900' : 'bg-[#f4f3ed] text-zinc-900'
    }`}>
      
      {/* Opening Splash / Curtain Reveal (like socia.ph) */}
      {showSplash && (
        <SplashIntro
          key={introKey}
          onComplete={() => setShowSplash(false)}
        />
      )}

      {/* Global Halftone Grid Pattern Overlay when Halftone Mode is Enabled */}
      {halftoneMode && (
        <div className="fixed inset-0 bg-halftone-paper opacity-80 pointer-events-none z-0" />
      )}

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar
          onOpenFeaturedReel={handleOpenFeaturedReel}
          onReplayIntro={handleReplayIntro}
        />

        {/* Studio Wire Marquee Ticker (Flush below header) */}
        <StudioTicker onSelectQuery={(query) => setSearchQuery(query)} />

        {/* Hero Section */}
        <HeroSection
          onWatchReel={handleOpenFeaturedReel}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 1:1 Reference Poster Reproduction & Interactive 3D Social Hub */}
        <SocialConnectBanner />

        {/* Filmography & Screening Room */}
        <FilmShowcase
          onSelectFilm={(film) => setSelectedFilm(film)}
          searchQuery={searchQuery}
        />

        {/* Festival & DavNor Accolades */}
        <FestivalAccolades />

        {/* Behind The Scenes / Panabo Darkroom Gallery */}
        <BehindTheScenes />

        {/* About Magnates Media Collective */}
        <AboutSection />

        {/* Contact & Inquiries */}
        <ContactSection />

        {/* Footer */}
        <Footer />

      </div>

      {/* Cinema Trailer Modal */}
      {selectedFilm && (
        <FilmModal
          film={selectedFilm}
          onClose={() => setSelectedFilm(null)}
        />
      )}

    </div>
  );
}

export default App;
