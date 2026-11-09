import React from 'react';
import { Play, Info, Plus, Check, Star } from 'lucide-react';
import { getBackdropUrl, stripHtml } from '../services/tvmaze';
import { useMovieModal } from '../context/MovieModalContext';
import { useWatchlist } from '../context/WatchlistContext';

export default function HeroBanner({ movie }) {
  const { openModal } = useMovieModal();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (!movie) {
    return (
      <div className="relative w-full h-[65vh] min-h-[500px] bg-zinc-950 flex items-center justify-center animate-pulse">
        <div className="text-zinc-600 font-medium">Loading featured show...</div>
      </div>
    );
  }

  const title = movie.name || movie.title || 'Featured Show';
  const rawOverview = movie.overview || stripHtml(movie.summary);
  const overview = rawOverview || 'Explore acclaimed television series and trending shows in ultra high-definition on StreamBox.';
  const releaseYear = (movie.premiered || movie.release_date || movie.first_air_date || '').split('-')[0] || '';
  const rating = movie.rating?.average != null
    ? Number(movie.rating.average).toFixed(1)
    : (movie.vote_average ? Number(movie.vote_average).toFixed(1) : '8.4');
  const inList = isInWatchlist(movie.id);
  const backdropUrl = getBackdropUrl(movie);

  return (
    <div className="relative w-full h-[70vh] min-h-[520px] max-h-[850px] overflow-hidden select-none">
      
      {/* Background Backdrop Image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic multi-stop gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/60 via-transparent to-[#09090b]" />
      </div>

      {/* Hero Banner Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20 z-10">
        <div className="max-w-2xl space-y-4">
          
          {/* StreamBox Spotlight Badge */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-600/30 border border-rose-500/40 text-rose-300 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              SPOTLIGHT PREMIERE
            </span>

            {/* Rating badge */}
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {rating}
            </span>

            {/* Release Year */}
            {releaseYear && (
              <span className="text-xs font-medium text-zinc-300 bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
                {releaseYear}
              </span>
            )}

            {/* Quality pill */}
            <span className="text-[11px] font-bold text-zinc-300 border border-zinc-600 px-1.5 py-0.5 rounded">
              HD
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight drop-shadow-md leading-none">
            {title}
          </h1>

          {/* Overview / Synopsis */}
          <p className="text-zinc-300 text-sm sm:text-base md:text-lg line-clamp-3 leading-relaxed drop-shadow-sm font-normal">
            {overview}
          </p>

          {/* Action Buttons: Play / Details and More Info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            
            {/* Play Button */}
            <button
              onClick={() => openModal(movie)}
              className="flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 rounded-xl font-bold text-sm sm:text-base text-zinc-950 bg-white hover:bg-zinc-200 active:scale-95 transition-all shadow-xl shadow-white/10"
            >
              <Play className="w-5 h-5 fill-zinc-950 text-zinc-950" />
              <span>View Details</span>
            </button>

            {/* More Info Button */}
            <button
              onClick={() => openModal(movie)}
              className="flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-white bg-zinc-800/80 hover:bg-zinc-700/80 active:scale-95 transition-all backdrop-blur-md border border-white/15"
            >
              <Info className="w-5 h-5 text-zinc-300" />
              <span>More Info</span>
            </button>

            {/* Add to Watchlist */}
            <button
              onClick={() => toggleWatchlist(movie)}
              className={`p-3 rounded-xl border transition-all active:scale-90 ${
                inList
                  ? 'bg-rose-600/30 border-rose-500/60 text-rose-300'
                  : 'bg-zinc-900/70 border-white/15 text-zinc-300 hover:text-white hover:bg-zinc-800/80'
              }`}
              title={inList ? 'Remove from My List' : 'Add to My List'}
              aria-label="Toggle Watchlist"
            >
              {inList ? <Check className="w-5 h-5 text-rose-400" /> : <Plus className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
