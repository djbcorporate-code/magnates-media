import React from 'react';
import { COMPANY_CONTACT } from '../data/socials';
import { MagnatesLogo } from './MagnatesLogo';

const CURRENT_YEAR = 2024;

export function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t-2 border-black pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-zinc-800">
          
          {/* Logo & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center">
              <MagnatesLogo dark={true} className="h-7 sm:h-8 w-auto max-w-[260px]" />
            </div>
            <p className="text-zinc-400 text-xs max-w-sm">
              An independent filmmaking collective based in Panabo City, Davao del Norte, Philippines. Redefining regional cinema with heart and grit.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-zinc-300 font-medium">
            <a href="#films" className="hover:text-white transition-colors">Films</a>
            <a href="#connect" className="hover:text-white transition-colors">Socials</a>
            <a href="#accolades" className="hover:text-white transition-colors">Accolades</a>
            <a href="#bts" className="hover:text-white transition-colors">Behind the Scenes</a>
            <a href="#about" className="hover:text-white transition-colors">About Us</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-zinc-400">
          <div>
            <span>© {CURRENT_YEAR} Magnates Media Films ({COMPANY_CONTACT.handle}). All rights reserved.</span>
          </div>

          <div className="text-zinc-500 font-medium">
            <span>a subsidiary of DJB Group of Companies, Inc.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
