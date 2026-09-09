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

        setMovies((currentMovies) =>
          append
            ? [...currentMovies, ...(data.results || [])]
            : data.results || [],
        );
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
