import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-red-600">CINEVERSE</h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
              Discover movies, explore popular series and celebrities, and build
              your personal watchlist.
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Your next favorite story is only a search away.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">Explore</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                to="/"
                className="text-gray-500 transition hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/movies"
                className="text-gray-500 transition hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
              >
                Movies
              </Link>

              <Link
                to="/series"
                className="text-gray-500 transition hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
              >
                Series
              </Link>

              <Link
                to="/celebrities"
                className="text-gray-500 transition hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
              >
                Celebrities
              </Link>

              <Link
                to="/search"
                className="text-gray-500 transition hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
              >
                Search
              </Link>

              <Link
                to="/watchlist"
                className="text-gray-500 transition hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
              >
                Watchlist
              </Link>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">About</h3>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Browse popular titles, check movie and series details, discover
              cast members, and keep a list of what you want to watch.
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Movie information and images are provided by The Movie Database
              (TMDB). This product uses the TMDB API but is not endorsed or
              certified by TMDB.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-10
            flex
            flex-col
            gap-3
            border-t
            border-zinc-800
            pt-6
            text-sm
            text-gray-500
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>© {new Date().getFullYear()} Cineverse. All rights reserved.</p>

          <p>Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
