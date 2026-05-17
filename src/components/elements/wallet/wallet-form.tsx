type WalletFormProps = {
  error: string;
  isWorking: boolean;
  mnemonic: string;
  passphrase: string;
  onGenerateSeed: () => void;
  onCreateAddress: () => void | Promise<void>;
  onMnemonicChange: (mnemonic: string) => void;
  onPassphraseChange: (passphrase: string) => void;
};

export function WalletForm({
  error,
  isWorking,
  mnemonic,
  passphrase,
  onGenerateSeed,
  onCreateAddress,
  onMnemonicChange,
  onPassphraseChange,
}: WalletFormProps) {
  return (
    <div className="flex flex-col gap-5 rounded-md border border-zinc-300 bg-white p-5 shadow-sm sm:p-6">
      <button
        type="button"
        onClick={onGenerateSeed}
        disabled={isWorking}
        className="h-11 rounded-md border border-zinc-300 bg-blue-500 px-5 text-sm font-semibold text-white transition hover:border-zinc-700 disabled:cursor-not-allowed disabled:text-zinc-400"
      >
        新規シード作成
      </button>
      <div className="flex flex-col gap-2">
        <label htmlFor="mnemonic" className="text-sm font-semibold text-zinc-800">
          シードフレーズ
        </label>
        <input
          id="mnemonic"
          value={mnemonic}
          onChange={(event) => onMnemonicChange(event.target.value)}
          spellCheck={false}
          placeholder="シードフレーズを入力してください"
          className="h-11 rounded-md border border-zinc-300 bg-zinc-50 px-3 text-sm outline-none transition focus:border-zinc-700 focus:bg-white"
        />
      </div>


      <div className="flex flex-col">
        <label htmlFor="passphrase" className="text-sm font-semibold text-zinc-800">
          パスフレーズ
        </label>
        <input
          id="passphrase"
          type="password"
          value={passphrase}
          onChange={(event) => onPassphraseChange(event.target.value)}
          autoComplete="off"
          className="h-11 rounded-md border border-zinc-300 bg-zinc-50 px-3 text-sm outline-none transition focus:border-zinc-700 focus:bg-white"
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
          onClick={onCreateAddress}
          disabled={isWorking}
          className="h-11 rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
        >
          {isWorking ? "処理中" : "アドレス作成"}
        </button>
      </div>
    </div>
  );
}
