import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

function MovieRow({
  title,
  movies = [],
  loading = false,
  mediaType = "movie",
}) {
  const rowRef = useRef(null);

  function scrollRow(direction) {
    rowRef.current?.scrollBy({ left: direction * 440, behavior: "smooth" });
  }

  return (
    <section
      className="
mb-10
"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {!loading && movies.length > 0 && (
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollRow(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-red-500 hover:bg-red-600"
              aria-label={`Scroll ${title} left`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollRow(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-red-500 hover:bg-red-600"
              aria-label={`Scroll ${title} right`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div
        className="
flex
gap-5
overflow-x-auto
pb-4
scrollbar-thin
"
        ref={rowRef}
      >
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="
w-[200px]
shrink-0
sm:w-[220px]
"
              >
                <SkeletonCard />
              </div>
            ))
          : movies.map((movie) => (
              <div
                key={movie.id}
                className="
w-[200px]
shrink-0
sm:w-[220px]
"
              >
                <MovieCard movie={movie} mediaType={mediaType} />
              </div>
            ))}
      </div>
    </section>
  );
}

export default MovieRow;
