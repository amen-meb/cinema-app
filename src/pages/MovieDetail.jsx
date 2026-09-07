import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useMovieDetail from "../hooks/useMovieDetail";

import DetailHero from "../components/movie/DetailHero";
import CastRow from "../components/movie/CastRow";
import MovieRow from "../components/movie/MovieRow";

import { fetchFromTMDB } from "../services/tmdb";


function MovieDetail() {
  const { id } = useParams();

  const {
    movie,
    loading,
    error,
  } = useMovieDetail(id);

  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loadingExtras, setLoadingExtras] = useState(true);


  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function getExtraData() {
      try {
        setLoadingExtras(true);

        const [credits, similar] =
          await Promise.all([
            fetchFromTMDB(
              `/movie/${id}/credits`,
              {
                signal: controller.signal,
              }
            ),

            fetchFromTMDB(
              `/movie/${id}/similar`,
              {
                signal: controller.signal,
              }
            ),
          ]);

        setCast(
          credits.cast?.slice(0, 10) || []
        );

        setSimilarMovies(
          similar.results || []
        );

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      } finally {
        setLoadingExtras(false);
      }
    }

    getExtraData();

    return () => {
      controller.abort();
    };

  }, [id]);


  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="animate-pulse text-xl text-gray-400">
          Loading movie...
        </p>
      </div>
    );
  }


  if (error) {
    return (
      <div className="rounded-xl bg-red-950 p-8 text-center">
        <h1 className="text-xl font-bold text-red-400">
          Something went wrong
        </h1>

        <p className="mt-2 text-gray-400">
          {error}
        </p>
      </div>
    );
  }


  if (!movie) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-400">
          Movie not found.
        </p>
      </div>
    );
  }


  return (
    <div className="mx-auto max-w-7xl">

      <DetailHero
        movie={movie}
        onTrailerClick={() =>
          console.log("Trailer clicked")
        }
      />


      {/* Cast */}

      <section className="mt-12">

        <h2 className="mb-5 text-2xl font-bold">
          Cast
        </h2>

        {loadingExtras ? (
          <p className="animate-pulse text-gray-400">
            Loading cast...
          </p>
        ) : (
          <CastRow cast={cast} />
        )}

      </section>


      {/* Similar Movies */}

      <section className="mt-12">

        <MovieRow
          title="Similar Movies"
          movies={similarMovies}
          loading={loadingExtras}
        />

      </section>

    </div>
  );
}


export default MovieDetail;