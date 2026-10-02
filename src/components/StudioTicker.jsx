import React from 'react';

const TICKER_ITEMS = [
  { text: '3RD DAVNOR SHORT FILM FESTIVAL TOP 10 FINALIST', target: 'accolades', query: 'Player 4Ps' },
  { text: 'PANABO CITY, DAVAO DEL NORTE', target: 'about' },
  { text: 'THE HOUSE RULES (2024)', target: 'films', query: 'The House Rules' },
  { text: 'ANG TRABAHO NGA IKAW MASUNOD (2024)', target: 'films', query: 'Ang Trabaho' },
  { text: 'PAPA BEAR (2025) • BEST STORY & BEST ACTOR', target: 'films', query: 'Papa Bear' },
  { text: 'DUNGOG (2024) • EMIRATES FILM FESTIVAL SELECTION', target: 'films', query: 'Dungog' },
  { text: 'FOLLOW US @MAGNATESMEDIAPH', target: 'connect' },
  { text: 'INDIE MOCKUMENTARIES & SOCIAL DRAMAS', target: 'films' }
];

export function StudioTicker({ onSelectQuery }) {
  const handleClick = (item) => {
    if (item.query && onSelectQuery) {
      onSelectQuery(item.query);
    }
    if (item.target) {
      const el = document.getElementById(item.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside 
      aria-label="Studio News Wire" 
      className="w-full bg-[#0a0a0c] border-b border-black text-white select-none relative overflow-hidden flex items-center h-9 sm:h-10 shadow-sm z-30 marquee-wrapper"
    >
      {/* Marquee Track Container with Edge Vignettes */}
      <div className="relative w-full overflow-hidden h-full flex items-center">
        {/* Subtle Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

        {/* Track 1 */}
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {TICKER_ITEMS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleClick(item)}
              className="flex items-center gap-5 mx-4 text-[11px] sm:text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white cursor-pointer transition-colors"
              title={`View ${item.text}`}
            >
              <span>{item.text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033] flex-shrink-0" />
            </button>
          ))}
        </div>

        {/* Track 2 (Duplicate for Seamless Loop) */}
        <div className="animate-marquee whitespace-nowrap flex items-center" aria-hidden="true">
          {TICKER_ITEMS.map((item, idx) => (
            <button
              key={`dup-${idx}`}
              type="button"
              onClick={() => handleClick(item)}
              className="flex items-center gap-5 mx-4 text-[11px] sm:text-xs font-black uppercase tracking-widest text-zinc-300 hover:text-white cursor-pointer transition-colors"
              tabIndex={-1}
            >
              <span>{item.text}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff0033] flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default StudioTicker;
