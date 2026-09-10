import { Link } from "react-router-dom";

import useWatchlist from "../hooks/useWatchlist";

import MovieGrid from "../components/movie/MovieGrid";

function Watchlist() {
  const { watchlist } = useWatchlist();

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}

      <header className="mb-8">
        <h1 className="text-4xl font-bold">My Watchlist</h1>

        <p className="mt-2 text-gray-400">Movies you want to watch later.</p>
      </header>

      {/* Empty State */}

      {watchlist.length === 0 ? (
        <div
          className="
            flex
            min-h-[50vh]
            flex-col
            items-center
            justify-center
            rounded-2xl
            bg-zinc-900
            px-6
            text-center
          "
        >
          <div className="text-6xl">♡</div>

          <h2 className="mt-5 text-2xl font-bold">Your watchlist is empty</h2>

          <p className="mt-2 max-w-md text-gray-400">
            Save movies you want to watch later and they will appear here.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/movies"
              className="
                rounded-lg
                border
                border-red-600
                px-6
                py-3
                font-semibold
                text-400
                text-600
                transition
                hover:bg-red-600
                hover:text-white
              "
            >
              Browse Movies
            </Link>
             

            <Link
              to="/series"
              className="
                rounded-lg
                border
                border-red-600
                px-6
                py-3
                font-semibold
                text-400
                transition
                hover:bg-red-600
                hover:text-white
              "
            >
              Browse Series
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Watchlist Count */}

          <div className="mb-6">
            <p className="text-gray-400">
              {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"}{" "}
              saved
            </p>
          </div>

          {/* Movies */}

          <MovieGrid movies={watchlist} />
        </>
      )}
    </div>
  );
}

export default Watchlist;
