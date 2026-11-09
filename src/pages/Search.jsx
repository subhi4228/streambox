import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X, Film, Sparkles, Smile, Zap } from 'lucide-react';
import { searchShows } from '../services/tvmaze';
import MovieCard from '../components/MovieCard';

const QUICK_SEARCHES = [
  'Breaking Bad',
  'Stranger Things',
  'Game of Thrones',
  'The Office',
  'Rick and Morty',
  'Westworld',
  'The Boys',
  'Drama',
  'Comedy',
  'Sci-Fi',
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genreFilter, setGenreFilter] = useState('all');

  // Sync with URL query parameter
  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
  }, [searchParams]);

  // Debounced search trigger using https://api.tvmaze.com/search/shows?q=
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      searchShows(query.trim())
        .then((data) => {
          setResults(data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error('TVMaze search query failed:', err);
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleQuickSearch = (term) => {
    setQuery(term);
    setSearchParams({ q: term });
  };

  const handleClear = () => {
    setQuery('');
    setSearchParams({});
    setResults([]);
  };

  // Filter results by selected genre
  const filteredResults = results.filter((item) => {
    if (genreFilter === 'all') return true;
    if (!item.genres || !Array.isArray(item.genres)) return false;
    return item.genres.some((g) => {
      const lower = g.toLowerCase();
      if (genreFilter === 'sci-fi') return lower.includes('sci-fi') || lower.includes('science');
      return lower === genreFilter.toLowerCase();
    });
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Search StreamBox
        </h1>
        <p className="text-sm text-zinc-400">
          Find shows, series, genres, and cast across the TVMaze catalog.
        </p>

        {/* Search Bar Input */}
        <div className="relative">
          <div className="flex items-center bg-zinc-900 border border-zinc-700/80 focus-within:border-rose-500 rounded-2xl px-4 py-3.5 shadow-2xl transition-all">
            <SearchIcon className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search by show title, genre, keyword..."
              value={query}
              onChange={handleInputChange}
              autoFocus
              className="w-full bg-transparent text-base sm:text-lg text-white placeholder-zinc-500 outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-400" />
            Popular:
          </span>
          {QUICK_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => handleQuickSearch(term)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs if results or query present */}
      {query.trim() && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4 mb-6">
          <div className="text-sm text-zinc-400">
            {loading ? (
              <span>Searching for "{query}"...</span>
            ) : (
              <span>
                Found <span className="font-bold text-white">{filteredResults.length}</span> titles for "{query}"
              </span>
            )}
          </div>

          {/* Genre Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
            {['all', 'drama', 'comedy', 'action', 'sci-fi'].map((genre) => (
              <button
                key={genre}
                onClick={() => setGenreFilter(genre)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  genreFilter === genre
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {genre === 'all' ? 'All Genres' : genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] rounded-xl bg-zinc-900 animate-pulse border border-zinc-800"
            />
          ))}
        </div>
      ) : filteredResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {filteredResults.map((show) => (
            <div key={show.id} className="flex justify-center">
              <MovieCard movie={show} />
            </div>
          ))}
        </div>
      ) : query.trim() ? (
        /* Empty Results State */
        <div className="text-center py-20 space-y-3 bg-zinc-950/50 rounded-2xl border border-dashed border-zinc-800 p-8">
          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center mx-auto text-zinc-500">
            <SearchIcon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No matches found for "{query}"</h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Try checking for typos or searching for a broader term like a genre ("Drama", "Comedy", "Sci-Fi") or show title.
          </p>
        </div>
      ) : (
        /* Initial Browse Prompt */
        <div className="text-center py-16 space-y-3">
          <p className="text-sm text-zinc-500">
            Type anything above or click a popular keyword to start exploring TV shows.
          </p>
        </div>
      )}

    </div>
  );
}
