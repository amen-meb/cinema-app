function TrailerModal({ videoKey, onClose }) {
  if (!videoKey) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/90
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-4xl
          overflow-hidden
          rounded-xl
          bg-black
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Close button */}

        <button
          onClick={onClose}
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-black/70
            text-xl
            text-white
            hover:bg-red-600
          "
          aria-label="Close trailer"
        >
          ✕
        </button>

        {/* YouTube video */}

        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Movie Trailer"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share
            "
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;