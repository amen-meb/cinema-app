import { useEffect, useState } from "react";
import { fetchFromTMDB } from "../services/tmdb";

export default function useMovies(endpoint, { append = false } = {}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    async function getMovies() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchFromTMDB(endpoint, {
          signal: controller.signal,
        });

        setMovies((currentMovies) => {
          const incomingMovies = data.results || [];

          if (!append) return incomingMovies;

          const existingIds = new Set(currentMovies.map((movie) => movie.id));
          const newMovies = incomingMovies.filter(
            (movie) => !existingIds.has(movie.id),
          );

          return [...currentMovies, ...newMovies];
        });
        setTotalPages(data.total_pages || 1);
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
  }, [append, endpoint]);

  return {
    movies,
    loading,
    error,
    totalPages,
  };
}
