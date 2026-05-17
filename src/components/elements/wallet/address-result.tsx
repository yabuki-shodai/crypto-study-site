import type { WalletResult } from "@/lib/wallet";

type AddressResultProps = {
  result: WalletResult | null;
};

export function AddressResult({ result }: AddressResultProps) {
  const addresses = result?.addresses ?? [];

  return (
    <div className="rounded-md border border-zinc-300 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-4">
        <div>
          <p className="text-sm font-semibold text-zinc-800">生成アドレス</p>
          <p className="mt-1 text-xs text-zinc-500">Bitcoin mainnet</p>
        </div>
        <span className="rounded border border-zinc-300 px-2 py-1 font-mono text-xs text-zinc-600">
          BIP84
        </span>
      </div>

      {result ? (
        addresses.length > 0 ? (
          <ol className="grid gap-3 pt-5">
            {addresses.map((item, index) => (
              <li
                key={`${item.path}-${item.address}`}
                className="rounded-md border border-zinc-200 bg-zinc-50 p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-zinc-500">
                    #{index + 1}
                  </span>
                  <span className="font-mono text-xs text-zinc-500">{item.path}</span>
                </div>
                <p className="mt-3 break-all rounded-md bg-zinc-950 p-3 font-mono text-sm leading-6 text-white">
                  {item.address}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <div className="flex min-h-56 items-center justify-center rounded-md bg-zinc-50 p-6 text-center text-sm text-zinc-500">
            アドレスがありません
          </div>
        )
      ) : (
        <div className="flex min-h-56 items-center justify-center rounded-md bg-zinc-50 p-6 text-center text-sm text-zinc-500">
          アドレスはここに表示されます
        </div>
      )}
    </div>
  );
}
