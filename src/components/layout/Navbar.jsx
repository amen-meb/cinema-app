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
        border-white/10
        bg-black/40
        backdrop-blur-md
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
            text-white
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
            border-white/15
            text-white
            transition
            hover:border-red-500
            hover:text-red-500
            md:flex
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
            border-white/15
            text-white
            md:hidden
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
            border-white/10
            bg-zinc-950/95
            px-5
            py-5
            ${menuOpen ? "flex" : "hidden"}

            md:static
            md:flex
            md:flex-row
            md:items-center
            md:gap-7
            md:border-0
            md:bg-transparent
            md:p-0
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
                      : "text-white"
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
                    : "text-white"
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

          <form onSubmit={handleSearch} className="w-full md:w-64">
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
                className="h-10 w-full rounded-full bg-zinc-800 px-5 pr-12 text-sm text-white outline-none placeholder:text-gray-500 focus:ring-1 focus:ring-red-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-300 hover:text-white"
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
              border-white/15
              text-white
              transition
              hover:border-red-500
              hover:text-red-500
              md:hidden
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