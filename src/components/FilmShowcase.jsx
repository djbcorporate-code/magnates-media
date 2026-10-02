import React, { useState, useMemo } from 'react';
import { Film, Play, Clock, ChevronRight } from 'lucide-react';
import { FILMS_DATA } from '../data/films';

export function FilmShowcase({ onSelectFilm, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Festival Selection', 'Mockumentary', 'Short Films'];

  const filteredFilms = useMemo(() => {
    return FILMS_DATA.filter((film) => {
      // Category match
      const categoryMatch = selectedCategory === 'All' || film.category === selectedCategory;

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query || query === '@magnatesmediaph' || query === 'mm.ph' || query === '@mm.ph') {
        return categoryMatch;
      }
      const titleMatch = film.title.toLowerCase().includes(query);
      const genreMatch = film.genre.toLowerCase().includes(query);
      const descMatch = film.synopsis.toLowerCase().includes(query);
      const castMatch = film.cast.some((c) => c.toLowerCase().includes(query));
      const yearMatch = film.year.includes(query);

      return categoryMatch && (titleMatch || genreMatch || descMatch || castMatch || yearMatch);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="films" className="py-20 relative bg-[#edebe4] border-b border-black/10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-[#ff0033] text-xs font-black tracking-widest uppercase block mb-1">
              Independent Filmography
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-black">
              The Screening Room
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-medium max-w-xl mt-2">
              Original short films, mockumentaries, and festival contenders produced by the Panabo City filmmaking collective.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white/90 p-1.5 rounded-2xl border border-black/10 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-md'
                    : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Films Grid */}
        {filteredFilms.length === 0 ? (
          <div className="text-center py-16 bg-white/70 rounded-3xl border border-black/10 p-8 shadow-sm">
            <Film className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-black text-lg font-bold">No films match your search</h3>
            <p className="text-zinc-600 text-sm mt-1">Try searching for "Mockumentary", "DavNor", or reset the filter.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-5 py-2 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff0033] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFilms.map((film) => (
              <div
                key={film.id}
                className="group relative rounded-3xl overflow-hidden bg-white border border-black/10 hover:border-black transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] flex flex-col"
              >
                {/* Poster / Thumbnail Area */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={film.thumbnail}
                    alt={film.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
                  />
                  
                  {/* Ultra-subtle Bottom Vignette so thumbnail remains fully visible */}
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

                  {/* Top Badges: Year, Category & Platform */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-white text-[11px] font-black tracking-wider">
                      {film.year}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-black text-[11px] font-bold border border-black/10">
                      {film.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-sm border ${
                      film.platform === 'facebook'
                        ? 'bg-[#1877f2]/90 text-white border-white/20'
                        : 'bg-[#ff0033]/90 text-white border-white/20'
                    }`}>
                      {film.platform === 'facebook' ? 'Facebook Video' : 'YouTube'}
                    </span>
                  </div>

                  {/* Play Trailer Trigger Button */}
                  <button
                    onClick={() => onSelectFilm(film)}
                    className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/35 backdrop-blur-[1px] cursor-pointer"
                    title="Click to play film"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#ff0033] text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,0,51,0.8)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                  </button>

                  {/* Festival Laurel Tag as slim, transparent cinema strip */}
                  {film.laurel && (
                    <div className="absolute bottom-2.5 left-2.5 max-w-[85%] z-10 pointer-events-none">
                      <div className="inline-flex items-center px-2 py-0.5 bg-black/40 backdrop-blur-md border-l-2 border-amber-400/90 text-amber-300 text-[9px] font-black tracking-wider uppercase rounded-r shadow-sm">
                        <span className="truncate">{film.laurel}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                      <span className="font-extrabold text-[#ff0033] tracking-wide">{film.genre}</span>
                      <span className="flex items-center gap-1 font-bold text-zinc-700">
                        <Clock className="w-3 h-3" />
                        {film.duration}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-black text-black tracking-wide uppercase group-hover:text-[#ff0033] transition-colors leading-tight">
                      {film.title}
                    </h3>

                    <p className="text-zinc-800 text-xs sm:text-sm font-semibold italic mt-2.5">
                      "{film.tagline}"
                    </p>

                    <p className="text-zinc-600 text-xs leading-relaxed mt-2.5 line-clamp-3">
                      {film.synopsis}
                    </p>
                  </div>

                  {/* Crew & Action Bar */}
                  <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                    <div className="text-xs text-zinc-600 truncate mr-3">
                      <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">Director / Crew</span>
                      <span className="text-black font-extrabold truncate">{film.director}</span>
                    </div>

                    <button
                      onClick={() => onSelectFilm(film)}
                      className="px-4 py-2 rounded-xl bg-black hover:bg-[#ff0033] text-white text-xs font-black tracking-wider uppercase transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow group-hover:shadow-[0_0_15px_rgba(255,0,51,0.4)]"
                    >
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
