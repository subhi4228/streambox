import React, { useEffect, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import { getShows, filterShowsByGenre } from '../services/tvmaze';
import { 
  Film, 
  Smile, 
  Zap, 
  Skull, 
  Sparkles 
} from 'lucide-react';

export default function Home({ refreshKey }) {
  const [featuredShow, setFeaturedShow] = useState(null);
  const [drama, setDrama] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [action, setAction] = useState([]);
  const [thriller, setThriller] = useState([]);
  const [sciFi, setSciFi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getShows()
      .then((allShows) => {
        if (!isMounted) return;
        const showsList = allShows || [];

        // Build genre rows (Drama, Comedy, Action, Thriller, Sci-Fi) by filtering that list
        setDrama(filterShowsByGenre(showsList, 'Drama'));
        setComedy(filterShowsByGenre(showsList, 'Comedy'));
        setAction(filterShowsByGenre(showsList, 'Action'));
        setThriller(filterShowsByGenre(showsList, 'Thriller'));
        setSciFi(filterShowsByGenre(showsList, 'Sci-Fi'));

        // Pick a featured show with a high-res image and high rating
        const withOriginalImage = showsList.filter((s) => s.image?.original && (s.vote_average || 0) >= 8.0);
        const candidates = withOriginalImage.length > 0 ? withOriginalImage : showsList;
        if (candidates.length > 0) {
          const chosen = candidates[Math.floor(Math.random() * Math.min(candidates.length, 6))];
          setFeaturedShow(chosen);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching TVMaze shows for Home:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      
      {/* Hero Banner with featured show from TVMaze */}
      <HeroBanner movie={featuredShow} />

      {/* Genre Rows built by filtering the TVMaze shows list */}
      <div className="relative -mt-12 sm:-mt-16 z-20 space-y-2 sm:space-y-4 pb-12">
        
        {/* Row 1: Drama */}
        <MovieRow
          title="Drama & Masterpieces"
          movies={drama}
          icon={Film}
          viewAllPath="/drama"
          isLoading={loading}
        />

        {/* Row 2: Comedy */}
        <MovieRow
          title="Comedy & Laughs"
          movies={comedy}
          icon={Smile}
          viewAllPath="/comedy"
          isLoading={loading}
        />

        {/* Row 3: Action */}
        <MovieRow
          title="Action & Adrenaline"
          movies={action}
          icon={Zap}
          viewAllPath="/action"
          isLoading={loading}
        />

        {/* Row 4: Thriller */}
        <MovieRow
          title="Thriller & Suspense"
          movies={thriller}
          icon={Skull}
          viewAllPath="/thriller"
          isLoading={loading}
        />

        {/* Row 5: Sci-Fi */}
        <MovieRow
          title="Sci-Fi & Future Worlds"
          movies={sciFi}
          icon={Sparkles}
          viewAllPath="/sci-fi"
          isLoading={loading}
        />

      </div>

    </div>
  );
}
