import { Link } from "react-router-dom";

const IMAGE_URL =
  "https://image.tmdb.org/t/p/original";

const POSTER_URL =
  "https://image.tmdb.org/t/p/w500";

function DetailHero({ movie, onTrailerClick, hasTrailer, }) {
  const backdrop = movie.backdrop_path
    ? `${IMAGE_URL}${movie.backdrop_path}`
    : null;

  const poster = movie.poster_path
    ? `${POSTER_URL}${movie.poster_path}`
    : null;

  const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  return (
    <section className="relative overflow-hidden rounded-2xl">
      {/* Background */}
      {backdrop && (
        <img
          src={backdrop}
          alt=""
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />
      )}

      {/* Dark overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/80
        "
      />

      {/* Gradient */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black
          via-black/70
          to-black/30
        "
      />

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-8
          px-6
          py-12
          md:flex-row
          md:items-center
          md:py-20
        "
      >
        {/* Poster */}
        <div className="w-full shrink-0 md:w-72">
          {poster ? (
            <img
              src={poster}
              alt={movie.title}
              className="
                w-full
                rounded-xl
                shadow-2xl
              "
            />
          ) : (
            <div
              className="
                flex
                aspect-[2/3]
                items-center
                justify-center
                rounded-xl
                bg-zinc-800
                text-gray-500
              "
            >
              No Poster
            </div>
          )}
        </div>

        {/* Information */}
        <div className="max-w-3xl">
          <h1
            className="
              text-4xl
              font-bold
              md:text-6xl
            "
          >
            {movie.title}
          </h1>

          <div
            className="
              mt-4
              flex
              flex-wrap
              items-center
              gap-4
              text-sm
              text-gray-300
            "
          >
            <span>{year}</span>

            <span>
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>

            <span>
              {movie.runtime
                ? `${movie.runtime} min`
                : ""}
            </span>
          </div>

          {/* Genres */}
          <div className="mt-5 flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="
                  rounded-full
                  bg-white/10
                  px-3
                  py-1
                  text-sm
                  text-gray-200
                "
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p
            className="
              mt-6
              leading-7
              text-gray-300
            "
          >
            {movie.overview}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={onTrailerClick}
              disabled={!hasTrailer}
              className="
                    rounded-lg
                    bg-red-600
                    px-6
                    py-3
                    font-semibold
                    transition
                    hover:bg-red-700
                    disabled:cursor-not-allowed
                    disabled:bg-zinc-700
                    disabled:text-gray-500
                "
                >
              {hasTrailer
                    ? "▶ Watch Trailer"
                    : "Trailer Unavailable"}
            </button>

            <Link
              to="/watchlist"
              className="
                rounded-lg
                border
                border-white/20
                bg-white/10
                px-6
                py-3
                font-semibold
                backdrop-blur
                transition
                hover:bg-white/20
              "
            >
              ♡ Watchlist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailHero;