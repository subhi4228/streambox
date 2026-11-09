import React, { useEffect, useState } from 'react';
import { 
  X, 
  Play, 
  Plus, 
  Check, 
  Star, 
  Clock, 
  Calendar, 
  Film, 
  Share2, 
  ExternalLink,
  Tv,
  Users
} from 'lucide-react';
import { useMovieModal } from '../context/MovieModalContext';
import { useWatchlist } from '../context/WatchlistContext';
import { getShowDetails, getBackdropUrl, getPosterUrl, stripHtml } from '../services/tvmaze';

export default function MovieModal() {
  const { selectedMovie, isOpen, closeModal } = useMovieModal();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Fetch full details and cast whenever selectedMovie changes
  useEffect(() => {
    if (!selectedMovie || !isOpen) {
      setDetails(null);
      return;
    }

    let isMounted = true;
    setLoading(true);

    getShowDetails(selectedMovie.id)
      .then((data) => {
        if (!isMounted) return;
        setDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load show modal details:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedMovie, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  if (!isOpen || !selectedMovie) return null;

  const currentItem = details || selectedMovie;
  const title = currentItem.name || currentItem.title || 'Untitled Show';
  const releaseYear = (currentItem.premiered || currentItem.release_date || currentItem.first_air_date || '').split('-')[0];
  const ratingVal = currentItem.rating?.average != null ? currentItem.rating.average : currentItem.vote_average;
  const rating = ratingVal != null && ratingVal !== 0 ? Number(ratingVal).toFixed(1) : null;
  const runtime = currentItem.runtime || currentItem.averageRuntime;
  const inList = isInWatchlist(selectedMovie.id);

  // Genres array of strings (e.g. ["Drama", "Science-Fiction"])
  const genres = Array.isArray(currentItem.genres) ? currentItem.genres : [];
  
  // Cast members
  const castList = currentItem.cast || currentItem._embedded?.cast || [];
  const topCast = castList.slice(0, 6);

  const backdropUrl = getBackdropUrl(currentItem);
  const posterUrl = getPosterUrl(currentItem);
  const summaryText = stripHtml(currentItem.summary) || currentItem.overview || 'No summary available for this show.';
  const networkName = currentItem.network?.name || currentItem.webChannel?.name;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={closeModal} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-zinc-100 max-h-[92vh] flex flex-col animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 backdrop-blur-md transition-all shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto flex-1">
          
          {/* Top Media Section: Backdrop Image with Gradient Overlay */}
          <div className="relative w-full aspect-video sm:h-[400px] bg-zinc-900 overflow-hidden">
            <img
              src={backdropUrl}
              alt={title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />

            {/* Poster & Title overlay in banner on small screens */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end gap-5">
              <div className="hidden sm:block w-28 sm:w-36 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-zinc-700/60 shrink-0 bg-zinc-900">
                <img
                  src={posterUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 max-w-xl">
                {networkName && (
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-rose-600/30 text-rose-300 border border-rose-500/40 backdrop-blur-md">
                    {networkName}
                  </span>
                )}
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {title}
                </h3>
              </div>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleWatchlist(selectedMovie)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all border ${
                    inList
                      ? 'bg-rose-600/20 border-rose-500/50 text-rose-300'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {inList ? (
                    <>
                      <Check className="w-4 h-4 text-rose-400" />
                      <span>In My List</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Add to List</span>
                    </>
                  )}
                </button>

                {currentItem.officialSite && (
                  <a
                    href={currentItem.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm bg-zinc-900 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-colors"
                  >
                    <span>Official Site</span>
                    <ExternalLink className="w-4 h-4 text-zinc-400" />
                  </a>
                )}
              </div>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-2 text-xs font-semibold"
                title="Share link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            {/* Meta Tags: Rating, Runtime, Premiered Year, Status */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              {rating && (
                <span className="flex items-center gap-1 font-bold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{rating} / 10</span>
                </span>
              )}

              {releaseYear && (
                <span className="flex items-center gap-1 text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{releaseYear}</span>
                </span>
              )}

              {runtime && (
                <span className="flex items-center gap-1 text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{runtime} mins</span>
                </span>
              )}

              {currentItem.status && (
                <span className="text-[11px] font-bold text-zinc-400 bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded">
                  {currentItem.status}
                </span>
              )}

              <span className="text-[11px] font-bold text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded">
                HD
              </span>

              {/* Genres Pills */}
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Summary
              </h4>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {summaryText}
              </p>
            </div>

            {/* Top Cast Section */}
            {topCast.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Cast
                  </h4>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {topCast.map((item, idx) => {
                    const personName = item.person?.name || item.name || 'Actor';
                    const charName = item.character?.name || 'Character';
                    return (
                      <div
                        key={item.person?.id || idx}
                        className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center"
                      >
                        <p className="text-xs font-semibold text-zinc-100 truncate">
                          {personName}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {charName}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
