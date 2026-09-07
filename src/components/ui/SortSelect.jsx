function SortSelect({
  sortOption,
  onSortChange,
}) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <label
        htmlFor="sort"
        className="text-sm font-semibold text-white"
      >
        Sort:
      </label>

      <select
        id="sort"
        value={sortOption}
        onChange={(event) =>
          onSortChange(event.target.value)
        }
        className="
          rounded-lg
          border
          border-zinc-700
          bg-zinc-900
          px-4
          py-2
          text-sm
          text-white
          outline-none
          focus:border-red-500
        "
      >
        <option value="default">
          Default
        </option>

        <option value="rating-desc">
          Rating: High to Low
        </option>

        <option value="rating-asc">
          Rating: Low to High
        </option>

        <option value="year-desc">
          Newest
        </option>

        <option value="year-asc">
          Oldest
        </option>
      </select>
    </div>
  );
}

export default SortSelect;