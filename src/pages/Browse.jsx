import { useEffect, useMemo, useState } from "react";

import useMovies from "../hooks/useMovies";

import MovieGrid from "../components/movie/MovieGrid";
import SkeletonCard from "../components/movie/SkeletonCard";

import Sidebar from "../components/ui/Sidebar";
import SortSelect from "../components/ui/SortSelect";

import { fetchFromTMDB } from "../services/tmdb";

function Browse() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState("default");
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [page, setPage] = useState(1);
  const [genreError, setGenreError] = useState(null);

  const { movies, loading, error, totalPages } = useMovies(
    `/discover/movie?sort_by=popularity.desc&page=${page}`,
    { append: true },
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && page < totalPages) {
          setPage((currentPage) => currentPage + 1);
        }
      },
      { rootMargin: "500px" },
    );

    const sentinel = document.querySelector("[data-browse-sentinel]");
    if (sentinel) observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loading, page, totalPages]);

  useEffect(() => {
    const controller = new AbortController();

    async function getGenres() {
      try {
        const data = await fetchFromTMDB("/genre/movie/list", {
          signal: controller.signal,
        });

        setGenres(data.genres || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setGenreError(error.message);
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
        movie.genre_ids?.some(
          (genreId) => String(genreId) === String(selectedGenre),
        ),
      );
    }

    if (minYear || maxYear) {
      result = result.filter((movie) => {
        const year = Number((movie.release_date || "").slice(0, 4));
        return (
          year &&
          (!minYear || year >= Number(minYear)) &&
          (!maxYear || year <= Number(maxYear))
        );
      });
    }

    switch (sortOption) {
      case "rating-desc":
        result.sort((a, b) => b.vote_average - a.vote_average);
        break;

      case "rating-asc":
        result.sort((a, b) => a.vote_average - b.vote_average);
        break;

      case "year-desc":
        result.sort(
          (a, b) =>
            new Date(b.release_date || 0) - new Date(a.release_date || 0),
        );
        break;

      case "year-asc":
        result.sort(
          (a, b) =>
            new Date(a.release_date || 0) - new Date(b.release_date || 0),
        );
        break;

      default:
        break;
    }

    return result;
  }, [movies, selectedGenre, sortOption, minYear, maxYear]);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Browse Movies</h1>

        <p className="mt-2 text-gray-400">Discover movies from TMDB.</p>
      </header>

      <div className="grid items-start gap-8 lg:h-[calc(100vh-12rem)] lg:min-h-0 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="lg:h-full lg:overflow-y-auto lg:pr-2">
          <Sidebar
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
          {genreError && <p className="mt-3 text-sm text-red-300">{genreError}</p>}
        </div>

        <section className="lg:h-full lg:overflow-y-auto lg:pr-2">
          <SortSelect sortOption={sortOption} onSortChange={setSortOption} />

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-slate-700 dark:text-white">
              Release year:
            </span>
            <input
              type="number"
              min="1900"
              max="2100"
              value={minYear}
              onChange={(event) => setMinYear(event.target.value)}
              placeholder="From"
              aria-label="Minimum release year"
              className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />
            <span className="text-slate-500 dark:text-gray-400">to</span>
            <input
              type="number"
              min="1900"
              max="2100"
              value={maxYear}
              onChange={(event) => setMaxYear(event.target.value)}
              placeholder="To"
              aria-label="Maximum release year"
              className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />
          </div>

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
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-950 p-6 text-center text-red-300">
              <p className="text-lg font-semibold">Something went wrong</p>

              <p className="mt-2">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {filteredMovies.length > 0 ? (
                <MovieGrid movies={filteredMovies} />
              ) : (
                <div className="py-20 text-center">
                  <p className="text-xl text-gray-400">No movies found.</p>
                </div>
              )}
            </>
          )}

          <div
            data-browse-sentinel
            className="flex min-h-20 items-center justify-center py-8 text-sm text-gray-400"
          >
            {loading && page > 1
              ? "Loading more movies..."
              : page >= totalPages
                ? "You have reached the end."
                : ""}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Browse;
