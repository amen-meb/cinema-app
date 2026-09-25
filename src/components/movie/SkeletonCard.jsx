function SkeletonCard() {
  return (
    <div
      className="
animate-pulse
rounded-xl
bg-slate-200
dark:bg-zinc-800
overflow-hidden
"
    >
      <div
        className="
h-[350px]
bg-slate-300
dark:bg-zinc-700
"
      />

      <div
        className="
space-y-3
p-4
"
      >
        <div
          className="
h-4
w-3/4
rounded
bg-slate-300
dark:bg-zinc-700
"
        />

        <div
          className="
h-3
w-1/2
rounded
bg-zinc-700
"
        />
      </div>
    </div>
  );
}

export default SkeletonCard;
