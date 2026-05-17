"use client";

import { useState } from "react";
import Link from "next/link";
import { AddressResult } from "@/components/elements/wallet/address-result";
import { WalletForm } from "@/components/elements/wallet/wallet-form";
import { deriveAddress, generateMnemonic } from "@/lib/wallet";
import type { WalletResult } from "@/lib/wallet";

export function WalletAddressGeneratorView() {
  const [mnemonic, setMnemonic] = useState("");

  // パスフレーズ
  const [passphrase, setPassphrase] = useState("");

  // アドレス生成結果
  const [result, setResult] = useState<WalletResult | null>(null);

  // エラー内容
  const [error, setError] = useState("");

  // 処理中フラグ
  const [isWorking, setIsWorking] = useState(false);

  /**
   * アドレスを生成する
   * @param nextMnemonic - シードフレーズ
   * @returns アドレス生成結果
   */
  async function createAddress(nextMnemonic = mnemonic) {
    const address = await deriveAddress(nextMnemonic, passphrase);
    return address;
  }

  /**
   * アドレスを作成する
   */
  async function handleCreateAddress() {
    setError("");
    setResult(null);
    setIsWorking(true);

    try {
      setResult(await createAddress());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "処理に失敗しました。");
    } finally {
      setIsWorking(false);
    }
  }

  /**
   * シードフレーズを生成する
   */
  async function handleGenerateSeed() {
    setError("");
    setResult(null);
    setIsWorking(true);

    try {
      // シードフレーズを生成する
      const nextMnemonic = await generateMnemonic();
      // シードフレーズを設定する
      setMnemonic(nextMnemonic);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "処理に失敗しました。");
    } finally {
      setIsWorking(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
      <header className="flex flex-col gap-4 border-b border-zinc-300 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-zinc-950 sm:text-4xl">
            ビットコインアドレス生成サイト
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Bitcoin メインネット の BIP84 アドレスを作成します
          </p>
        </div>
      </header>

      <section className="mt-6 space-y-6">
        <WalletForm
          error={error}
          isWorking={isWorking}
          mnemonic={mnemonic}
          passphrase={passphrase}
          onGenerateSeed={handleGenerateSeed}
          onMnemonicChange={setMnemonic}
          onPassphraseChange={setPassphrase}
          onCreateAddress={handleCreateAddress}
        />

        <AddressResult result={result} />
      </section>
      <div className="mt-6">
        <Link className="text-blue-500" href="https://bip39.dev/ja/#japanese" target="_blank">同じシードフレーズで復元できるか試してみよう！</Link>
      </div>
    </div>
  );
}
