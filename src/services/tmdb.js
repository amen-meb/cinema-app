const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_KEY;

export async function fetchFromTMDB(endpoint, options = {}) {
  if (!API_KEY) {
    throw new Error(
      "TMDB API key is missing. Add VITE_TMDB_KEY to a .env file and restart Vite."
    );
  }

  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${encodeURIComponent(API_KEY)}`,
    options
  );

  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status} ${response.statusText})`);
  }

  return response.json();
}