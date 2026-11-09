import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Film, Trash2, ArrowRight } from 'lucide-react';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';

export default function MyList() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Bookmark className="w-5 h-5 fill-rose-500/30" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Watchlist
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              {watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'} saved for later
            </p>
          </div>
        </div>

        {watchlist.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Clear all titles from your watchlist?')) {
                localStorage.removeItem('STREAMBOX_WATCHLIST');
                window.location.reload();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-rose-400 hover:bg-rose-950/20 border border-zinc-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear List</span>
          </button>
        )}
      </div>

      {/* Grid of Saved Movies */}
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-24 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 shadow-xl">
            <Film className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">Your Watchlist is empty</h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Click the <span className="text-rose-400 font-semibold">+</span> button on any movie card or hero banner to save titles you want to watch later.
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-zinc-950 bg-white hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
            >
              <span>Explore StreamBox</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
