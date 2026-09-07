import { Link } from "react-router-dom";

import useWatchlist from "../hooks/useWatchlist";

import MovieGrid from "../components/movie/MovieGrid";


function Watchlist() {
  const {
    watchlist,
  } = useWatchlist();


  return (
    <div className="mx-auto max-w-7xl">

      {/* Page Header */}

      <header className="mb-8">

        <h1 className="text-4xl font-bold">
          My Watchlist
        </h1>

        <p className="mt-2 text-gray-400">
          Movies you want to watch later.
        </p>

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

          <div className="text-6xl">
            ♡
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Your watchlist is empty
          </h2>

          <p className="mt-2 max-w-md text-gray-400">
            Save movies you want to watch later
            and they will appear here.
          </p>

          <Link
            to="/movies"
            className="
              mt-6
              rounded-lg
              bg-red-600
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-red-700
            "
          >
            Browse Movies
          </Link>

        </div>

      ) : (

        <>

          {/* Watchlist Count */}

          <div className="mb-6">
            <p className="text-gray-400">
              {watchlist.length}{" "}
              {watchlist.length === 1
                ? "movie"
                : "movies"}{" "}
              saved
            </p>
          </div>


          {/* Movies */}

          <MovieGrid
            movies={watchlist}
          />

        </>

      )}

    </div>
  );
}


export default Watchlist;

