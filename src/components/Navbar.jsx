import React, { useState } from 'react';
import { Menu, X, Play } from 'lucide-react';
import { MagnatesLogo } from './MagnatesLogo';

export function Navbar({ onOpenFeaturedReel, onReplayIntro }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Films', href: '#films' },
    { name: 'Socials', href: '#connect' },
    { name: 'Accolades', href: '#accolades' },
    { name: 'BTS', href: '#bts' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#edebe4]/92 border-b border-black/10 transition-colors duration-300 text-zinc-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo: Magnates Media */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (onReplayIntro) onReplayIntro();
            }}
            className="flex items-center py-2 group cursor-pointer"
            title="Click to replay cinema intro reveal"
          >
            <MagnatesLogo className="h-9 sm:h-11 md:h-12 w-auto max-w-[220px] sm:max-w-[280px] md:max-w-[340px] group-hover:scale-105 transition-transform" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-zinc-700 hover:text-black uppercase tracking-wider transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-black after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Tool: Watch Reel CTA */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={onOpenFeaturedReel}
              className="px-5 py-2.5 rounded-full bg-black hover:bg-[#ff0033] text-white text-xs font-black tracking-widest uppercase flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Watch Reel</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-zinc-300 text-black shadow-sm"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#edebe4] border-b border-zinc-300 px-6 py-5 space-y-4 shadow-lg">
          <div className="grid grid-cols-2 gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-zinc-800 hover:text-black bg-white p-3 rounded-xl border border-zinc-200 text-center uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenFeaturedReel();
            }}
            className="w-full py-3.5 rounded-full bg-black text-white font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch DavNor Festival Reel
          </button>
        </div>
      )}
    </header>
  );
}
