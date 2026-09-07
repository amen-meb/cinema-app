import { Link } from "react-router-dom";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function PersonCard({ person }) {
  const image = person.profile_path ? `${IMAGE_URL}${person.profile_path}` : null;

  return (
    <Link
      to={`/celebrity/${person.id}`}
      className="group overflow-hidden rounded-xl bg-zinc-900 transition hover:-translate-y-1 hover:bg-zinc-800"
    >
      {image ? (
        <img src={image} alt={person.name} className="aspect-[2/3] w-full object-cover transition duration-300 group-hover:scale-105" />
      ) : (
        <div className="flex aspect-[2/3] items-center justify-center bg-zinc-800 text-sm text-gray-500">No Image</div>
      )}
      <div className="p-4">
        <h3 className="truncate font-semibold">{person.name}</h3>
        <p className="mt-1 truncate text-sm text-gray-400">{person.known_for_department || "Actor"}</p>
      </div>
    </Link>
  );
}
