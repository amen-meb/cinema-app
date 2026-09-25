import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMediaDetail from "../hooks/useMediaDetail";
import DetailHero from "../components/movie/DetailHero";
import CastRow from "../components/movie/CastRow";
import MovieRow from "../components/movie/MovieRow";
import TrailerModal from "../components/movie/TrailerModal";
import SkeletonCard from "../components/movie/SkeletonCard";
import { fetchFromTMDB } from "../services/tmdb";

export default function SeriesDetail() {
  const { id } = useParams();
  const { media: series, loading, error } = useMediaDetail("tv", id);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [loadingExtras, setLoadingExtras] = useState(true);
  const [extrasError, setExtrasError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    setLoadingExtras(true);
    setExtrasError(null);
    Promise.all([
      fetchFromTMDB(`/tv/${id}/credits`, { signal: controller.signal }),
      fetchFromTMDB(`/tv/${id}/similar`, { signal: controller.signal }),
      fetchFromTMDB(`/tv/${id}/videos`, { signal: controller.signal }),
    ])
      .then(([credits, related, videos]) => {
        setCast(credits.cast?.slice(0, 10) || []);
        setSimilar(related.results || []);
        const trailer = videos.results?.find(
          (video) => video.site === "YouTube" && video.type === "Trailer",
        );
        setTrailerKey(trailer?.key || null);
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError")
          setExtrasError(requestError.message);
      })
      .finally(() => {
        setLoadingExtras(false);
      });
    return () => controller.abort();
  }, [id]);

  if (loading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-gray-400">
        Loading series...
      </div>
    );
  if (error)
    return (
      <div className="rounded-xl bg-red-50 p-8 text-center text-red-700 dark:bg-red-950 dark:text-red-300">
        {error}
      </div>
    );
  if (!series)
    return (
      <div className="py-20 text-center text-gray-400">Series not found.</div>
    );

  return (
    <div className="mx-auto max-w-7xl">
      <DetailHero
        movie={series}
        mediaType="tv"
        onTrailerClick={() => setTrailerOpen(true)}
        hasTrailer={Boolean(trailerKey)}
      />
      <section className="mt-12">
        <h2 className="mb-5 text-2xl font-bold">Cast</h2>
        {loadingExtras ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : extrasError ? (
          <p className="text-red-300">{extrasError}</p>
        ) : (
          <CastRow cast={cast} />
        )}
      </section>
      <MovieRow
        title="Similar Series"
        movies={similar}
        loading={loadingExtras}
        mediaType="tv"
      />
      {trailerOpen && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </div>
  );
}
