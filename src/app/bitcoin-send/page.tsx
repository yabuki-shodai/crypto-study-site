import { HomeLink } from "@/components/commons/headers/home-link";

export default function BitcoinSendPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-4 border-b border-zinc-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mt-2 flex items-center gap-3">
            <HomeLink />
            <h1 className="text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
              ビットコインを送金してみた！
            </h1>
          </div>
        </div>
      </header>

      <section className="mt-6">
        <div className="rounded-md border border-zinc-300 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold text-zinc-800">送金フォーム</p>
          <div className="mt-4 flex min-h-56 items-center justify-center rounded-md bg-zinc-50 p-6 text-center text-sm text-zinc-500">
            ここに送金フォームを作る予定です
          </div>
        </div>
      </section>
    </div>
  );
}
