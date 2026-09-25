import { NavLink, useNavigate } from "react-router-dom";
import useWatchlist from "../../hooks/useWatchlist";
import { Bookmark, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { watchlist } = useWatchlist();
  const watchlistCount = watchlist.length;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();

    const query = searchTerm.trim();
    navigate(query ? `/search?query=${encodeURIComponent(query)}` : "/search");
  }

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "Series",
      path: "/series",
    },
    {
      name: "Celebrities",
      path: "/celebrities",
    },
  ];

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        border-b
        border-slate-200
        bg-white/90
        backdrop-blur-md
        dark:border-white/10
        dark:bg-black/40
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-screen-2xl
          items-center
          justify-between
          px-4
          py-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="
            shrink-0
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
            transition
            hover:text-red-400
          "
        >
          🎬 CINEVERSE
        </NavLink>

        {/* Desktop Theme Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="
            hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-slate-300
            text-slate-700
            transition
            hover:border-red-500
            hover:text-red-500
            dark:border-white/15
            dark:text-white
            lg:flex
          "
          aria-label={`Switch to ${
            theme === "dark" ? "light" : "dark"
          } mode`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-slate-300
            text-slate-700
            dark:border-white/15
            dark:text-white
            lg:hidden
          "
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Links */}
        <div
          className={`
            absolute
            left-0
            right-0
            top-full
            flex-col
            gap-6
            border-b
            border-slate-200
            bg-white/95
            px-5
            py-5
            ${menuOpen ? "flex" : "hidden"}

            lg:static
            lg:flex
            lg:flex-row
            lg:items-center
            lg:gap-7
            lg:border-0
            lg:bg-transparent
            lg:p-0
            dark:border-white/10
            dark:bg-zinc-950/95
            md:dark:bg-transparent
          `}
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "text-red-500"
                      : "text-slate-700 dark:text-white"
                  }
                  hover:text-red-400
                `
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Watchlist */}
          <NavLink
            to="/watchlist"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `
                text-sm
                font-medium
                transition
                ${
                  isActive
                    ? "text-red-500"
                    : "text-slate-700 dark:text-white"
                }
                hover:text-red-400
              `
            }
          >
            <span className="flex items-center gap-2">
              <Bookmark size={15} />

              Watchlist

              {watchlistCount > 0 && (
                <span
                  className="
                    rounded-full
                    bg-red-600
                    px-2
                    py-0.5
                    text-xs
                    font-bold
                    text-white
                  "
                >
                  {watchlistCount}
                </span>
              )}
            </span>
          </NavLink>

          <form onSubmit={handleSearch} className="w-full lg:w-64">
            <label htmlFor="navbar-search" className="sr-only">
              Search for movies and shows
            </label>
            <div className="relative">
              <input
                id="navbar-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search for a movie or shows"
                className="h-10 w-full rounded-full bg-slate-100 px-5 pr-12 text-sm text-slate-900 outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-red-500 dark:bg-zinc-800 dark:text-white"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-600 hover:text-slate-900 dark:text-sky-300 dark:hover:text-white"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Mobile Theme Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-slate-300
              text-slate-700
              transition
              hover:border-red-500
              hover:text-red-500
              dark:border-white/15
              dark:text-white
              lg:hidden
            "
            aria-label={`Switch to ${
              theme === "dark" ? "light" : "dark"
            } mode`}
          >
            {theme === "dark" ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;