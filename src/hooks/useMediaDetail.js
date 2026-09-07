import { useEffect, useState } from "react";
import { fetchFromTMDB } from "../services/tmdb";

export default function useMediaDetail(type, id) {
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function getMedia() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFromTMDB(`/${type}/${id}`, {
          signal: controller.signal,
        });
        setMedia(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        setLoading(false);
      }
    }

    getMedia();
    return () => controller.abort();
  }, [type, id]);

  return { media, loading, error };
}
