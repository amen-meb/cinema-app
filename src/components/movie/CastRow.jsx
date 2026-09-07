const IMAGE_URL =
  "https://image.tmdb.org/t/p/w185";

function CastRow({ cast }) {
  if (!cast.length) {
    return (
      <p className="text-gray-400">
        Cast information unavailable.
      </p>
    );
  }

  return (
    <div
      className="
        flex
        gap-5
        overflow-x-auto
        pb-4
      "
    >
      {cast.map((person) => {
        const image = person.profile_path
          ? `${IMAGE_URL}${person.profile_path}`
          : null;

        return (
          <div
            key={person.cast_id || person.id}
            className="
              min-w-[120px]
              text-center
            "
          >
            {image ? (
              <img
                src={image}
                alt={person.name}
                className="
                  mx-auto
                  h-36
                  w-24
                  rounded-lg
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  mx-auto
                  flex
                  h-36
                  w-24
                  items-center
                  justify-center
                  rounded-lg
                  bg-zinc-800
                  text-xs
                  text-gray-500
                "
              >
                No Image
              </div>
            )}

            <h3
              className="
                mt-2
                truncate
                text-sm
                font-semibold
              "
            >
              {person.name}
            </h3>

            <p
              className="
                mt-1
                truncate
                text-xs
                text-gray-400
              "
            >
              {person.character}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default CastRow;