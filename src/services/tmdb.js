// Compatibility layer routing TMDB service imports to the TVMaze API service
export * from './tvmaze';
export {
  getDramaShows as getTrending,
  getTopRatedShows as getTopRated,
  getActionShows as getActionMovies,
  getComedyShows as getComedyMovies,
  getThrillerShows as getHorrorMovies,
  searchShows as searchMovies,
  getShowDetails as getDetails,
} from './tvmaze';

export function getApiKey() {
  return '';
}

export function setLocalApiKey() {
  // No-op: TVMaze does not require an API key
}

export function hasValidApiKey() {
  return true; // Always valid since TVMaze needs no key
}
