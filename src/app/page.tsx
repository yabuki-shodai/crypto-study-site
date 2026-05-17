import Link from "next/link";

export default function Home() {
  const notes = [
    {
      href: "/bitcoin-address-generate/about",
      number: "01",
      title: "TypeScriptでビットコインのウォレットの作ってみた。",
    },
    {
      href: "/bitcoin-balance-check",
      number: "02",
      title: "ビットコインの残高を確認してみた。",
    },
    {
      href: "/bitcoin-send",
      number: "03",
      title: "ビットコインを送金してみた！",
    },
  ];

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-4 py-6 text-sm leading-7 text-zinc-800 sm:px-6">
      <header className="border-b border-dotted border-zinc-500 pb-5">
        <h1 className="text-2xl font-semibold tracking-normal text-zinc-950">
          暗号資産の勉強メモ
        </h1>
        <p className="mt-3">
          ビットコインウォレットについて調べたことを、
          TypeScriptの小さなコードと一緒に少しずつ残しているメモです。
          あとで自分が読み返せるように、理解した順番で並べています。
        </p>
        <p className="mt-2 text-xs text-zinc-500">last updated: 2026-05-17</p>
      </header>

      <section className="mt-6">
        <h2 className="text-base font-semibold text-zinc-950">[ 目次 ]</h2>
        <p className="mt-1 text-xs text-zinc-500">気になったところから読む用。</p>

        <div className="mt-4 border-y border-dotted border-zinc-400">
          {notes.map((note) => (
            <Link
              key={note.href}
              href={note.href}
              className="grid gap-2 border-b border-dotted border-zinc-300 py-3 last:border-b-0 sm:grid-cols-[42px_1fr]"
            >
              <span className="font-mono text-xs text-zinc-500">
                {note.number}
              </span>
              <h3 className="font-semibold text-blue-700 underline decoration-dotted underline-offset-4">
                {note.title}
              </h3>
            </Link>
          ))}
        </div>

        <p className="mt-5 text-xs text-zinc-500">
          ※ 書きながら理解している途中のメモです。あとで内容を直すことがあります。
        </p>
      </section>
    </div>
  );
}
