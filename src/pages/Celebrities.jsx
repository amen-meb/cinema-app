import { useEffect, useMemo, useState } from "react";
import PersonGrid from "../components/person/PersonGrid";
import SkeletonCard from "../components/movie/SkeletonCard";
import GenreFilter from "../components/ui/GenreFilter";
import SortSelect from "../components/ui/SortSelect";
import { fetchFromTMDB } from "../services/tmdb";

export default function Celebrities() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [department, setDepartment] = useState(null);
  const [sortOption, setSortOption] = useState("popularity");

  useEffect(() => {
    const controller = new AbortController();
    fetchFromTMDB("/person/popular", { signal: controller.signal })
      .then((data) => setPeople(data.results || []))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const departments = useMemo(
    () =>
      [
        ...new Set(
          people.map((person) => person.known_for_department).filter(Boolean),
        ),
      ].map((name) => ({ id: name, name })),
    [people],
  );
  const filteredPeople = useMemo(() => {
    const result = people.filter(
      (person) =>
        department === null || person.known_for_department === department,
    );
    return [...result].sort((a, b) =>
      sortOption === "name"
        ? a.name.localeCompare(b.name)
        : (b.popularity || 0) - (a.popularity || 0),
    );
  }, [people, department, sortOption]);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Celebrities</h1>
        <p className="mt-2 text-gray-400">
          Discover popular actors, directors, and creators.
        </p>
      </header>
      <GenreFilter
        genres={departments}
        selectedGenre={department}
        onGenreChange={setDepartment}
      />
      <SortSelect
        sortOption={sortOption}
        onSortChange={setSortOption}
        options={[
          ["popularity", "Popularity"],
          ["name", "Name: A to Z"],
        ]}
      />
      {loading && (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-red-950 p-6 text-center text-red-300">
          {error}
        </div>
      )}
      {!loading && !error && <PersonGrid people={filteredPeople} />}
    </div>
  );
}
