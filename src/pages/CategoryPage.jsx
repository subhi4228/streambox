import React, { useEffect, useState } from 'react';
import { 
  Flame, 
  Award, 
  Zap, 
  Smile, 
  Skull, 
  Film, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { 
  getDramaShows, 
  getComedyShows, 
  getActionShows, 
  getThrillerShows, 
  getSciFiShows,
  getTopRatedShows,
  getShows
} from '../services/tvmaze';
import MovieCard from '../components/MovieCard';

const CATEGORY_CONFIG = {
  drama: {
    title: 'Drama & Masterpieces',
    description: 'Emotionally gripping stories, deep character studies, and acclaimed dramatic series.',
    icon: Film,
    fetcher: getDramaShows,
  },
  comedy: {
    title: 'Comedy & Laughs',
    description: 'Feel-good favorites, satirical gems, and hilarious comedies to brighten your day.',
    icon: Smile,
    fetcher: getComedyShows,
  },
  action: {
    title: 'Action & Adrenaline',
    description: 'High-octane blockbusters, heroic adventures, and adrenaline-charged television.',
    icon: Zap,
    fetcher: getActionShows,
  },
  thriller: {
    title: 'Thriller & Suspense',
    description: 'Edge-of-your-seat mysteries, dark conspiracies, and psychological mind-benders.',
    icon: Skull,
    fetcher: getThrillerShows,
  },
  'sci-fi': {
    title: 'Sci-Fi & Future Worlds',
    description: 'Futuristic epics, time travel sagas, alien encounters, and speculative fiction.',
    icon: Sparkles,
    fetcher: getSciFiShows,
  },
  trending: {
    title: 'Popular Shows',
    description: 'The most popular and talked-about television series streaming worldwide.',
    icon: Flame,
    fetcher: getShows,
  },
  'top-rated': {
    title: 'Top Rated All-Time',
    description: 'Critically acclaimed television masterpieces celebrated with the highest ratings.',
    icon: Award,
    fetcher: getTopRatedShows,
  },
  movies: {
    title: 'All Television Series',
    description: 'Browse the complete collection of TV shows available on StreamBox.',
    icon: Film,
    fetcher: getShows,
  },
};

export default function CategoryPage({ categoryKey }) {
  const config = CATEGORY_CONFIG[categoryKey] || CATEGORY_CONFIG.drama;
  const Icon = config.icon;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating'); // 'rating' | 'date' | 'title'

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    config.fetcher()
      .then((data) => {
        if (!isMounted) return;
        setShows(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Failed to load category ${categoryKey}:`, err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categoryKey]);

  // Sort shows based on selected criteria
  const sortedShows = [...shows].sort((a, b) => {
    if (sortBy === 'rating') {
      const rateA = a.rating?.average != null ? a.rating.average : (a.vote_average || 0);
      const rateB = b.rating?.average != null ? b.rating.average : (b.vote_average || 0);
      return rateB - rateA;
    }
    if (sortBy === 'date') {
      const dateA = new Date(a.premiered || a.release_date || 0);
      const dateB = new Date(b.premiered || b.release_date || 0);
      return dateB - dateA;
    }
    if (sortBy === 'title') {
      const titleA = a.name || a.title || '';
      const titleB = b.name || b.title || '';
      return titleA.localeCompare(titleB);
    }
    return (b.weight || 0) - (a.weight || 0);
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800/80 pb-6 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Icon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {config.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            {config.description}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-1.5 self-start sm:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-xs font-medium text-zinc-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs font-semibold text-zinc-200 focus:outline-none cursor-pointer"
          >
            <option value="rating" className="bg-zinc-900 text-white">Rating (High to Low)</option>
            <option value="date" className="bg-zinc-900 text-white">Premiered Date (Newest)</option>
            <option value="title" className="bg-zinc-900 text-white">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[2/3] rounded-xl bg-zinc-900 animate-pulse border border-zinc-800"
            />
          ))}
        </div>
      ) : sortedShows.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {sortedShows.map((show) => (
            <div key={show.id} className="flex justify-center">
              <MovieCard movie={show} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500">
          No shows found in this category.
        </div>
      )}

    </div>
  );
}
