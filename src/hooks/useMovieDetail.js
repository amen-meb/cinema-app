import { useEffect, useState } from "react";
import { fetchFromTMDB } from "../services/tmdb";

export default function useMovieDetail(id) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function getMovie() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchFromTMDB(`/movie/${id}`, {
          signal: controller.signal,
        });

        setMovie(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    getMovie();

    return () => {
      controller.abort();
    };
  }, [id]);

  return {
    movie,
    loading,
    error,
  };
}