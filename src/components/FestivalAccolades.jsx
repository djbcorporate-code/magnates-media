import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FESTIVAL_HIGHLIGHTS } from '../data/films';

export function FestivalAccolades() {
  return (
    <section id="accolades" className="py-20 relative bg-[#edebe4] border-b border-black/10 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title in Poster Typography */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#ff0033] text-xs font-black uppercase tracking-widest block mb-2 font-mono">
            Festival Recognition & Honors
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-black leading-none">
            Rooted in Mindanao. <br />
            <span className="text-zinc-600">
              Celebrated on Festival Stages.
            </span>
          </h2>
          <p className="text-zinc-700 text-sm sm:text-base mt-4 leading-relaxed font-medium">
            Magnates Media was founded to prove that world-class cinema can emerge directly from the grassroots of Panabo City. Our festival selections celebrate that relentless vision.
          </p>
        </div>

        {/* Featured Laurel Banner: 3rd DavNor Short Film Festival (High-Contrast Black Studio Frame) */}
        <div className="relative max-w-4xl mx-auto rounded-3xl bg-[#0a0a0d] border-4 border-black p-8 sm:p-12 shadow-2xl text-center mb-12 text-white">
          
          {/* Halftone texture overlay */}
          <div className="absolute inset-0 bg-halftone-dark opacity-40 pointer-events-none rounded-3xl" />

          {/* Golden Laurel Wreath */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6">
            {/* Left Laurel Branch */}
            <svg className="w-8 h-14 sm:w-12 sm:h-20 text-amber-400 select-none flex-shrink-0" viewBox="0 0 24 48" fill="currentColor">
              <path d="M20 2C15 8 8 16 7 28C6 34 8 41 13 46C11 46 5 37 5 27C5 15 13 6 20 2Z" opacity="0.6"/>
              <ellipse cx="9" cy="11" rx="4" ry="2" transform="rotate(-30 9 11)" />
              <ellipse cx="7" cy="19" rx="4.5" ry="2" transform="rotate(-15 7 19)" />
              <ellipse cx="7" cy="27" rx="4.5" ry="2" transform="rotate(5 7 27)" />
              <ellipse cx="8" cy="35" rx="4" ry="2" transform="rotate(25 8 35)" />
              <ellipse cx="11" cy="42" rx="3.5" ry="1.8" transform="rotate(45 11 42)" />
            </svg>

            <div className="flex flex-col items-center">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-amber-400 font-black mb-1">
                OFFICIAL SELECTION
              </span>
              <span className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-wider">
                TOP 10 FINALIST
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-300 tracking-widest uppercase mt-1">
                3rd DavNor Short Film Festival
              </span>
            </div>

            {/* Right Laurel Branch */}
            <svg className="w-8 h-14 sm:w-12 sm:h-20 text-amber-400 select-none flex-shrink-0 transform -scale-x-100" viewBox="0 0 24 48" fill="currentColor">
              <path d="M20 2C15 8 8 16 7 28C6 34 8 41 13 46C11 46 5 37 5 27C5 15 13 6 20 2Z" opacity="0.6"/>
              <ellipse cx="9" cy="11" rx="4" ry="2" transform="rotate(-30 9 11)" />
              <ellipse cx="7" cy="19" rx="4.5" ry="2" transform="rotate(-15 7 19)" />
              <ellipse cx="7" cy="27" rx="4.5" ry="2" transform="rotate(5 7 27)" />
              <ellipse cx="8" cy="35" rx="4" ry="2" transform="rotate(25 8 35)" />
              <ellipse cx="11" cy="42" rx="3.5" ry="1.8" transform="rotate(45 11 42)" />
            </svg>
          </div>

          <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6 font-medium">
            Recognized by the Provincial Government of Davao del Norte for compelling storytelling and urgent youth advocacy in the film <strong className="text-white font-extrabold">"Player 4Ps"</strong>, tackling Online Sexual Abuse & Exploitation of Children (OSAEC/CSAEM) awareness.
          </p>

          <div className="text-amber-300 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>People's Choice Contender • Panabo City Delegation</span>
          </div>
        </div>

        {/* Accolades Cards Grid in White Poster Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {FESTIVAL_HIGHLIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-black/15 shadow-sm hover:border-black transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-[#ff0033] mb-2 font-mono">
                  {item.year} • {item.status}
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-black uppercase tracking-wide mb-1 leading-snug">
                  {item.festival}
                </h3>
                <div className="text-xs text-zinc-800 font-bold mb-3">
                  Film: <span className="text-black font-black">{item.project}</span>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/10 text-[11px] text-zinc-500 font-bold">
                {item.organization}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
