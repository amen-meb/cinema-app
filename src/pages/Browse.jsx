import { useEffect, useMemo, useState } from "react";

import useMovies from "../hooks/useMovies";

import MovieGrid from "../components/movie/MovieGrid";
import SkeletonCard from "../components/movie/SkeletonCard";

import GenreFilter from "../components/ui/GenreFilter";
import SortSelect from "../components/ui/SortSelect";

import { fetchFromTMDB } from "../services/tmdb";


function Browse() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState("default");

  const {
    movies,
    loading,
    error,
  } = useMovies("/discover/movie");

  useEffect(() => {
    const controller = new AbortController();

    async function getGenres() {
      try {
        const data = await fetchFromTMDB(
          "/genre/movie/list",
          {
            signal: controller.signal,
          }
        );

        setGenres(data.genres || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    getGenres();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (selectedGenre !== null) {
      result = result.filter((movie) =>
        movie.genre_ids?.includes(selectedGenre)
      );
    }

    switch (sortOption) {
      case "rating-desc":
        result.sort(
          (a, b) =>
            b.vote_average - a.vote_average
        );
        break;

      case "rating-asc":
        result.sort(
          (a, b) =>
            a.vote_average - b.vote_average
        );
        break;

      case "year-desc":
        result.sort(
          (a, b) =>
            new Date(b.release_date || 0) -
            new Date(a.release_date || 0)
        );
        break;

      case "year-asc":
        result.sort(
          (a, b) =>
            new Date(a.release_date || 0) -
            new Date(b.release_date || 0)
        );
        break;

      default:
        break;
    }

    return result;
  }, [movies, selectedGenre, sortOption]);

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">
          Browse Movies
        </h1>

        <p className="mt-2 text-gray-400">
          Discover movies from TMDB.
        </p>
      </header>

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />

      <SortSelect
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {loading && (
        <div
          className="
            grid
            grid-cols-2
            gap-6
            sm:grid-cols-3
            md:grid-cols-4
            xl:grid-cols-5
          "
        >
          {Array.from({ length: 10 }).map(
            (_, index) => (
              <SkeletonCard key={index} />
            )
          )}
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-950 p-6 text-center text-red-300">
          <p className="text-lg font-semibold">
            Something went wrong
          </p>

          <p className="mt-2">
            {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredMovies.length > 0 ? (
            <MovieGrid
              movies={filteredMovies}
            />
          ) : (
            <div className="py-20 text-center">
              <p className="text-xl text-gray-400">
                No movies found.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Browse;