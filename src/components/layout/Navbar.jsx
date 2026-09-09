import { NavLink } from "react-router-dom";

import useWatchlist from "../../hooks/useWatchlist";
import { Bookmark, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { watchlist } = useWatchlist();
  const watchlistCount = watchlist.length;
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    {
      name: "Search",
      path: "/search",
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
      bg-black/40
      backdrop-blur-md
      border-b
      border-white/10
      "
    >
      <div
        className="
        max-w-7xl 
        mx-auto
        px-5
        py-4
        flex
        justify-between
        items-center
        "
      >
        {/* Logo */}

        <NavLink
          to="/"
          className="
          text-2xl
          font-bold
          text-red-500
          "
        >
          🎬 CINEVERSE
        </NavLink>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="mr-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-700 transition hover:border-red-500 hover:text-red-500 dark:text-white"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
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
          md:border-0
          md:bg-transparent
          md:p-0
          `}
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                  text-sm
                  font-medium
                  ${isActive ? "text-red-500" : "text-white"}
                  hover:text-red-400
                  `
              }
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `
              text-sm
              font-medium
              ${isActive ? "text-red-500" : "text-white"}
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
