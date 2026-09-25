function Sidebar({ genres, selectedGenre, onGenreChange }) {
  return (
    <aside className="rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900 lg:sticky lg:top-28">
      <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Genres</h2>

      <nav aria-label="Movie genres">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
          <li>
            <button
              type="button"
              onClick={() => onGenreChange(null)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                selectedGenre === null
                  ? "bg-red-600 text-white"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              }`}
            >
              All
            </button>
          </li>

          {genres.map((genre) => (
            <li key={genre.id}>
              <button
                type="button"
                onClick={() => onGenreChange(genre.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                  selectedGenre === genre.id
                    ? "bg-red-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                }`}
              >
                {genre.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
