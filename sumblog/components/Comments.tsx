export default function Comments() {
  return (
    <>
      <input
        placeholder="What are your thoughts"
        className="w-1/2 border-[1px] border-zinc-400 p-4"
      />
      <button className="w-28 rounded-full border-[1px] border-zinc-400">
        Comment
      </button>
    </>
  );
}
