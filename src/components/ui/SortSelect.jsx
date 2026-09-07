function SortSelect({
  sortOption,
  onSortChange,
  options,
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
        {(options || [
          ["default", "Default"],
          ["rating-desc", "Rating: High to Low"],
          ["rating-asc", "Rating: Low to High"],
          ["year-desc", "Newest"],
          ["year-asc", "Oldest"],
        ]).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}

export default SortSelect;