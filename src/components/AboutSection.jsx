import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Users, Video, Heart, Check, ExternalLink, X, ZoomIn, Clapperboard, 
  ChevronLeft, ChevronRight, Play, Pause 
} from 'lucide-react';
import { TEAM_MEMBERS, KEY_COLLABORATORS } from '../data/films';

// 3 cloned sets of TEAM_MEMBERS to create a seamless infinite rolling track
const DISPLAY_MEMBERS = [...TEAM_MEMBERS, ...TEAM_MEMBERS, ...TEAM_MEMBERS];

export function AboutSection() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isAutoRolling, setIsAutoRolling] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Slow, calm, cinematic baseline rolling speed (pixels per second)
  const SLOW_ROLL_SPEED = 24;

  const carouselRef = useRef(null);
  const singleSetWidthRef = useRef(0);
  const scrollPosRef = useRef(0);
  const lastTickTimeRef = useRef(0);
  const activeCardIndexRef = useRef(0);
  const lastActiveIndexTimeRef = useRef(0);

  const isPointerDownRef = useRef(false);
  const hasMovedRef = useRef(false);
  const justDraggedRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const moveHistoryRef = useRef([]);
  const velocityRef = useRef(0);
  const rafIdRef = useRef(null);
  const isHoveredRef = useRef(false);
  const autoRollEnabledRef = useRef(true);
  const selectedMemberModalRef = useRef(false);

  const pillars = [
    {
      title: 'Grassroots Authenticity',
      desc: 'Grounding stories in real regional Filipino realities—from working-class dignity in "Ang Trabaho Nga Ikaw Masunod" to community vigilance in "Player 4Ps".',
      icon: Heart,
      color: 'bg-red-500/10 text-[#ff0033]'
    },
    {
      title: 'Genre Innovation & Humor',
      desc: 'Pioneering mockumentary and deadpan comedy in the local scene with works like "The House Rules", balancing entertainment with razor-sharp social wit.',
      icon: Video,
      color: 'bg-amber-500/10 text-amber-600'
    },
    {
      title: 'Mindanao Creative Empowerment',
      desc: 'Providing a stage for young Panabo actors, writers, editors, and directors to hone their craft and compete head-to-head on provincial and national film festival stages.',
      icon: Users,
      color: 'bg-blue-500/10 text-blue-600'
    }
  ];

  // Keep ref synced with modal state to pause animation when modal is active
  useEffect(() => {
    selectedMemberModalRef.current = !!selectedMember;
  }, [selectedMember]);

  // Measure single set width of 9 cards from DOM elements
  const measureSetWidth = useCallback(() => {
    if (!carouselRef.current) return 0;
    const children = carouselRef.current.children;
    if (children && children.length >= TEAM_MEMBERS.length * 2) {
      const card0 = children[0];
      const cardN = children[TEAM_MEMBERS.length];
      if (card0 && cardN) {
        const width = cardN.offsetLeft - card0.offsetLeft;
        if (width > 0) {
          singleSetWidthRef.current = width;
          return width;
        }
      }
    }
    return 0;
  }, []);

  // Wrap scroll position seamlessly to prevent hitting boundaries
  const wrapScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const setWidth = singleSetWidthRef.current || measureSetWidth();
    if (!setWidth || setWidth <= 0) return;

    // Scrolled past middle set into set 2 -> wrap back by one set
    if (scrollPosRef.current >= setWidth * 2) {
      scrollPosRef.current -= setWidth;
      carouselRef.current.scrollLeft = scrollPosRef.current;
    } 
    // Scrolled back into set 0 -> wrap forward by one set
    else if (scrollPosRef.current <= setWidth * 0.2) {
      scrollPosRef.current += setWidth;
      carouselRef.current.scrollLeft = scrollPosRef.current;
    }
  }, [measureSetWidth]);

  // Update active card indicator (throttled, only updates React state on real changes)
  const updateActiveIndex = useCallback(() => {
    if (!carouselRef.current) return;
    const setWidth = singleSetWidthRef.current || measureSetWidth();
    if (!setWidth || setWidth <= 0) return;

    const cardWidth = setWidth / TEAM_MEMBERS.length;
    const centerOffset = carouselRef.current.clientWidth / 2;
    const currentCenter = (scrollPosRef.current || carouselRef.current.scrollLeft) + centerOffset;

    const normalized = ((currentCenter % setWidth) + setWidth) % setWidth;
    const idx = Math.floor(normalized / cardWidth) % TEAM_MEMBERS.length;

    if (idx !== activeCardIndexRef.current) {
      activeCardIndexRef.current = idx;
      setActiveCardIndex(idx);
    }
  }, [measureSetWidth]);

  // Buttery-smooth delta-time physics animation loop
  const startPhysicsLoop = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const tick = (now) => {
      if (!carouselRef.current) return;
      if (isPointerDownRef.current) {
        lastTickTimeRef.current = now;
        return;
      }

      // Pause animation if modal is open
      if (selectedMemberModalRef.current) {
        lastTickTimeRef.current = now;
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      // Delta-time in seconds (capped at 0.05s to prevent jump after tab switch)
      const dt = Math.min((now - lastTickTimeRef.current) / 1000, 0.05);
      lastTickTimeRef.current = now;

      const isHovered = isHoveredRef.current;
      const autoRoll = autoRollEnabledRef.current;
      const targetSpeed = autoRoll && !isHovered ? SLOW_ROLL_SPEED : 0;

      let currentVel = velocityRef.current; // in pixels per second

      // Silky cushioned exponential decay towards target speed
      const friction = Math.pow(0.965, dt * 60);
      currentVel = targetSpeed + (currentVel - targetSpeed) * friction;

      if (Math.abs(currentVel - targetSpeed) < 0.6) {
        currentVel = targetSpeed;
      }

      velocityRef.current = currentVel;

      if (Math.abs(currentVel) > 0.1) {
        scrollPosRef.current += currentVel * dt;
        wrapScroll();
        carouselRef.current.scrollLeft = scrollPosRef.current;

        // Throttle indicator index checks to once every 120ms to keep 60/120fps fluid
        if (now - lastActiveIndexTimeRef.current > 120) {
          lastActiveIndexTimeRef.current = now;
          updateActiveIndex();
        }

        rafIdRef.current = requestAnimationFrame(tick);
      } else if (targetSpeed > 0) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        velocityRef.current = 0;
        rafIdRef.current = null;
      }
    };

    lastTickTimeRef.current = performance.now();
    rafIdRef.current = requestAnimationFrame(tick);
  }, [wrapScroll, updateActiveIndex]);

  // Initialize carousel on mount: center into middle set and start rolling loop
  useEffect(() => {
    const init = () => {
      const width = measureSetWidth();
      if (width > 0 && carouselRef.current) {
        if (carouselRef.current.scrollLeft < 10) {
          carouselRef.current.scrollLeft = width;
          scrollPosRef.current = width;
        } else {
          scrollPosRef.current = carouselRef.current.scrollLeft;
        }
      }
      updateActiveIndex();
    };

    init();
    const timer1 = setTimeout(init, 100);
    const timer2 = setTimeout(init, 400);
    window.addEventListener('resize', init);

    lastTickTimeRef.current = performance.now();
    startPhysicsLoop();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', init);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [measureSetWidth, updateActiveIndex, startPhysicsLoop]);

  // Pointer Down (Mouse or Touch Start)
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // Immediately stop momentum loop while user has hold of carousel
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    velocityRef.current = 0;

    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    setIsDragging(true);

    if (carouselRef.current) {
      scrollPosRef.current = carouselRef.current.scrollLeft;
    }

    const clientX = e.clientX;
    startXRef.current = clientX;
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
    moveHistoryRef.current = [{ x: clientX, t: performance.now() }];

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  // Pointer Move (Mouse Drag or Touch Move)
  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current || !carouselRef.current) return;

    const clientX = e.clientX;
    const now = performance.now();
    const dx = clientX - lastXRef.current;
    const totalDx = Math.abs(clientX - startXRef.current);

    if (totalDx > 6) {
      hasMovedRef.current = true;
    }

    // Scroll 1:1 with hand movement
    scrollPosRef.current -= dx;
    wrapScroll();
    carouselRef.current.scrollLeft = scrollPosRef.current;

    lastXRef.current = clientX;
    lastTimeRef.current = now;

    // Track recent positions for velocity calculation (last 100ms)
    moveHistoryRef.current.push({ x: clientX, t: now });
    const cutoff = now - 100;
    moveHistoryRef.current = moveHistoryRef.current.filter(item => item.t >= cutoff);
  };

  // Pointer Up / Cancel (Release Flick)
  const handlePointerUp = (e) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}

    const now = performance.now();
    const history = moveHistoryRef.current;
    let flickVel = 0; // px per millisecond

    if (history.length >= 2) {
      const first = history[0];
      const last = history[history.length - 1];
      const dt = last.t - first.t;
      const dx = last.x - first.x;

      // If user released while moving (within 90ms)
      if (now - last.t < 90 && dt > 12) {
        // Swiping left (dx < 0) rolls right (positive velocity)
        flickVel = -dx / dt;
      }
    }

    // Suppress card clicks if user dragged or flicked
    if (hasMovedRef.current) {
      justDraggedRef.current = true;
      setTimeout(() => {
        justDraggedRef.current = false;
        hasMovedRef.current = false;
      }, 120);
    }

    // Convert flick velocity (px/ms) to smooth, cushioned px/s (calm and controlled)
    const flickSpeed = Math.max(-850, Math.min(850, flickVel * 420));

    if (Math.abs(flickVel) > 0.08) {
      velocityRef.current = flickSpeed;
    } else {
      velocityRef.current = autoRollEnabledRef.current ? SLOW_ROLL_SPEED : 0;
    }

    lastTickTimeRef.current = performance.now();
    startPhysicsLoop();
  };

  // Hover handlers: pause auto-roll while hovering so cards can be inspected comfortably
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (autoRollEnabledRef.current && !isPointerDownRef.current) {
      lastTickTimeRef.current = performance.now();
      startPhysicsLoop();
    }
  };

  // Arrow button click: gives a smooth rolling impulse in either direction (in px/s)
  const handleArrowScroll = (direction) => {
    const impulse = direction === 'left' ? -360 : 360;
    velocityRef.current = impulse;
    lastTickTimeRef.current = performance.now();
    startPhysicsLoop();
  };

  // Toggle ambient auto-roll
  const toggleAutoRoll = () => {
    const next = !isAutoRolling;
    setIsAutoRolling(next);
    autoRollEnabledRef.current = next;
    if (next) {
      velocityRef.current = SLOW_ROLL_SPEED;
      lastTickTimeRef.current = performance.now();
      startPhysicsLoop();
    }
  };

  // Click on a pagination dot: roll smoothly towards that member
  const handleDotClick = useCallback((targetIdx) => {
    if (!carouselRef.current) return;
    const setWidth = singleSetWidthRef.current || measureSetWidth();
    if (!setWidth) return;

    const cardWidth = setWidth / TEAM_MEMBERS.length;
    const centerOffset = carouselRef.current.clientWidth / 2;
    const currentCenter = (scrollPosRef.current || carouselRef.current.scrollLeft) + centerOffset;
    const normalized = ((currentCenter % setWidth) + setWidth) % setWidth;
    const currentIdx = Math.floor(normalized / cardWidth) % TEAM_MEMBERS.length;

    let diff = targetIdx - currentIdx;
    if (diff > 4) diff -= 9;
    if (diff < -4) diff += 9;

    velocityRef.current = diff * 110; // in px/s
    lastTickTimeRef.current = performance.now();
    startPhysicsLoop();
  }, [measureSetWidth, startPhysicsLoop]);

  return (
    <section id="about" className="py-20 relative bg-[#edebe4] border-b border-black/10 overflow-hidden text-zinc-900">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Story, Mission & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Story & Mission */}
          <div className="lg:col-span-7 space-y-6">
            
            <span className="text-[#ff0033] text-xs font-black uppercase tracking-widest block font-mono">
              Panabo City, Davao del Norte • Est. Creative Collective
            </span>

            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-black leading-none">
              Born from Passion. <br />
              <span className="text-zinc-600">Powered by Community.</span>
            </h2>

            <p className="text-zinc-800 text-base sm:text-lg leading-relaxed font-medium">
              <strong className="text-black font-extrabold">Magnates Media</strong> is a collective of young, visionary filmmakers based in Panabo City, Philippines. We believe compelling cinema doesn’t require million-peso studio budgets—it requires bold ideas, raw emotion, and an unshakeable connection to the local people and places we portray.
            </p>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed font-normal">
              From our breakout festival entry <span className="text-black font-bold">"Player 4Ps"</span> which earned a Top 10 spot at the 3rd DavNor Short Film Festival, to audience favorites like <span className="text-black font-bold">"The House Rules"</span>, our productions span mockumentary satire, gripping social realism, and community advocacy.
            </p>

            {/* Quick check badges in white paper card style */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-800">
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white border border-black/10 shadow-sm font-semibold">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Panabo Youth Directing & Writing</span>
              </div>
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white border border-black/10 shadow-sm font-semibold">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Full Guerilla Post-Production</span>
              </div>
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white border border-black/10 shadow-sm font-semibold">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Community Casting & Talents</span>
              </div>
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white border border-black/10 shadow-sm font-semibold">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Film Festival Competitions</span>
              </div>
            </div>

          </div>

          {/* Right Column: Three Pillars & Collective Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-black/15 shadow-sm hover:border-black transition-all hover:translate-x-1"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${pillar.color} flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-black uppercase tracking-wider text-black">
                        {pillar.title}
                      </h3>
                      <p className="text-zinc-600 text-xs sm:text-sm mt-1 leading-relaxed font-medium">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Quote Card in High-Contrast Studio Black */}
            <div className="p-6 rounded-2xl bg-[#0a0a0c] text-white border-2 border-black text-center shadow-lg">
              <span className="text-[10px] uppercase tracking-widest text-[#ff0033] font-black block mb-1 font-mono">
                Studio Promise
              </span>
              <p className="text-white text-sm font-bold italic">
                "To tell stories that make Panabo proud and keep audiences craving the next frame."
              </p>
            </div>

          </div>

        </div>

        {/* Studio Perforation Separator */}
        <div className="w-full h-px bg-black/15 my-12 relative flex items-center justify-center">
          <span className="px-4 py-1 rounded-full bg-[#edebe4] border border-black/20 text-[10px] font-mono font-black uppercase tracking-widest text-zinc-600 shadow-xs">
            Official Production Roster
          </span>
        </div>

        {/* SECTION: The Persons Behind Magnates Media (Rolling Carousel Showcase) */}
        <div id="team" className="pt-4">
          
          {/* Section Heading & Quote from Official Post */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-black leading-tight">
                The Persons Behind Magnates Media
              </h2>
              <p className="text-zinc-700 text-sm sm:text-base mt-2 font-medium leading-relaxed">
                "A talented team shaping every story with precision and heart. Each member, from concept to creation, brings something invaluable to the table. They’re the quiet forces behind the stories you love."
              </p>
            </div>

            {/* Carousel Controls & Direct Facebook Action */}
            <div className="flex items-center gap-3 self-start md:self-auto flex-shrink-0">
              
              {/* Carousel Physics & Navigation Controls */}
              <div className="flex items-center gap-2">
                {/* Left Impulse Button */}
                <button
                  onClick={() => handleArrowScroll('left')}
                  className="w-10 h-10 rounded-full border-2 border-black bg-white hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Roll Backward"
                  title="Roll Left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Auto-Roll Play/Pause Toggle */}
                <button
                  onClick={toggleAutoRoll}
                  className={`h-10 px-3.5 rounded-full border-2 border-black flex items-center gap-1.5 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                    isAutoRolling 
                      ? 'bg-black text-white hover:bg-[#ff0033] hover:border-[#ff0033]' 
                      : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                  aria-label={isAutoRolling ? 'Pause Auto-Roll' : 'Start Auto-Roll'}
                  title={isAutoRolling ? 'Pause Rolling' : 'Resume Auto-Rolling'}
                >
                  {isAutoRolling ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">Roll</span>
                    </>
                  )}
                </button>

                {/* Right Impulse Button */}
                <button
                  onClick={() => handleArrowScroll('right')}
                  className="w-10 h-10 rounded-full border-2 border-black bg-white hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95"
                  aria-label="Roll Forward"
                  title="Roll Right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Direct Facebook Link Button */}
              <a
                href="https://www.facebook.com/share/p/1HaV9peNQm/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff0033] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-xl cursor-pointer"
                title="Open Behind the Lens post on Facebook"
              >
                <span>View Post on Facebook</span>
                <ExternalLink className="w-4 h-4" />
              </a>

            </div>
          </div>

          {/* Rolling Carousel Viewport: Infinite Continuous Row with Momentum Flick Physics */}
          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div
              ref={carouselRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className={`flex gap-5 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none select-none ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ 
                touchAction: 'pan-y',
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'auto',
                willChange: 'scroll-position'
              }}
            >
              {DISPLAY_MEMBERS.map((member, index) => {
                const memberNumber = String((index % TEAM_MEMBERS.length) + 1).padStart(2, '0');
                const isCenter = activeCardIndex === (index % TEAM_MEMBERS.length);

                return (
                  <div
                    key={`${member.id}-set-${Math.floor(index / TEAM_MEMBERS.length)}-${index}`}
                    onClick={() => {
                      if (justDraggedRef.current || hasMovedRef.current) return;
                      setSelectedMember(member);
                    }}
                    className={`w-[260px] sm:w-[280px] md:w-[290px] flex-shrink-0 group relative rounded-3xl overflow-hidden bg-white border-2 border-black transition-all duration-300 flex flex-col cursor-pointer ${
                      isCenter 
                        ? 'shadow-xl -translate-y-1 border-black ring-2 ring-[#ff0033]/30' 
                        : 'shadow-md hover:shadow-2xl hover:-translate-y-1.5'
                    }`}
                  >
                    {/* Contact Slate Top Header */}
                    <div className="px-3.5 py-2 bg-[#0a0a0c] text-white border-b border-black flex items-center justify-between font-mono text-[10px] tracking-wider uppercase">
                      <span className="flex items-center gap-1.5 text-zinc-300 font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#ff0033]" />
                        MM // {memberNumber}
                      </span>
                      <span className="text-zinc-400 font-semibold">{member.name}</span>
                    </div>

                    {/* Portrait Poster Container (2:3 Aspect Ratio) */}
                    <div className="relative aspect-[2/3] bg-[#0a0a0c] overflow-hidden">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        draggable={false}
                        className="w-full h-full object-cover filter contrast-105 group-hover:scale-104 transition-transform duration-500 pointer-events-none"
                      />

                      {/* Halftone film texture overlay */}
                      <div className="absolute inset-0 bg-halftone-dark opacity-15 pointer-events-none mix-blend-overlay" />

                      {/* Quick FB Post Link on Card */}
                      <a
                        href={member.facebookPost}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (justDraggedRef.current || hasMovedRef.current) {
                            e.preventDefault();
                          }
                        }}
                        className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-white/95 hover:bg-[#ff0033] hover:text-white backdrop-blur-md text-[10px] font-black text-black border border-black/20 flex items-center gap-1 shadow-md transition-colors cursor-pointer"
                        title="View on Facebook"
                      >
                        <span>FB</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Hover Inspect Indicator */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="p-3 rounded-full bg-white text-black shadow-2xl flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider">
                          <ZoomIn className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Information */}
                    <div className="p-4 bg-white flex-1 flex flex-col justify-between border-t border-black/10">
                      <div>
                        <h3 className="font-display text-2xl font-black uppercase tracking-tight text-black group-hover:text-[#ff0033] transition-colors leading-tight">
                          {member.name}
                        </h3>
                        <div className="text-[11px] font-black text-[#ff0033] uppercase font-mono tracking-wide mt-1 leading-snug">
                          {member.role}
                        </div>
                        {member.subRole && (
                          <div className="text-[10px] font-bold text-zinc-500 uppercase font-mono tracking-tight mt-0.5">
                            {member.subRole}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span className="truncate">{member.credits}</span>
                        <span className="text-[#ff0033] font-bold group-hover:underline flex-shrink-0 ml-1">
                          View →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Dot Navigator */}
          <div className="flex justify-center mt-3 text-xs font-mono text-zinc-600">
            <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-full border border-black/10 shadow-xs">
              {TEAM_MEMBERS.map((member, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeCardIndex === i 
                      ? 'w-7 bg-[#ff0033]' 
                      : 'w-2 bg-black/20 hover:bg-black/50'
                  }`}
                  aria-label={`Jump to ${member.name}`}
                  title={`${i + 1}. ${member.name} (${member.role})`}
                />
              ))}
            </div>
          </div>

          {/* Call Sheet Footer: Studio Attribution & Extended Collaborators */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0a0a0c] text-white border-2 border-black shadow-2xl relative overflow-hidden">
            {/* Subtle darkroom grid background accent */}
            <div className="absolute inset-0 bg-halftone-dark opacity-10 pointer-events-none mix-blend-overlay" />

            {/* Studio Identity Header */}
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#ff0033] text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,0,51,0.4)] border border-white/20">
                  <Clapperboard className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#ff0033]">
                      Production Call Sheet • Studio Unit
                    </span>
                  </div>
                  <h4 className="font-display text-2xl sm:text-3xl text-white uppercase tracking-wider font-black">
                    Magnates Media Films
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm font-medium mt-0.5">
                    Based in Panabo City, Davao del Norte • A subsidiary of DJB Group of Companies, Inc.
                  </p>
                </div>
              </div>
            </div>

            {/* Extended Collaborator Credits */}
            <div className="mt-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-black uppercase tracking-widest text-[#ff0033] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033]" />
                  Key Film Collaborators & Featured Cast
                </span>
                <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider hidden sm:inline">
                  Festival Cast & Creative Unit
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {KEY_COLLABORATORS.map((collab, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-zinc-900/90 border border-white/15 hover:border-[#ff0033] hover:bg-zinc-900 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div>
                      {/* Top Slate & Project Tag */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] font-mono">
                        <span className="text-zinc-500 font-bold">CREDIT // 0{idx + 1}</span>
                        {collab.project && (
                          <span className="px-2 py-0.5 rounded-md bg-white/10 text-zinc-300 font-bold tracking-tight truncate max-w-[120px]">
                            {collab.project}
                          </span>
                        )}
                      </div>

                      {/* Name & Role */}
                      <div className="mt-3">
                        <div className="font-display text-lg font-black text-white group-hover:text-[#ff0033] transition-colors leading-tight">
                          {collab.name}
                        </div>
                        <div className="text-[#ff0033] font-mono text-[10px] uppercase font-bold tracking-wider mt-1">
                          {collab.role}
                        </div>
                      </div>

                      {/* Contribution Synopsis */}
                      <p className="text-zinc-300 text-xs mt-2.5 leading-relaxed font-normal">
                        {collab.contribution}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>Panabo Indie Unit</span>
                      <span className="text-zinc-400 group-hover:text-white transition-colors">Verified ✓</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Call Sheet Perforation Note */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-zinc-500 relative z-10">
              <span>Filmed on location in Mindanao, Philippines • Magnates Media Creative Division</span>
              <span className="text-zinc-400">DJB Group of Companies, Inc. • All Rights Reserved</span>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal for Individual Portrait Posters */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="relative max-w-md w-full bg-white rounded-3xl overflow-hidden border-2 border-black shadow-2xl text-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#0a0a0c] text-white flex items-center justify-between border-b border-black font-mono">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff0033]" />
                BEHIND THE LENS // {selectedMember.name}
              </span>
              <button
                onClick={() => setSelectedMember(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#ff0033] text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Poster Image */}
            <div className="relative aspect-[2/3] bg-black overflow-hidden">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Details & Action */}
            <div className="p-5 sm:p-6 bg-white">
              <div className="flex items-center justify-between gap-4 pb-3 border-b border-zinc-200">
                <div>
                  <h3 className="font-display text-2xl font-black text-black">
                    {selectedMember.name}
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#ff0033] uppercase block mt-0.5">
                    {selectedMember.role}
                  </span>
                  {selectedMember.subRole && (
                    <span className="text-[11px] font-mono text-zinc-500 block">
                      {selectedMember.subRole}
                    </span>
                  )}
                </div>

                <a
                  href={selectedMember.facebookPost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ff0033] hover:bg-black text-white text-xs font-black uppercase tracking-wider transition-colors shadow-md cursor-pointer flex-shrink-0"
                >
                  <span>View FB Post</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-zinc-700 text-xs sm:text-sm mt-3 font-medium leading-relaxed">
                {selectedMember.description}
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
