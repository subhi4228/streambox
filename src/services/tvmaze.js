import { MOCK_SHOWS } from './mockData';

export const BASE_URL = 'https://api.tvmaze.com';

/**
 * Remove HTML tags from TVMaze summary strings
 */
export function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
}

/**
 * Get safe poster image URL
 */
export function getPosterUrl(pathOrShow) {
  const fallback = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=80';
  if (!pathOrShow) return fallback;
  if (typeof pathOrShow === 'string') {
    return pathOrShow.startsWith('http') ? pathOrShow : fallback;
  }
  return pathOrShow.image?.medium || pathOrShow.image?.original || pathOrShow.poster_path || fallback;
}

/**
 * Get safe high-res backdrop image URL
 */
export function getBackdropUrl(pathOrShow) {
  const fallback = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1920&q=80';
  if (!pathOrShow) return fallback;
  if (typeof pathOrShow === 'string') {
    return pathOrShow.startsWith('http') ? pathOrShow : fallback;
  }
  return pathOrShow.image?.original || pathOrShow.image?.medium || pathOrShow.backdrop_path || fallback;
}

/**
 * Normalize TVMaze show object for consistent use across components
 */
export function normalizeShow(show) {
  if (!show) return null;
  const overview = stripHtml(show.summary) || 'No summary available for this show.';
  const year = (show.premiered || '').split('-')[0] || '';
  const ratingAverage = show.rating?.average != null ? Number(show.rating.average) : null;
  const poster = show.image?.medium || show.image?.original || null;
  const backdrop = show.image?.original || show.image?.medium || null;

  return {
    ...show,
    id: show.id,
    name: show.name || 'Untitled Show',
    title: show.name || 'Untitled Show',
    overview,
    summary: show.summary || '',
    premiered: show.premiered || '',
    release_date: show.premiered || '',
    year,
    vote_average: ratingAverage,
    rating: show.rating || { average: ratingAverage },
    genres: Array.isArray(show.genres) ? show.genres : [],
    poster_path: poster,
    backdrop_path: backdrop,
    cast: show._embedded?.cast || show.cast || [],
  };
}

let showsPromise = null;

/**
 * Fetch all shows from https://api.tvmaze.com/shows
 * Memoized promise avoids duplicate concurrent network requests
 */
export async function getShows() {
  if (showsPromise) {
    return showsPromise;
  }

  showsPromise = (async () => {
    try {
      const response = await fetch(`${BASE_URL}/shows`);
      if (!response.ok) {
        console.warn(`TVMaze /shows request failed (${response.status}). Using fallback dataset.`);
        return MOCK_SHOWS.map(normalizeShow);
      }
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) {
        return MOCK_SHOWS.map(normalizeShow);
      }
      return data.map(normalizeShow);
    } catch (err) {
      console.warn('Network error fetching from TVMaze API. Using fallback dataset:', err);
      return MOCK_SHOWS.map(normalizeShow);
    }
  })();

  return showsPromise;
}

/**
 * Filter show list by genre name (case-insensitive with Sci-Fi alias handling)
 */
export function filterShowsByGenre(shows, genreName) {
  if (!Array.isArray(shows)) return [];
  const target = genreName.toLowerCase().trim();

  return shows.filter((show) => {
    if (!show.genres || !Array.isArray(show.genres)) return false;
    return show.genres.some((g) => {
      const lower = g.toLowerCase().trim();
      if (target === 'sci-fi' || target === 'science-fiction') {
        return (
          lower === 'sci-fi' ||
          lower === 'science-fiction' ||
          lower.includes('sci-fi') ||
          lower.includes('science')
        );
      }
      return lower === target;
    });
  });
}

/**
 * Specialized genre getters
 */
export async function getDramaShows() {
  const shows = await getShows();
  return filterShowsByGenre(shows, 'Drama');
}

export async function getComedyShows() {
  const shows = await getShows();
  return filterShowsByGenre(shows, 'Comedy');
}

export async function getActionShows() {
  const shows = await getShows();
  return filterShowsByGenre(shows, 'Action');
}

export async function getThrillerShows() {
  const shows = await getShows();
  return filterShowsByGenre(shows, 'Thriller');
}

export async function getSciFiShows() {
  const shows = await getShows();
  return filterShowsByGenre(shows, 'Sci-Fi');
}

/**
 * Search shows using https://api.tvmaze.com/search/shows?q=
 */
export async function searchShows(query) {
  if (!query || query.trim() === '') return [];
  const q = query.trim();

  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(q)}`);
    if (!response.ok) {
      return searchMockShows(q);
    }
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data
      .filter((item) => item && item.show)
      .map((item) => normalizeShow(item.show));
  } catch (err) {
    console.error('TVMaze search failed:', err);
    return searchMockShows(q);
  }
}

function searchMockShows(query) {
  const q = query.toLowerCase();
  return MOCK_SHOWS
    .filter(
      (s) =>
        (s.name && s.name.toLowerCase().includes(q)) ||
        (s.summary && s.summary.toLowerCase().includes(q)) ||
        (s.genres && s.genres.some((g) => g.toLowerCase().includes(q)))
    )
    .map(normalizeShow);
}

/**
 * Fetch detailed show info with embedded cast
 */
export async function getShowDetails(id) {
  if (!id) return null;
  try {
    const response = await fetch(`${BASE_URL}/shows/${id}?embed=cast`);
    if (!response.ok) {
      const all = await getShows();
      return all.find((s) => s.id === Number(id)) || null;
    }
    const data = await response.json();
    return normalizeShow(data);
  } catch (err) {
    console.error('TVMaze getShowDetails error:', err);
    const all = await getShows();
    return all.find((s) => s.id === Number(id)) || null;
  }
}

/**
 * Get top rated shows sorted descending
 */
export async function getTopRatedShows() {
  const shows = await getShows();
  return [...shows].sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
}

/**
 * Select a featured show with a high-resolution backdrop
 */
export async function getFeaturedShow() {
  const shows = await getShows();
  const eligible = shows.filter((s) => s.image?.original && (s.vote_average || 0) >= 7.8);
  if (eligible.length > 0) {
    return eligible[Math.floor(Math.random() * Math.min(eligible.length, 8))];
  }
  return shows[0] || null;
}

