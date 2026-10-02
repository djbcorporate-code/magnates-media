import React, { useEffect, useState } from 'react';
import { X, Play, Award, Clock, Users, Clapperboard, Share2, Check, ExternalLink, Film as FilmIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

export function FilmModal({ film, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!film) return null;

  const handleShare = () => {
    const shareUrl = film.facebookUrl || film.youtubeUrl;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Poster Card: Styled exactly in the website's vintage halftone paper theme */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] bg-[#edebe4] border-2 border-black rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.6)] flex flex-col text-zinc-900 overflow-hidden">
        
        {/* Cinema Monitor / Video Screen: flex-shrink-0 ensures thumbnail NEVER collapses or overlaps */}
        <div className="relative w-full aspect-video max-h-[46vh] sm:max-h-[52vh] bg-black flex-shrink-0 border-b-2 border-black overflow-hidden group">
          
          {/* Modal Close Button: Fixed to top-right of the cinema monitor */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-40 w-10 h-10 rounded-full bg-black/85 hover:bg-[#ff0033] text-white flex items-center justify-center border-2 border-white shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Close screening"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
          {isPlaying ? (
            film.videoEmbedUrl ? (
              <iframe
                src={film.videoEmbedUrl}
                title={film.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-950 p-6 text-center text-white">
                <div className="w-16 h-16 rounded-full bg-[#1877f2]/20 border border-[#1877f2] flex items-center justify-center text-[#1877f2] mb-4 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h4 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-wider mb-2">
                  Screening: {film.title}
                </h4>
                <p className="text-zinc-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                  Official festival competition entry for the 3rd DavNor Short Film Festival. Stream the full premiere directly on Facebook via One DavNor Network & Magnates Media.
                </p>
                <a
                  href={film.facebookUrl || film.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-[#1877f2] hover:bg-[#1567d3] text-white font-black text-xs uppercase tracking-widest flex items-center gap-2.5 shadow-[0_0_25px_rgba(24,119,242,0.6)] hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Watch on Facebook (One DavNor Network)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )
          ) : (
            <div className="relative w-full h-full">
              <img
                src={film.thumbnail}
                alt={film.title}
                className="w-full h-full object-cover filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

              {/* Central Play Reel Trigger */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 rounded-full bg-black hover:bg-[#ff0033] text-white flex items-center justify-center shadow-[0_10px_35px_rgba(0,0,0,0.65)] hover:scale-110 active:scale-95 transition-all cursor-pointer group/btn border-2 border-white"
                  title="Click to play screening"
                >
                  <Play className="w-9 h-9 fill-current ml-1.5 group-hover/btn:scale-110 transition-transform" />
                </button>
                <span className="text-white text-xs font-black uppercase tracking-widest mt-4 drop-shadow bg-black/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                  {film.videoEmbedUrl ? 'Play Film Screening' : 'Watch Festival Entry'}
                </span>
              </div>

              {/* Festival Laurel Tag as slim, transparent cinema strip */}
              {film.laurel && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="px-2.5 py-1 bg-black/40 backdrop-blur-md border-l-2 border-amber-400/90 text-amber-300 text-[11px] font-black uppercase tracking-wider rounded-r shadow-sm">
                    <span>{film.laurel}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Info Content: Poster Editorial Style (Scrolls smoothly below the pinned video monitor) */}
        <div className="relative flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Subtle Halftone Pattern Overlay inside editorial paper area */}
          <div className="absolute inset-0 bg-halftone-paper opacity-75 pointer-events-none" />

          {/* Editorial Content Wrapper */}
          <div className="relative z-10 space-y-6">
          
          {/* Header Row: Category, Title, and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-2 border-b border-black/10">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs font-black uppercase tracking-wider mb-2 font-mono">
                <span className="bg-black text-white px-2.5 py-0.5 rounded-full">{film.year}</span>
                <span className="text-[#ff0033] font-black">{film.genre}</span>
                <span className="text-zinc-400">•</span>
                <span className="flex items-center gap-1 text-zinc-700 font-extrabold">
                  <Clock className="w-3.5 h-3.5" />
                  {film.duration}
                </span>
              </div>

              <h3 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-[0.92]">
                {film.title}
              </h3>

              {film.awardWon && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-black text-amber-300 border-l-2 border-amber-400 text-xs font-black uppercase tracking-wider font-mono shadow-sm">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>{film.awardWon}</span>
                </div>
              )}
            </div>

            {/* Tactile Action Buttons in Poster Aesthetic */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-black text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <a
                href={film.facebookUrl || film.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-[#ff0033] text-white text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              >
                <span>{film.platform === 'facebook' ? 'Facebook Video' : 'YouTube'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tagline in Bold Quotation with Black Accent */}
          <div className="border-l-4 border-black pl-4 py-1 text-base sm:text-lg font-bold italic text-zinc-800 leading-snug">
            "{film.tagline}"
          </div>

          {/* Full Synopsis Card in Clean White Press Box */}
          <div>
            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest block mb-2 font-mono">
              FILM SYNOPSIS & LOGLINE
            </span>
            <div className="bg-white p-5 rounded-2xl border border-black/15 shadow-sm text-zinc-800 text-sm sm:text-base leading-relaxed font-medium">
              {film.synopsis}
            </div>
          </div>

          {/* Cast & Crew Grid: High-Contrast White Cards with Black Borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-white border border-black/15 shadow-sm">
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1.5">
                <Clapperboard className="w-3.5 h-3.5 text-[#ff0033]" />
                <span>Director</span>
              </div>
              <div className="text-sm font-black text-black">{film.director}</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-black/15 shadow-sm">
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Writer</span>
              </div>
              <div className="text-sm font-black text-black">{film.writer}</div>
            </div>

            {film.editor ? (
              <div className="p-4 rounded-2xl bg-white border border-black/15 shadow-sm">
                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1.5">
                  <FilmIcon className="w-3.5 h-3.5 text-blue-600" />
                  <span>Editor</span>
                </div>
                <div className="text-sm font-black text-black">{film.editor}</div>
              </div>
            ) : null}

            <div className={`p-4 rounded-2xl bg-white border border-black/15 shadow-sm ${!film.editor ? 'sm:col-span-2' : ''}`}>
              <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cast / Talents</span>
              </div>
              <div className="text-xs font-extrabold text-zinc-800">
                {film.cast.join(', ')}
              </div>
            </div>
          </div>

          {/* Bottom Footer inside Modal */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 text-xs text-zinc-600 font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff0033]" />
              <span>Produced by <strong className="text-black font-black">Magnates Media Films</strong> • Panabo City, Mindanao</span>
            </div>

            <button
              onClick={onClose}
              className="text-black font-black uppercase text-xs hover:text-[#ff0033] underline cursor-pointer transition-colors"
            >
              Back to Screening Room ✕
            </button>
          </div>

          </div>

        </div>

      </div>

    </div>
  );
}
