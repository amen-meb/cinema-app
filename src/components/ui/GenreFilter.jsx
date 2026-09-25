function GenreFilter({ genres, selectedGenre, onGenreChange }) {
  return (
    <div className="mb-8">
      <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Genres</h2>

      <div className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap">
        <button
          onClick={() => onGenreChange(null)}
          className={`
            whitespace-nowrap
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            transition
            ${
              selectedGenre === null
                ? "bg-red-600 text-white"
                : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
            }
          `}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreChange(genre.id)}
            className={`
              whitespace-nowrap
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition
              ${
                selectedGenre === genre.id
                  ? "bg-red-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
              }
            `}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;
