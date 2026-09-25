import useMovies from "../hooks/useMovies";

import HeroBanner from "../components/movie/HeroBanner";
import MovieRow from "../components/movie/MovieRow";

function Home() {
  const {
    movies: trending,
    loading: trendingLoading,
    error: trendingError,
  } = useMovies("/trending/movie/week");

  const {
    movies: popular,
    loading: popularLoading,
    error: popularError,
  } = useMovies("/movie/popular");

  const {
    movies: topRated,
    loading: topRatedLoading,
    error: topRatedError,
  } = useMovies("/movie/top_rated");

  const {
    movies: popularSeries,
    loading: popularSeriesLoading,
    error: popularSeriesError,
  } = useMovies("/tv/popular");

  const {
    movies: topRatedSeries,
    loading: topRatedSeriesLoading,
    error: topRatedSeriesError,
  } = useMovies("/tv/top_rated");

  if (trendingLoading) {
    return (
      <div className="space-y-10">
        <div className="h-[55vh] animate-pulse rounded-xl bg-zinc-900" />
        <MovieRow title="Loading trending movies" movies={[]} loading />
      </div>
    );
  }

  const requestError =
    trendingError ||
    popularError ||
    topRatedError ||
    popularSeriesError ||
    topRatedSeriesError;

  if (requestError) {
    return (
      <div className="mx-auto max-w-3xl rounded-xl border border-red-900 bg-red-950/60 p-8 text-center">
        <h1 className="text-2xl font-bold text-red-300">
          Movies could not be loaded
        </h1>
        <p className="mt-3 text-red-200">{requestError}</p>
        <p className="mt-4 text-sm text-gray-300">
          For Vercel, add VITE_TMDB_KEY under Settings, Environment Variables,
          then redeploy the project.
        </p>
      </div>
    );
  }

  const featuredMovies = [
    ...trending.slice(0, 3),
    ...popularSeries.slice(0, 2).map((series) => ({
      ...series,
      media_type: "tv",
    })),
  ];

  return (
    <div
      className="
space-y-12
"
    >
      {/* Hero */}

      <HeroBanner movies={featuredMovies} />

      <div className="-mx-5">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          {/* Trending */}

          <MovieRow
            title="Trending This Week"
            movies={trending}
            loading={trendingLoading}
          />

          {/* Popular */}

          <MovieRow
            title="Popular Movies"
            movies={popular}
            loading={popularLoading}
          />

          {/* Top Rated */}

          <MovieRow
            title="Top Rated Movies"
            movies={topRated}
            loading={topRatedLoading}
          />

          <MovieRow
            title="Popular Series"
            movies={popularSeries}
            loading={popularSeriesLoading}
            mediaType="tv"
          />

          <MovieRow
            title="Top Rated Series"
            movies={topRatedSeries}
            loading={topRatedSeriesLoading}
            mediaType="tv"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
