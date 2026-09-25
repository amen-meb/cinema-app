import { Search } from "lucide-react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative w-full">
      <label htmlFor="search" className="sr-only">
        Search movies, shows, and people
      </label>

      <input
        type="search"
        id="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search movies, shows, people..."
        className="
          w-full
          rounded-full
          border
          border-slate-300
          bg-white
          dark:border-zinc-700
          dark:bg-zinc-900
          px-4
          py-3
          pr-20
          text-slate-900
          dark:text-white
          outline-none
          placeholder:text-gray-500
          focus:border-red-500
        "
      />

      <Search
        size={18}
        aria-hidden="true"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-600 dark:text-sky-300"
      />
    </div>
  );
}

export default SearchBar;
