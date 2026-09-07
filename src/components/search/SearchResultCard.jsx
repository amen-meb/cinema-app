import { Link } from "react-router-dom";

const IMAGE_URL = "https://image.tmdb.org/t/p/w300";

function SearchResultCard({ result }) {
  const imagePath =
    result.poster_path || result.profile_path;

  const image = imagePath
    ? `${IMAGE_URL}${imagePath}`
    : null;

  const isPerson = result.media_type === "person";
  const isTV = result.media_type === "tv";

  const title = isPerson
    ? result.name
    : result.title || result.name;

  const subtitle = isPerson
    ? result.known_for_department || "Person"
    : isTV
      ? "TV Series"
      : "Movie";

  const link = isPerson
    ? "#"
    : isTV
      ? `/tv/${result.id}`
      : `/movie/${result.id}`;

  return (
    <Link
      to={link}
      className="
        group
        overflow-hidden
        rounded-xl
        bg-zinc-900
        transition
        hover:-translate-y-1
        hover:bg-zinc-800
      "
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="
            aspect-[2/3]
            w-full
            object-cover
            transition
            duration-300
            group-hover:scale-105
          "
        />
      ) : (
        <div
          className="
            flex
            aspect-[2/3]
            items-center
            justify-center
            bg-zinc-800
            text-center
            text-sm
            text-gray-500
          "
        >
          No Image
        </div>
      )}

      <div className="p-4">
        <h3 className="truncate font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}

export default SearchResultCard;

