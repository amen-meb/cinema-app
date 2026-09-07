import { useEffect, useState } from "react";

import useDebounce from "../hooks/useDebounce";

import SearchBar from "../components/ui/SearchBar";
import SearchResultCard from "../components/search/SearchResultCard";

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
      setLoading(false);
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

        setResults(data.results || []);

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

      {/* Header */}

      <header className="mb-8">

        <h1 className="text-4xl font-bold">
          Search
        </h1>

        <p className="mt-2 text-gray-400">
          Search for movies, TV shows, and people.
        </p>

      </header>


      {/* Search */}

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />


      {/* Empty Search */}

      {!searchTerm && (
        <div className="py-20 text-center">
          <p className="text-xl text-gray-500">
            Start typing to search.
          </p>
        </div>
      )}


      {/* Loading */}

      {loading && (
        <div className="py-12 text-center">
          <p className="animate-pulse text-gray-400">
            Searching...
          </p>
        </div>
      )}


      {/* Error */}

      {error && (
        <div
          className="
            mt-8
            rounded-xl
            bg-red-950
            p-6
            text-center
            text-red-300
          "
        >
          <p className="font-semibold">
            Something went wrong
          </p>

          <p className="mt-2">
            {error}
          </p>
        </div>
      )}


      {/* Results */}

      {!loading &&
        !error &&
        results.length > 0 && (

          <section className="mt-10">

            <div
              className="
                grid
                grid-cols-2
                gap-5
                sm:grid-cols-3
                md:grid-cols-4
                xl:grid-cols-5
              "
            >

              {results.map((result) => (
                <SearchResultCard
                  key={`${result.media_type}-${result.id}`}
                  result={result}
                />
              ))}

            </div>

          </section>

        )}


      {/* No Results */}

      {!loading &&
        !error &&
        debouncedSearch &&
        results.length === 0 && (

          <div className="py-20 text-center">

            <p className="text-xl text-gray-400">
              No results found for "{debouncedSearch}".
            </p>

          </div>

        )}

    </div>
  );
}


export default SearchResults;

