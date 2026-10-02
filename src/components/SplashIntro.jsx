import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnatesLogo } from './MagnatesLogo';
import { Clapperboard } from 'lucide-react';

export function SplashIntro({ onComplete }) {
  const [isMobile, setIsMobile] = useState(false);
  const [animateCurtain, setAnimateCurtain] = useState(false);
  const [textAnimate, setTextAnimate] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Sequence timing matching socia.ph:
    // 1. Trigger curtain sweep & flying icon launch
    const t1 = setTimeout(() => {
      setAnimateCurtain(true);
    }, 150);

    // 2. Trigger logo pulse / pop
    const t2 = setTimeout(() => {
      setTextAnimate(true);
    }, 900);

    // 3. Fade out splash screen and reveal website
    const t3 = setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {showSplash && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] bg-[#edebe4] overflow-hidden select-none"
        >
          {/* Halftone texture matching the website & poster */}
          <div className="absolute inset-0 bg-halftone-paper opacity-85 pointer-events-none z-[10]" />

          {/* Desktop Version */}
          {!isMobile ? (
            <div className="relative w-full h-full">
              {/* Massive Curved Sweep Curtain 1 (Deep Cinema Black) */}
              <motion.div
                className="absolute bg-[#0a0a0d] rounded-full pointer-events-none z-[20] w-[2900px] h-[2800px] shadow-2xl"
                initial={{ top: '-1900px', left: '-1250px' }}
                animate={{
                  top: animateCurtain ? '-2400px' : '-1900px',
                  left: animateCurtain ? '2000px' : '-1250px',
                }}
                transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
              />

              {/* Massive Curved Sweep Curtain 2 (Crimson Film Red) */}
              <motion.div
                className="absolute bg-[#ff0033] rounded-full pointer-events-none z-[25] w-[3300px] h-[2800px] shadow-2xl"
                initial={{ top: '-120px', left: '20px' }}
                animate={{
                  top: animateCurtain ? '220px' : '-120px',
                  left: animateCurtain ? '2000px' : '20px',
                }}
                transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
              />

              {/* Soaring 3D Cinema Clapperboard / Film Element flying diagonally across */}
              <motion.div
                className="absolute z-[35] pointer-events-none flex items-center justify-center"
                initial={{
                  width: '110px',
                  height: '110px',
                  top: '720px',
                  left: '100px',
                  rotate: 15,
                }}
                animate={{
                  width: animateCurtain ? '210px' : '110px',
                  height: animateCurtain ? '210px' : '110px',
                  top: animateCurtain ? '-280px' : '720px',
                  left: animateCurtain ? '2400px' : '100px',
                  rotate: animateCurtain ? 48 : 15,
                }}
                transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
              >
                <div className="w-24 h-24 rounded-3xl bg-black text-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-2 border-white flex flex-col items-center justify-center transform -rotate-6">
                  <Clapperboard className="w-12 h-12 text-[#ff0033]" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-white mt-1">TAKE 1</span>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Mobile Version (Curtains sweep vertically upwards) */
            <div className="relative w-full h-full">
              {/* Mobile Curved Sweep Curtain 1 (Deep Black) */}
              <motion.div
                className="absolute bg-[#0a0a0d] rounded-full pointer-events-none z-[20] w-[950px] h-[1800px] left-[calc(50%-850px)]"
                initial={{ top: '-460px' }}
                animate={{ top: animateCurtain ? '-2600px' : '-460px' }}
                transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
              />

              {/* Mobile Curved Sweep Curtain 2 (Crimson Red) */}
              <motion.div
                className="absolute bg-[#ff0033] rounded-full pointer-events-none z-[25] w-[900px] h-[1750px] left-[calc(50%-50px)]"
                initial={{ top: '-420px' }}
                animate={{ top: animateCurtain ? '-2600px' : '-420px' }}
                transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
              />

              {/* Mobile Flying Element */}
              <motion.div
                className="absolute z-[35] left-1/2 pointer-events-none"
                initial={{ top: '820px', x: '-50%', rotate: 8, width: '90px', height: '90px' }}
                animate={{
                  top: animateCurtain ? '-450px' : '820px',
                  x: '-50%',
                  rotate: 25,
                  width: '90px',
                  height: '90px',
                }}
                transition={{ duration: 1.05, ease: [0.65, 0, 0.35, 1] }}
              >
                <div className="w-20 h-20 rounded-2xl bg-black text-white p-3 shadow-2xl border-2 border-white flex flex-col items-center justify-center">
                  <Clapperboard className="w-10 h-10 text-[#ff0033]" />
                  <span className="text-[8px] font-black uppercase text-white mt-0.5">ACTION</span>
                </div>
              </motion.div>
            </div>
          )}

          {/* Central Logo & Pop Animation */}
          <div className="absolute inset-0 z-[40] flex flex-col items-center justify-center pointer-events-none px-6 text-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={
                textAnimate
                  ? { scale: [1, 1.1, 1], opacity: 1, y: [0, -6, 0] }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              transition={
                textAnimate
                  ? { duration: 0.3, ease: 'easeOut' }
                  : { duration: 0.4, ease: 'easeOut' }
              }
              className="flex flex-col items-center"
            >
              <div className="relative">
                <MagnatesLogo className="h-12 sm:h-16 md:h-20 w-auto max-w-[85vw] sm:max-w-[560px] drop-shadow-md" />
                {/* Sparkle Glint */}
                <span className="absolute -top-3 -right-3 text-black text-3xl animate-glint">
                  ✦
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashIntro;
