import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

function HeroBanner({ movies = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (movies.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % movies.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [movies.length]);

  if (!movies.length) {
    return null;
  }

  const visibleIndex = Math.min(activeIndex, movies.length - 1);
  const movie = movies[visibleIndex];
  const title = movie.title || movie.name;
  const isSeries = movie.media_type === "tv" || Boolean(movie.first_air_date);
  const mediaType = isSeries ? "series" : "movie";

  function showPrevious() {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? movies.length - 1 : currentIndex - 1,
    );
  }

  function showNext() {
    setActiveIndex((currentIndex) => (currentIndex + 1) % movies.length);
  }

  return (
    <section
      className="
relative
h-[65vh]
min-h-[520px]
overflow-hidden
rounded-xl
"
    >
      {/* Background Image */}

      <img
        src={`${IMAGE_URL}${movie.backdrop_path}`}
        alt={title}
        className="
absolute
inset-0
h-full
w-full
object-cover
"
      />

      {/* Gradient Overlay */}

      <div
        className="
absolute
inset-0
bg-gradient-to-r
from-black
via-black/60
to-transparent
"
      />

      {/* Content */}

      <div
        className="
relative
z-10
flex
h-full
max-w-3xl
flex-col
justify-center
px-8
"
      >
        <h1
          className="
text-4xl
font-bold
md:text-6xl
"
        >
          {title}
        </h1>

        <p
          className="
mt-4
text-gray-300
line-clamp-3
"
        >
          {movie.overview}
        </p>

        <div
          className="
mt-6
flex
gap-4
"
        >
          <Link
            to={`/${mediaType}/${movie.id}`}
            className="
rounded-lg
bg-red-600
px-6
py-3
font-semibold
hover:bg-red-700
"
          >
            View Details
          </Link>
        </div>
      </div>

      {movies.length > 1 && (
        <>
          <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600"
              aria-label="Previous featured title"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600"
              aria-label="Next featured title"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="absolute bottom-10 left-8 z-10 flex gap-2" aria-label="Featured titles">
            {movies.map((featuredMovie, index) => (
              <button
                key={featuredMovie.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === visibleIndex ? "w-8 bg-red-500" : "w-2 bg-white/60"
                }`}
                aria-label={`Show featured title ${index + 1}`}
                aria-current={index === visibleIndex ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default HeroBanner;
