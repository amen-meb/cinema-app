import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFromTMDB } from "../services/tmdb";
import MovieRow from "../components/movie/MovieRow";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function CelebrityDetail() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetchFromTMDB(`/person/${id}`, { signal: controller.signal }),
      fetchFromTMDB(`/person/${id}/combined_credits`, { signal: controller.signal }),
    ]).then(([personData, creditData]) => {
      setPerson(personData);
      setCredits((creditData.cast || []).filter((item) => item.poster_path).sort((a, b) => (b.popularity || 0) - (a.popularity || 0)));
    }).catch((requestError) => {
      if (requestError.name !== "AbortError") setError(requestError.message);
    });
    return () => controller.abort();
  }, [id]);

  if (error) return <div className="rounded-xl bg-red-950 p-8 text-center text-red-300">{error}</div>;
  if (!person) return <div className="flex min-h-[60vh] items-center justify-center text-gray-400">Loading celebrity...</div>;

  return (
    <div className="mx-auto max-w-7xl">
      <section className="flex flex-col gap-8 rounded-2xl bg-zinc-900 p-6 md:flex-row md:p-10">
        {person.profile_path ? <img src={`${IMAGE_URL}${person.profile_path}`} alt={person.name} className="w-full max-w-xs rounded-xl object-cover" /> : <div className="flex aspect-[2/3] w-full max-w-xs items-center justify-center rounded-xl bg-zinc-800 text-gray-500">No Image</div>}
        <div><p className="text-sm uppercase tracking-widest text-red-400">{person.known_for_department || "Celebrity"}</p><h1 className="mt-2 text-4xl font-bold md:text-6xl">{person.name}</h1><p className="mt-6 max-w-3xl leading-7 text-gray-300">{person.biography || "Biography unavailable."}</p><p className="mt-5 text-gray-400">Born {person.birthday || "Unknown"}{person.place_of_birth ? ` in ${person.place_of_birth}` : ""}</p><Link to="/celebrities" className="mt-7 inline-block rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700">Back to celebrities</Link></div>
      </section>
      <MovieRow title="Movies and Series" movies={credits.slice(0, 20)} mediaType="auto" />
    </div>
  );
}
