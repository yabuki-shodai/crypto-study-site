"use client";

import { useState } from "react";

type AddressBalance = {
  confirmed: number;
  unconfirmed: number;
  total: number;
};

type BlockstreamAddressResponse = {
  chain_stats: {
    funded_txo_sum: number;
    spent_txo_sum: number;
  };
  mempool_stats: {
    funded_txo_sum: number;
    spent_txo_sum: number;
  };
};

function formatBtc(satoshi: number) {
  return (satoshi / 100_000_000).toFixed(8);
}

export default function BitcoinBalanceCheckPage() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<AddressBalance | null>(null);
  const [error, setError] = useState("");
  const [isWorking, setIsWorking] = useState(false);

  async function handleFetchBalance() {
    const nextAddress = address.trim();

    setError("");
    setBalance(null);

    if (!nextAddress) {
      setError("ビットコインアドレスを入力してください。");
      return;
    }

    setIsWorking(true);

    try {
      const response = await fetch(`https://blockstream.info/api/address/${nextAddress}`);

      if (!response.ok) {
        throw new Error("残高を取得できませんでした。アドレスを確認してください。");
      }

      const data = (await response.json()) as BlockstreamAddressResponse;
      const confirmed = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
      const unconfirmed = data.mempool_stats.funded_txo_sum - data.mempool_stats.spent_txo_sum;

      setBalance({
        confirmed,
        unconfirmed,
        total: confirmed + unconfirmed,
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "残高を取得できませんでした。");
    } finally {
      setIsWorking(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-4 border-b border-zinc-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
            ビットコインアドレス残高確認
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Bitcoin mainnet のアドレス単位で残高を確認します
          </p>
        </div>
      </header>

      <section className="mt-6 space-y-6">
        <div className="flex flex-col gap-5 rounded-md border border-zinc-300 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="bitcoin-address" className="text-sm font-semibold text-zinc-800">
              ビットコインアドレス
            </label>
            <input
              id="bitcoin-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              spellCheck={false}
              placeholder="bc1q..."
              className="h-11 rounded-md border border-zinc-300 bg-zinc-50 px-3 font-mono text-sm outline-none transition focus:border-zinc-700 focus:bg-white"
            />
          </div>

          {error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <div className="flex justify-center gap-3 border-t border-zinc-200 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={handleFetchBalance}
              disabled={isWorking}
              className="h-11 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {isWorking ? "取得中" : "残高を確認"}
            </button>
          </div>
        </div>

        <div className="rounded-md border border-zinc-300 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-4">
            <div>
              <p className="text-sm font-semibold text-zinc-800">残高</p>
              <p className="mt-1 text-xs text-zinc-500">Blockstream API</p>
            </div>
            <span className="rounded border border-zinc-300 px-2 py-1 font-mono text-xs text-zinc-600">
              mainnet
            </span>
          </div>

          {balance ? (
            <dl className="grid gap-3 pt-5 text-sm">
              <div className="flex items-center justify-between gap-4 rounded-md bg-zinc-50 p-3">
                <dt className="text-zinc-500">確定済み</dt>
                <dd className="text-right font-mono text-zinc-900">
                  {formatBtc(balance.confirmed)} BTC
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-md bg-zinc-50 p-3">
                <dt className="text-zinc-500">未確定</dt>
                <dd className="text-right font-mono text-zinc-900">
                  {formatBtc(balance.unconfirmed)} BTC
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-md bg-zinc-950 p-3">
                <dt className="text-white">合計</dt>
                <dd className="text-right font-mono text-white">
                  {formatBtc(balance.total)} BTC
                </dd>
              </div>
            </dl>
          ) : (
            <div className="flex min-h-56 items-center justify-center rounded-md bg-zinc-50 p-6 text-center text-sm text-zinc-500">
              残高はここに表示されます
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
