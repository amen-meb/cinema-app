function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="relative w-full">
      <label
        htmlFor="search"
        className="sr-only"
      >
        Search movies, shows, and people
      </label>

      <input
        type="search"
        id="search"
        value={searchTerm}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search movies, shows, people..."
        className="
          w-full
          rounded-lg
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-3
          pr-12
          text-white
          outline-none
          placeholder:text-gray-500
          focus:border-red-500
        "
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            hover:text-white
          "
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;