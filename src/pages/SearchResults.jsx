import { useEffect, useState } from "react";

import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/ui/SearchBar";
import MovieGrid from "../components/movie/MovieGrid";

import { fetchFromTMDB } from "../services/tmdb";

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(
    searchTerm,
    500
  );

  useEffect(() => {
    if (!debouncedSearch.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    async function searchTMDB() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchFromTMDB(
          `/search/multi?query=${encodeURIComponent(
            debouncedSearch
          )}`,
          {
            signal: controller.signal,
          }
        );

        const filteredResults =
          (data.results || []).filter(
            (item) =>
              item.media_type === "movie"
          );

        setResults(filteredResults);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    searchTMDB();

    return () => {
      controller.abort();
    };
  }, [debouncedSearch]);

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">
          Search
        </h1>

        <p className="mt-2 text-gray-400">
          Search movies, TV shows, and people.
        </p>
      </header>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {loading && (
        <div className="py-10 text-center">
          <p className="animate-pulse text-gray-400">
            Searching...
          </p>
        </div>
      )}

      {error && (
        <div className="mt-8 rounded-lg bg-red-950 p-6 text-center text-red-300">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        debouncedSearch &&
        results.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-400">
              No results found.
            </p>
          </div>
        )}

      {!loading && results.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-5 text-2xl font-bold">
            Search Results
          </h2>

          <MovieGrid movies={results} />
        </section>
      )}
    </div>
  );
}

export default SearchResults;