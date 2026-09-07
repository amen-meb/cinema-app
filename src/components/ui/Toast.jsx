function Toast({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="
        fixed
        bottom-6
        left-1/2
        z-[200]
        -translate-x-1/2
        animate-[fadeIn_0.2s_ease-out]
        rounded-lg
        bg-zinc-900
        px-5
        py-3
        text-md
        font-medium
        text-white
        shadow-xl
        ring-1
        ring-white/10
      "
    >
      {message}
    </div>
  );
}

export default Toast;
