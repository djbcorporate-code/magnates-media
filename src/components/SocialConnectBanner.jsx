import React, { useState, useRef } from 'react';
import { Search, Check } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/socials';
import confetti from 'canvas-confetti';

export function SocialConnectBanner() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPill, setCopiedPill] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const posterRef = useRef(null);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!posterRef.current) return;
    const rect = posterRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate subtle 3D tilt
    const tiltX = ((y - centerY) / centerY) * -7;
    const tiltY = ((x - centerX) / centerX) * 7;
    setTilt({ x: tiltX, y: tiltY });

    // Track specular glint position (in percentages)
    const glintX = Math.round((x / rect.width) * 100);
    const glintY = Math.round((y / rect.height) * 100);
    setGlintPos({ x: glintX, y: glintY });
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovering(false);
    setActiveChannel(null);
  };

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(COMPANY_CONTACT.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ff0033', '#1877f2', '#e1306c', '#00f2fe']
    });
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPill = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('@magnatesmediaph');
    setCopiedPill(true);
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#000000', '#ff0033', '#ffffff', '#ffd700']
    });
    setTimeout(() => setCopiedPill(false), 2500);
  };

  return (
    <section id="connect" className="py-20 relative overflow-hidden bg-[#edebe4] border-b border-black/10 text-zinc-900">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Lead-in */}
        <div className="text-center mb-10">
          <span className="text-[#ff0033] text-xs font-black tracking-widest uppercase block mb-1 font-mono">
            Social Media Hub • Panabo City
          </span>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-black tracking-tight">
            Follow the Journey of Magnates Media
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-medium max-w-xl mx-auto mt-2">
            Explore our signature studio poster. Move your cursor over the poster to experience live 3D physics, dynamic specular lighting, and interactive portals.
          </p>
        </div>

        {/* 100% Near-Duplicate Master Poster Frame with 3D Physics */}
        <div className="flex justify-center">
          <div
            ref={posterRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: isHovering ? 'transform 0.12s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 0.5s ease-out'
            }}
            className="relative w-full max-w-[560px] aspect-[819/1024] rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.4)] border-4 border-black bg-[#edebe4] select-none group"
          >
            {/* The Authentic 100% Original High-Resolution Master Poster Graphic */}
            <img
              src="/assets/poster_reference.jpg"
              alt="Magnates Media - Connect with us on socials!"
              className="w-full h-full object-cover select-none pointer-events-none block"
            />

            {/* Dynamic Specular Light Glint Layer (simulates gallery spotlight gleam moving with mouse) */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
              style={{
                background: `radial-gradient(circle at ${glintPos.x}% ${glintPos.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 30%, transparent 65%)`,
                opacity: isHovering ? 1 : 0
              }}
            />

            {/* Animated Pulsing Lens Flare on the "C" of CONNECT */}
            <div
              className="absolute z-20 pointer-events-none"
              style={{ left: '17.2%', top: '22.4%', width: '6%', height: '5%' }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <span className="absolute w-8 h-8 rounded-full bg-white/70 blur-sm animate-pulse" />
                <span className="text-white text-3xl font-black drop-shadow-[0_0_12px_rgba(255,255,255,1)] animate-glint select-none">
                  ✦
                </span>
              </div>
            </div>

            {/* INTERACTIVE HOTSPOTS LAYER */}

            {/* 1. Interactive Search Pill: @magnatesmediaph */}
            <div
              onClick={handleCopyPill}
              style={{ left: '27.5%', top: '50.2%', width: '45%', height: '6.2%' }}
              className="absolute z-30 cursor-pointer rounded-full transition-all duration-200 hover:scale-105 active:scale-95 group/pill"
              title="Click to copy @magnatesmediaph or open Facebook"
            >
              {/* Subtle hover outline ring */}
              <div className="w-full h-full rounded-full transition-all duration-200 group-hover/pill:ring-4 group-hover/pill:ring-black/20 group-hover/pill:bg-white/10" />

              {/* Tooltip on Hover */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/pill:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-black text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xl flex items-center gap-1.5 border border-white/20">
                <Search className="w-3 h-3 text-[#ff0033]" />
                <span>{copiedPill ? '✓ Copied @magnatesmediaph!' : 'Click to Copy @magnatesmediaph'}</span>
              </div>
            </div>

            {/* 2. Interactive 3D App Icon: X (Twitter) */}
            <a
              href="https://twitter.com/magnatesmediaph"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveChannel('x')}
              onMouseLeave={() => setActiveChannel(null)}
              style={{ left: '13.5%', top: '63.5%', width: '19.5%', height: '17%' }}
              className="absolute z-30 cursor-pointer rounded-3xl transition-all duration-300 hover:scale-110 active:scale-95 group/x"
              title="Follow @magnatesmediaph on X"
            >
              <div className={`w-full h-full rounded-2xl transition-all duration-300 ${
                activeChannel === 'x' ? 'shadow-[0_0_35px_rgba(255,255,255,0.85)] ring-2 ring-white/60 bg-white/15' : 'hover:shadow-[0_0_30px_rgba(255,255,255,0.7)]'
              }`} />
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/x:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-black text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-2xl border border-white/20">
                Follow on X ↗
              </div>
            </a>

            {/* 3. Interactive 3D App Icon: Facebook */}
            <a
              href="https://www.facebook.com/magnatesmediaph"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveChannel('facebook')}
              onMouseLeave={() => setActiveChannel(null)}
              style={{ left: '28.5%', top: '67.5%', width: '21.5%', height: '17.5%' }}
              className="absolute z-30 cursor-pointer rounded-3xl transition-all duration-300 hover:scale-110 active:scale-95 group/fb"
              title="Official Facebook: Magnates Media"
            >
              <div className={`w-full h-full rounded-2xl transition-all duration-300 ${
                activeChannel === 'facebook' ? 'shadow-[0_0_40px_rgba(24,119,242,0.95)] ring-2 ring-blue-400 bg-blue-500/20' : 'hover:shadow-[0_0_35px_rgba(24,119,242,0.85)]'
              }`} />
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/fb:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#1877f2] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-2xl border border-white/30">
                Official Facebook ↗
              </div>
            </a>

            {/* 4. Interactive 3D App Icon: TikTok */}
            <a
              href="https://www.tiktok.com/@magnatesmediaph"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveChannel('tiktok')}
              onMouseLeave={() => setActiveChannel(null)}
              style={{ left: '44.0%', top: '59.5%', width: '22%', height: '19%' }}
              className="absolute z-30 cursor-pointer rounded-3xl transition-all duration-300 hover:scale-110 active:scale-95 group/tk"
              title="Watch Behind-the-Scenes on TikTok"
            >
              <div className={`w-full h-full rounded-2xl transition-all duration-300 ${
                activeChannel === 'tiktok' ? 'shadow-[0_0_40px_rgba(0,242,234,0.9)] ring-2 ring-cyan-400 bg-cyan-500/15' : 'hover:shadow-[0_0_35px_rgba(0,242,234,0.8)]'
              }`} />
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/tk:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-black text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-2xl border border-cyan-400/40">
                TikTok Channel ↗
              </div>
            </a>

            {/* 5. Interactive 3D App Icon: YouTube */}
            <a
              href="https://www.youtube.com/@magnatesmediaph"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveChannel('youtube')}
              onMouseLeave={() => setActiveChannel(null)}
              style={{ left: '52.0%', top: '70.5%', width: '21%', height: '18%' }}
              className="absolute z-30 cursor-pointer rounded-3xl transition-all duration-300 hover:scale-110 active:scale-95 group/yt"
              title="Screen Full Films on YouTube"
            >
              <div className={`w-full h-full rounded-2xl transition-all duration-300 ${
                activeChannel === 'youtube' ? 'shadow-[0_0_45px_rgba(255,0,51,1)] ring-2 ring-[#ff0033] bg-red-600/20' : 'hover:shadow-[0_0_40px_rgba(255,0,51,0.9)]'
              }`} />
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/yt:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#ff0033] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-2xl border border-white/30">
                YouTube Channel ↗
              </div>
            </a>

            {/* 6. Interactive 3D App Icon: Instagram */}
            <a
              href="https://www.instagram.com/magnatesmediaph"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveChannel('instagram')}
              onMouseLeave={() => setActiveChannel(null)}
              style={{ left: '64.0%', top: '63.0%', width: '24%', height: '20%' }}
              className="absolute z-30 cursor-pointer rounded-3xl transition-all duration-300 hover:scale-110 active:scale-95 group/ig"
              title="Follow Production Stills on Instagram"
            >
              <div className={`w-full h-full rounded-2xl transition-all duration-300 ${
                activeChannel === 'instagram' ? 'shadow-[0_0_45px_rgba(225,48,108,1)] ring-2 ring-pink-500 bg-pink-500/20' : 'hover:shadow-[0_0_40px_rgba(225,48,108,0.85)]'
              }`} />
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/ig:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-2xl border border-white/30">
                Instagram Stills ↗
              </div>
            </a>

            {/* 7. Bottom Contact Bar Interactive Hotspots */}

            {/* Email Hotspot */}
            <div
              onClick={handleCopyEmail}
              style={{ left: '14.0%', top: '92.5%', width: '20.0%', height: '4.5%' }}
              className="absolute z-30 cursor-pointer rounded-lg hover:bg-white/20 transition-all flex items-center justify-center group/email"
              title="Click to copy official studio email: magnatesmedia.film@gmail.com"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/email:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-black text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                {copiedEmail ? '✓ Copied Email!' : 'Click to copy email'}
              </div>
            </div>

            {/* Facebook Hotspot */}
            <a
              href="https://www.facebook.com/magnatesmediaph"
              target="_blank"
              rel="noopener noreferrer"
              style={{ left: '35.0%', top: '92.5%', width: '13.0%', height: '4.5%' }}
              className="absolute z-30 cursor-pointer rounded-lg hover:bg-white/20 transition-all flex items-center justify-center group/fbfoot"
              title="Visit Facebook Page"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/fbfoot:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                Open Facebook ↗
              </div>
            </a>

            {/* TikTok / X / Instagram Hotspot */}
            <a
              href="https://www.instagram.com/magnatesmediaph"
              target="_blank"
              rel="noopener noreferrer"
              style={{ left: '49.0%', top: '92.5%', width: '17.0%', height: '4.5%' }}
              className="absolute z-30 cursor-pointer rounded-lg hover:bg-white/20 transition-all flex items-center justify-center group/socialfoot"
              title="Visit Instagram / TikTok @magnatesmediaph"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/socialfoot:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-black text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                @magnatesmediaph ↗
              </div>
            </a>

            {/* YouTube Films Hotspot */}
            <a
              href="https://youtube.com/@magnatesmediaph"
              target="_blank"
              rel="noopener noreferrer"
              style={{ left: '67.0%', top: '92.5%', width: '18.0%', height: '4.5%' }}
              className="absolute z-30 cursor-pointer rounded-lg hover:bg-white/20 transition-all flex items-center justify-center group/ytfoot"
              title="Visit YouTube Channel"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/ytfoot:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#ff0033] text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                YouTube Channel ↗
              </div>
            </a>

          </div>
        </div>

        {/* Floating Toast Notification when copying */}
        {(copiedPill || copiedEmail) && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-black text-white font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-bottom-4">
            <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>{copiedEmail ? 'Copied magnatesmedia.film@gmail.com!' : 'Copied @magnatesmediaph to clipboard!'}</span>
          </div>
        )}

      </div>

    </section>
  );
}
