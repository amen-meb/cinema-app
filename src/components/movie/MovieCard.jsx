import { Link } from "react-router-dom";

import useWatchlist from "../../hooks/useWatchlist";
import useToast from "../../hooks/useToast";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";


function MovieCard({ movie, mediaType = "movie" }) {


  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : null;

  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const saved = isInWatchlist(movie.id);

  const { showToast } = useToast();

  const resolvedMediaType = mediaType === "auto"
    ? (movie.media_type === "tv" || movie.first_air_date ? "tv" : "movie")
    : mediaType;
  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date;
  const year = date
    ? date.split("-")[0]
    : "N/A";



  return (

    <div
      className="
      group
      relative
      overflow-hidden
      rounded-xl
      bg-zinc-900
      shadow-lg
      transition
      duration-300
      hover:scale-105
      "
    >


      {/* Movie Poster */}

      <Link to={`/${resolvedMediaType === "tv" ? "series" : "movie"}/${movie.id}`}>

        {poster ? (
        <img
            src={poster}
            alt={title}
            className="
            h-[350px]
            w-full
            object-cover
            "
        />
        ) : (
        <div
            className="
            flex
            h-[350px]
            w-full
            items-center
            justify-center
            bg-zinc-800
            text-center
            text-gray-500
            "
        >
            No Poster
        </div>
        )}

      </Link>



      {/* Hover Overlay */}

      <div
        className="
        absolute
        inset-0
        flex
        flex-col
        justify-end
        bg-black/70
        opacity-0
        transition
        duration-300
        group-hover:opacity-100
        "
      >


        <div
          className="
          p-4
          "
        >


          <h3
            className="
            text-lg
            font-bold
            text-white
            "
          >
            {title}
          </h3>



          <p
            className="
            mt-2
            text-sm
            text-gray-300
            line-clamp-3
            "
          >
            {movie.overview}
          </p>



          <Link
            to={`/${resolvedMediaType === "tv" ? "series" : "movie"}/${movie.id}`}
            className="
            mt-4
            inline-block
            rounded-lg
            bg-red-600
            px-4
            py-2
            text-sm
            font-semibold
            hover:bg-red-700
            "
          >

            Details

          </Link>


        </div>


      </div>




      {/* Rating Badge */}

      <div
        className="
        absolute
        top-3
        right-3
        rounded-lg
        bg-black/80
        px-3
        py-1
        text-sm
        font-bold
        text-yellow-400
        "
      >

        ⭐ {movie.vote_average?.toFixed(1)}

      </div>

      <button
            onClick={() => {
                if (saved) {
                removeFromWatchlist(movie.id);
                showToast(`${title} removed from watchlist`);
                } else {
                addToWatchlist(movie);
                showToast(`${title} added to watchlist`);
                }
            }}
            className="
                absolute
                left-3
                top-3
                z-10
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-black/70
                text-xl
                transition
                hover:scale-110
            "
            aria-label={
                saved
                ? "Remove from watchlist"
                : "Add to watchlist"
            }
            >
            {saved ? "♥" : "♡"}
      </button>




      {/* Bottom Info */}

      <div
        className="
        p-3
        "
      >

        <h3
          className="
          truncate
          font-semibold
          text-white
          "
        >

          {title}

        </h3>


        <p
          className="
          text-sm
          text-gray-400
          "
        >

          {year}

        </p>


      </div>


    </div>

  );
}


export default MovieCard;