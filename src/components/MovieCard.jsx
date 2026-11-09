import React from 'react';
import { Play, Plus, Check, Star } from 'lucide-react';
import { getPosterUrl } from '../services/tvmaze';
import { useMovieModal } from '../context/MovieModalContext';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieCard({ movie, isPriority = false }) {
  const { openModal } = useMovieModal();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (!movie) return null;

  const title = movie.name || movie.title || 'Untitled';
  const releaseYear = (movie.premiered || movie.release_date || movie.first_air_date || '').split('-')[0] || '';
  const ratingVal = movie.rating?.average != null ? movie.rating.average : movie.vote_average;
  const rating = ratingVal != null && ratingVal !== 0 ? Number(ratingVal).toFixed(1) : null;
  const inList = isInWatchlist(movie.id);
  const posterUrl = getPosterUrl(movie);

  return (
    <div
      onClick={() => openModal(movie)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(movie);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
      className="group relative flex-none w-[150px] sm:w-[185px] md:w-[210px] aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 cursor-pointer select-none transition-all duration-300 transform hover:scale-[1.06] hover:z-20 hover:shadow-2xl hover:shadow-rose-950/40 border border-zinc-800/80 hover:border-rose-500/50 outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
    >
      {/* Poster Image */}
      <img
        src={posterUrl}
        alt={title}
        loading={isPriority ? 'eager' : 'lazy'}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Subtle bottom gradient on normal state */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity" />

      {/* Hover Card Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-zinc-950/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3.5 sm:p-4">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          {rating ? (
            <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {rating}
            </span>
          ) : <span />}

          <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-zinc-700">
            HD
          </span>
        </div>

        {/* Center Quick Play / Details Trigger */}
        <div className="flex items-center justify-center py-2">
          <div className="w-11 h-11 rounded-full bg-rose-600 group-hover:bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-950/60 transform transition-transform group-hover:scale-110">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Details & Quick Actions */}
        <div className="space-y-1.5">
          <h4 className="text-white text-xs sm:text-sm font-bold line-clamp-1 group-hover:text-rose-200 transition-colors">
            {title}
          </h4>

          <div className="flex items-center justify-between text-[11px] text-zinc-400">
            <span>{releaseYear || 'Show'}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(movie);
              }}
              className={`p-1.5 rounded-full border transition-colors ${
                inList
                  ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                  : 'bg-zinc-800/80 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700'
              }`}
              title={inList ? 'Remove from My List' : 'Add to My List'}
              aria-label="Toggle Watchlist"
            >
              {inList ? <Check className="w-3.5 h-3.5 text-rose-400" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
