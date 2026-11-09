import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

export default function MovieRow({ title, movies = [], icon: Icon, viewAllPath, isLoading = false }) {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, [movies]);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 350);
    }
  };

  if (!isLoading && (!movies || movies.length === 0)) {
    return null;
  }

  return (
    <section className="relative py-4 sm:py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto group/row">
      
      {/* Row Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <span className="text-xs font-semibold text-zinc-500 ml-1">
            {movies.length > 0 && `(${movies.length})`}
          </span>
        </div>

        {viewAllPath && (
          <Link
            to={viewAllPath}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-rose-400 hover:text-rose-300 transition-colors group/link"
          >
            <span>Explore all</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* Row Carousel Container */}
      <div className="relative">
        
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-4 z-30 w-9 h-14 sm:w-11 sm:h-20 bg-zinc-950/85 hover:bg-zinc-900 border border-zinc-700/60 text-white rounded-r-xl flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 shadow-xl backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-4 z-30 w-9 h-14 sm:w-11 sm:h-20 bg-zinc-950/85 hover:bg-zinc-900 border border-zinc-700/60 text-white rounded-l-xl flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 shadow-xl backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Horizontal Scrolling Items */}
        <div
          ref={rowRef}
          onScroll={checkScrollButtons}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-hide py-2 scroll-smooth"
        >
          {isLoading ? (
            // Skeleton Loaders
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="flex-none w-[150px] sm:w-[185px] md:w-[210px] aspect-[2/3] rounded-xl bg-zinc-900 animate-pulse border border-zinc-800"
              />
            ))
          ) : (
            movies.map((movie, index) => (
              <MovieCard
                key={`${movie.id}-${index}`}
                movie={movie}
                isPriority={index < 4}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}
