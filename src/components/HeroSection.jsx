import React, { useState, useEffect, useRef } from 'react';
import { Play, Search, Film, Share2, Loader2, X } from 'lucide-react';
import { MagnatesLogo } from './MagnatesLogo';

const SEARCH_PHRASES = [
  { query: 'The House Rules', tag: '1 Film' },
  { query: 'Player 4Ps', tag: 'DavNor Top 10' },
  { query: 'Ang Trabaho Nga Ikaw Masunod', tag: '1 Film' },
  { query: 'Papa Bear', tag: '1 Film' },
  { query: 'Dungog', tag: '1 Film' },
  { query: 'Mockumentary & Drama', tag: '2 Films' },
  { query: 'Panabo City, Davao del Norte', tag: 'Origins' },
  { query: '@magnatesmediaph', tag: 'Channel' },
];

export function HeroSection({ onWatchReel, searchQuery, setSearchQuery }) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFound, setSearchFound] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef(null);

  // Blinking cursor toggle
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter and search simulation effect
  useEffect(() => {
    if (isFocused || searchQuery) return;

    const currentPhrase = SEARCH_PHRASES[phraseIndex];
    const timers = [];

    if (!isDeleting) {
      if (charIndex < currentPhrase.query.length) {
        // Type next character with natural human variation
        const id = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, 75 + Math.random() * 25);
        timers.push(id);
      } else {
        // Query fully typed: pause naturally, then simulate search
        const t1 = setTimeout(() => {
          setIsSearching(true);
          const t2 = setTimeout(() => {
            setIsSearching(false);
            setSearchFound(true);

            const t3 = setTimeout(() => {
              setSearchFound(false);
              setIsDeleting(true);
            }, 1800);
            timers.push(t3);
          }, 600);
          timers.push(t2);
        }, 120);
        timers.push(t1);
      }
    } else {
      if (charIndex > 0) {
        // Backspacing
        const id = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, 32);
        timers.push(id);
      } else {
        // Finished backspacing, pause briefly before next phrase
        const id = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % SEARCH_PHRASES.length);
        }, 350);
        timers.push(id);
      }
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, [charIndex, isDeleting, phraseIndex, isFocused, searchQuery]);

  const isSearchingActive = isSearching && !isFocused && !searchQuery;
  const searchFoundActive = searchFound && !isFocused && !searchQuery;

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Official Brand Logo */}
        <div className="flex justify-center mb-6">
          <MagnatesLogo className="h-10 sm:h-14 md:h-16 w-auto max-w-[85vw] sm:max-w-[480px] hover:scale-105 transition-transform" />
        </div>

        {/* Headline */}
        <div className="relative inline-block mb-4">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-[0.88] text-black max-w-5xl mx-auto select-none drop-shadow-sm">
            GRASSROOTS CINEMA <br />
            <span className="text-zinc-600">FROM PANABO CITY</span>
          </h1>
        </div>

        {/* Subtitle / Collective Identity in Poster Marker/Sans Style */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-700 font-medium leading-relaxed mb-8">
          Grassroots indie filmmakers based in <strong className="text-black font-extrabold">Panabo City, Davao del Norte</strong>. Telling authentic regional stories, mockumentaries, and social advocacy films.
        </p>

        {/* The Exact Search Pill with Animated Typewriter Search Simulation */}
        <div className="max-w-2xl sm:max-w-3xl mx-auto mb-10 px-4">
          <div className="relative group">
            <div 
              onClick={() => {
                if (inputRef.current) inputRef.current.focus();
              }}
              className="flex items-center justify-between bg-white text-black rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.12)] px-5 sm:px-6 py-3.5 sm:py-4 border-2 border-black/10 focus-within:border-black focus-within:shadow-[0_14px_45px_rgba(0,0,0,0.2)] transition-all cursor-text relative gap-3"
            >
              {/* Left Search / Animated Loader Icon */}
              <div className="flex-shrink-0 flex items-center">
                {isSearchingActive ? (
                  <Loader2 className="w-5 h-5 text-[#ff0033] stroke-[2.5] animate-spin" />
                ) : (
                  <Search 
                    className={`w-5 h-5 stroke-[2.5] transition-all duration-300 ${
                      searchFoundActive ? 'text-[#ff0033] scale-110' : 'text-black'
                    }`} 
                  />
                )}
              </div>

              {/* Input Area + Typewriter Simulation in dedicated flexible container */}
              <div className="flex-1 min-w-0 relative flex items-center h-7 sm:h-8">
                {/* Simulated Typewriter Search Overlay */}
                {!searchQuery && !isFocused && (
                  <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none">
                    <span className="text-zinc-400 font-semibold text-xs sm:text-sm mr-1.5 flex-shrink-0">
                      Search
                    </span>
                    <span className="text-black font-extrabold text-sm sm:text-base truncate">
                      "{SEARCH_PHRASES[phraseIndex].query.slice(0, charIndex)}"
                    </span>
                    <span
                      className={`inline-block w-[2px] h-4 sm:h-5 bg-[#ff0033] ml-0.5 flex-shrink-0 transition-opacity duration-150 ${
                        cursorVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    {searchFoundActive && (
                      <span className="ml-2 px-2.5 py-0.5 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-wider flex-shrink-0 shadow-sm transition-all animate-in fade-in zoom-in-95 duration-200">
                        {SEARCH_PHRASES[phraseIndex].tag}
                      </span>
                    )}
                  </div>
                )}

                {/* Real Input Element */}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={isFocused ? "Type film title, genre, or director..." : ""}
                  value={searchQuery}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full bg-transparent text-sm sm:text-base font-bold text-black placeholder-zinc-400 focus:outline-none z-10"
                />
              </div>

              {/* Right Side Action Controls: Clear + @magnatesmediaph button */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 z-20">
                {/* Clear Search Button (shown when user typed something) */}
                {searchQuery && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery('');
                      if (inputRef.current) inputRef.current.focus();
                    }}
                    className="p-1.5 hover:bg-zinc-100 rounded-full text-zinc-500 hover:text-black cursor-pointer transition-colors"
                    title="Clear search"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                  </button>
                )}

                {/* @MAGNATESMEDIAPH / mm.ph Pill Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery('@magnatesmediaph');
                    const filmsSection = document.getElementById('films');
                    if (filmsSection) filmsSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[11px] sm:text-xs font-black uppercase tracking-wider bg-black hover:bg-[#ff0033] text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                  title="Filter films by @magnatesmediaph"
                >
                  <span className="sm:hidden font-mono lowercase">mm.ph</span>
                  <span className="hidden sm:inline">@magnatesmediaph</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Helper Status Subtext */}
          <p className="text-xs text-zinc-500 font-semibold mt-2.5 flex items-center justify-center gap-1.5 min-h-[20px]">
            {searchQuery ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span>Live filtering films by "<strong className="text-black">{searchQuery}</strong>"</span>
              </>
            ) : isFocused ? (
              <span>Type any title, genre, or keyword to instantly filter films below</span>
            ) : isSearchingActive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033] animate-ping flex-shrink-0" />
                <span className="text-[#ff0033] font-bold">Searching for "{SEARCH_PHRASES[phraseIndex].query}"...</span>
              </>
            ) : searchFoundActive ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-black font-bold">Found: {SEARCH_PHRASES[phraseIndex].tag} matching "{SEARCH_PHRASES[phraseIndex].query}"</span>
              </>
            ) : (
              <span>Type to live filter films across the screening room</span>
            )}
          </p>
        </div>

        {/* CTA Buttons in Poster High-Contrast Aesthetic */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onWatchReel}
            className="px-8 py-4 rounded-full bg-black hover:bg-[#ff0033] text-white font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_30px_rgba(255,0,51,0.4)] hover:scale-105 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play DavNor Reel</span>
          </button>

          <a
            href="#films"
            className="px-8 py-4 rounded-full bg-white hover:bg-zinc-100 text-black font-black text-xs uppercase tracking-widest flex items-center gap-2 border-2 border-black shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:scale-105 transition-all"
          >
            <Film className="w-4 h-4" />
            <span>Explore 5+ Films</span>
          </a>

          <a
            href="#connect"
            className="px-7 py-4 rounded-full bg-zinc-200/80 hover:bg-zinc-300 text-black text-xs font-black tracking-widest uppercase border border-black/15 transition-all flex items-center gap-2 hover:scale-105"
          >
            <Share2 className="w-4 h-4 text-black" />
            <span>Socials Hub</span>
          </a>
        </div>

        {/* Quick Stats Grid in Clean Halftone Paper Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-8 border-t border-black/10">
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-black/10 shadow-sm">
            <div className="font-display text-3xl sm:text-4xl font-black text-black">TOP 10</div>
            <div className="text-[11px] text-zinc-600 uppercase tracking-wider font-bold mt-1">3rd DavNor Film Fest</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-black/10 shadow-sm">
            <div className="font-display text-3xl sm:text-4xl font-black text-[#ff0033]">5+</div>
            <div className="text-[11px] text-zinc-600 uppercase tracking-wider font-bold mt-1">Original Short Films</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-black/10 shadow-sm">
            <div className="font-display text-3xl sm:text-4xl font-black text-blue-600">PANABO</div>
            <div className="text-[11px] text-zinc-600 uppercase tracking-wider font-bold mt-1">Davao del Norte Roots</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-black/10 shadow-sm">
            <div className="font-display text-3xl sm:text-4xl font-black text-black">100%</div>
            <div className="text-[11px] text-zinc-600 uppercase tracking-wider font-bold mt-1">Grassroots Cinema</div>
          </div>
        </div>

      </div>
    </section>
  );
}
