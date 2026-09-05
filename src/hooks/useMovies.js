import { useEffect, useState } from "react";
import { fetchFromTMDB } from "../services/tmdb";

export default function useMovies(endpoint) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getMovies() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchFromTMDB(endpoint, {
          signal: controller.signal,
        });

        setMovies(data.results || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    getMovies();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return {
    movies,
    loading,
    error,
  };
}