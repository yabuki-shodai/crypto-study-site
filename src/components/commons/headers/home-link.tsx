import Link from "next/link";

export const HomeLink = () => {
  return (
    <Link
      href="/"
      aria-label="トップページに戻る"
      title="トップページに戻る"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-gray-100 hover:bg-gray-200 text-lg font-semibold text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-950"
    >
      ←
    </Link>
  );
};
