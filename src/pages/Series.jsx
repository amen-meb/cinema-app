import { useEffect, useMemo, useState } from "react";
import useMovies from "../hooks/useMovies";
import MovieGrid from "../components/movie/MovieGrid";
import SkeletonCard from "../components/movie/SkeletonCard";
import GenreFilter from "../components/ui/GenreFilter";
import SortSelect from "../components/ui/SortSelect";
import { fetchFromTMDB } from "../services/tmdb";

export default function Series() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const {
    movies: series,
    loading,
    error,
  } = useMovies("/discover/tv?sort_by=popularity.desc");

  useEffect(() => {
    const controller = new AbortController();
    fetchFromTMDB("/genre/tv/list", { signal: controller.signal })
      .then((data) => setGenres(data.genres || []))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") console.error(requestError);
      });
    return () => controller.abort();
  }, []);

  const filteredSeries = useMemo(() => {
    const result = series.filter(
      (show) =>
        selectedGenre === null || show.genre_ids?.includes(selectedGenre),
    );
    return [...result].sort((a, b) => {
      if (sortOption === "rating-desc") return b.vote_average - a.vote_average;
      if (sortOption === "rating-asc") return a.vote_average - b.vote_average;
      if (sortOption === "year-desc")
        return (
          new Date(b.first_air_date || 0) - new Date(a.first_air_date || 0)
        );
      if (sortOption === "year-asc")
        return (
          new Date(a.first_air_date || 0) - new Date(b.first_air_date || 0)
        );
      return 0;
    });
  }, [series, selectedGenre, sortOption]);

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Series</h1>
        <p className="mt-2 text-gray-400">
          Browse the full TV series catalogue.
        </p>
      </header>
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />
      <SortSelect sortOption={sortOption} onSortChange={setSortOption} />
      {loading && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-red-950 p-6 text-center text-red-300">
          {error}
        </div>
      )}
      {!loading && !error && (
        <MovieGrid movies={filteredSeries} mediaType="tv" />
      )}
    </div>
  );
}
