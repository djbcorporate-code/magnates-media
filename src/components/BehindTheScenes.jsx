import React, { useState } from 'react';
import { Clapperboard, X, ZoomIn, ExternalLink, Play, Music, Camera } from 'lucide-react';
import { BEHIND_THE_SCENES } from '../data/films';

export function BehindTheScenes() {
  const [activePhoto, setActivePhoto] = useState(null);

  const getMediaIcon = (type) => {
    switch (type) {
      case 'video':
        return <Play className="w-3.5 h-3.5 fill-current" />;
      case 'audio':
        return <Music className="w-3.5 h-3.5" />;
      default:
        return <Camera className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="bts" className="py-20 relative bg-[#edebe4] border-b border-black/10 overflow-hidden text-zinc-900">
      
      {/* Film Perforation Sprocket Top Tape (Crisp Black Film Border) */}
      <div className="w-full h-6 bg-[#0a0a0c] border-y border-black flex items-center justify-around opacity-90 mb-12 shadow-sm">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-2.5 h-3 rounded-xs bg-[#edebe4] border border-black/40" />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#ff0033] text-xs font-black tracking-widest uppercase block mb-2 font-mono">
            On-Set Contact Sheet
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
            Behind the Lens in Panabo
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base mt-2 font-medium">
            Authentic production stills, video reels, and music scoring from our films on location.
          </p>
        </div>

        {/* Gallery Grid: Precision 5-Card Film Contact Sheet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {BEHIND_THE_SCENES.map((item, index) => {
            const isWideHero = index === 0;
            return (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className={`group relative rounded-2xl overflow-hidden bg-white border-2 border-black/80 cursor-pointer shadow-md hover:border-black hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col ${
                  isWideHero ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Contact Sheet Header Strip */}
                <div className="px-3.5 py-2 bg-[#0a0a0c] border-b border-black text-white flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
                  <span className="text-zinc-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff0033]" />
                    MAGNATES // FRAME 0{item.id}
                  </span>
                  <span className="text-zinc-400 font-semibold">{item.tag}</span>
                </div>

                {/* Media Image Container */}
                <div className={`relative overflow-hidden bg-black ${isWideHero ? 'aspect-[16/9] sm:aspect-[21/9] lg:aspect-[16/8]' : 'aspect-[4/3]'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Halftone texture overlay */}
                  <div className="absolute inset-0 bg-halftone-dark opacity-20 pointer-events-none mix-blend-overlay" />

                  {/* Media Type Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white border border-white/20 flex items-center gap-1.5 shadow-md">
                      {getMediaIcon(item.type)}
                      {item.tag}
                    </span>
                  </div>

                  {/* Facebook External Link Button (Quick Jump) */}
                  <a
                    href={item.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-white/90 hover:bg-[#ff0033] hover:text-white backdrop-blur-md text-[10px] font-black text-black border border-black/20 flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                    title="View on Facebook"
                  >
                    <span>FB Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {/* Hover zoom overlay */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <div className="p-3.5 rounded-full bg-white text-black shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                      <ZoomIn className="w-4 h-4" />
                      <span>Inspect Still</span>
                    </div>
                  </div>
                </div>

                {/* Photo Caption & Metadata */}
                <div className="p-4 sm:p-5 bg-white flex-1 flex flex-col justify-between border-t border-black/10">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h4 className="font-extrabold text-black text-sm sm:text-base group-hover:text-[#ff0033] transition-colors leading-snug">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-zinc-600 text-xs sm:text-sm line-clamp-2 font-medium leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                    <span className="truncate">{item.credits}</span>
                    <span className="text-[#ff0033] font-bold group-hover:underline flex items-center gap-1 flex-shrink-0">
                      View Still →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Mantra Banner in High-Contrast Black Frame */}
        <div className="mt-16 p-8 rounded-3xl bg-[#0a0a0c] text-white border-2 border-black max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
            <Clapperboard className="w-8 h-8" />
          </div>
          <div>
            <h4 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-wider leading-tight">
              "Every street corner in Panabo has a story waiting for a frame."
            </h4>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 font-medium">
              From guerilla mockumentaries to competition short films, the Magnates Media crew collaborates across directing, editing, sound engineering, and grassroots community casting.
            </p>
          </div>
        </div>

      </div>

      {/* Film Perforation Sprocket Bottom Tape */}
      <div className="w-full h-6 bg-[#0a0a0c] border-y border-black flex items-center justify-around opacity-90 mt-14 shadow-sm">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="w-2.5 h-3 rounded-xs bg-[#edebe4] border border-black/40" />
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden border-2 border-black shadow-2xl text-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="px-5 py-3.5 bg-[#0a0a0c] text-white flex items-center justify-between border-b border-black font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff0033]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  MAGNATES MEDIA // {activePhoto.tag}
                </span>
              </div>
              <button
                onClick={() => setActivePhoto(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#ff0033] text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Media Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-contain sm:object-cover"
              />
            </div>

            {/* Content & Action Bar */}
            <div className="p-5 sm:p-6 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#ff0033] uppercase tracking-wider block">
                    {activePhoto.credits}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-black tracking-tight mt-0.5">
                    {activePhoto.title}
                  </h3>
                </div>

                <a
                  href={activePhoto.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#ff0033] hover:bg-black text-white text-xs font-black uppercase tracking-wider shadow-md transition-colors cursor-pointer flex-shrink-0"
                >
                  <span>View Post on Facebook</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-zinc-700 text-sm mt-4 font-medium leading-relaxed">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
