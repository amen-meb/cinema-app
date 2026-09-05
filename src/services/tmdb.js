const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_KEY;

export async function fetchFromTMDB(endpoint, options = {}) {
  const separator = endpoint.includes("?") ? "&" : "?";

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`,
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data from TMDB");
  }

  return response.json();
}