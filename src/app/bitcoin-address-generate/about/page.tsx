import { Accordions } from "@/components/commons/accordions/accordions";
import { Header } from "@/components/commons/headers/header";
import { CodeBlock } from "@/components/commons/codes/code";
import Link from "next/link";
import { codes } from "@/constant/codes";
import Image from "next/image";



export default function About() {

  const defaultItems = [
    {
      id: "1",
      title: "質問1：まず暗号資産におけるウォレットとは何かわかりますか？",
      content: (
        <div>
          <p>
            答え：ウォレットとは、暗号資産そのものを入れる財布というより、
            秘密鍵を管理し、アドレス生成や送金時の署名を行うための仕組みです。
          </p>
        </div>
      ),
    },
    {
      id: "2",
      title: "質問2：ウォレットの種類には何がある？",
      content: (
        <div>
          <p>
            答え：大きく分けると、ホットウォレットとコールドウォレットがあります。
          </p>

          <div>
            <p className="text-sm text-zinc-600">
              ・インターネットにつながっている環境で秘密鍵を使うのがホットウォレット
            </p>
            <p className="text-sm text-zinc-600">
              ・インターネットから切り離された環境で秘密鍵を管理するのがコールドウォレット
            </p>

            <div className="mt-4 rounded-md bg-gray-100 p-4">
              <p className="font-semibold">取引所はどっち？</p>

              <div className="mt-2 space-y-2">
                <p>
                  取引所では、利用者資産の多くをコールドウォレットで保管し、
                  出金対応などに必要な一部をホットウォレットで管理することが一般的です。
                </p>
                <p>
                  利用者が取引所内で暗号資産を購入しても、通常はオンチェーンで
                  利用者専用の外部ウォレットに送金されるわけではありません。
                </p>
                <p>
                  その代わり、取引所のデータベース上で利用者の残高として反映されます。
                </p>
                <p>
                  利用者が自分のプライベートウォレットに出金したい場合、
                  取引所は送付用のウォレットから利用者が指定したアドレスへ送金します。
                </p>
                <p>
                  逆に、利用者が取引所に入金したい場合、取引所は利用者ごとの入金用アドレスを発行します。
                </p>
                <p>
                  利用者がそのアドレスへ送金すると、取引所はオンチェーン上の入金を確認し、
                  その金額を利用者の残高としてデータベースに反映します。
                </p>
                <p>
                  その後、取引所の運用方針に応じて、入金された暗号資産の一部または多くは
                  コールドウォレットへ移動されることがあります。
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
      <Header title="Typescriptでビットコイン受け取り用のウォレットの作ろう！" description="ビットコインウォレットの作り方を紹介します" />
      <div className="mt-6">
        <p className="text-lg font-semibold text-zinc-950">・ まずはウォレットについて知ろう！</p>
        <Accordions items={defaultItems} />
      </div>

      <div className="mt-6">
        <p className="text-lg font-semibold text-zinc-950">・ この研修でのビットコインウォレット作成の流れ </p>
        <div className="bg-white rounded-md p-8 flex flex-col gap-2">
          <Link href="/about#secret-phrase">1. シードフレーズを作成しよう！</Link>
          <Link href="/about#seed">2. Seedを作成しよう！</Link>
          <Link href="/about#master-key">3. マスターの秘密鍵を作成しよう！</Link>
          <Link href="/about#derived-path">4. 派生パスを作成しよう！</Link>
          <Link href="/about#bitcoin-address">5. ビットコインのアドレスを作成しよう！</Link>
        </div>
      </div>
      <div className="p-8 bg-white rounded-md mt-6">
        <p>全体像</p>
        <Image src="/bitcoin-wallet-flow.png" alt="flow" width={1000} height={1000} />
      </div>
      <div className="mt-6" id="secret-phrase">
        <p className="text-3xl font-semibold text-zinc-950">1. シードフレーズを作成しよう！</p>
        <div>
          <p>シードフレーズは、BIP39で定義されている12語もしくは24語の単語の組み合わせです。</p>
          <p>ウォレットを復元するために使用されるやつです。</p>
        </div>
        <div className="mt-6">
          <p>
            必要なライブラリをインストールしましょう！
          </p>
          <CodeBlock code={codes.installBip39} />
          <p>シードフレーズを作成するコートをかく。</p>
          <CodeBlock language="scripts/generate-seed-phrase.ts" code={codes.seedPhrase} />

          <p>シードフレーズを作成するコマンドを実行しましょう！</p>
          <CodeBlock code={`npm run generate:seed-phrase\n#実行結果\nならう　るいさい　てんし　ぬぐいとる　りゆう　しゃくほう　てんし　よそう　すいえい　しゃうん　こうどう　ほたる`} />

        </div>
        <Link className="text-blue-500" href="https://github.com/bitcoin/bips/blob/master/bip-0039/japanese.txt" target="_blank">
          使われている単語リストをよかったら確認してみてください！
        </Link>
      </div>

      <div className="mt-6" id="seed">
        <p className="text-3xl font-semibold text-zinc-950">2. Seedを作成しよう！</p>
        <div>
          <p>Seedは、シードフレーズとパスフレーズから作成されます。</p>
          <p>
            シードフレーズは人間が控えやすい単語の形ですが、
            そのまま秘密鍵を作るわけではありません。
            BIP39では、シードフレーズとパスフレーズをPBKDF2という処理に通して、
            ウォレット内部で使いやすいSeedに変換します。
          </p>
          <p>
            パスフレーズを空にした場合と、何か文字を入れた場合では、
            同じシードフレーズでも別のSeedになります。
          </p>
        </div>
        <div className="mt-6">
          <p>Seedを作成するコードを書きましょう！</p>
          <CodeBlock language="scripts/generate-seed.ts" code={codes.createSeed} />
          <p>
            実行するとSeedが16進数の文字列として表示されます。
            このSeedはマスター秘密鍵を作るための元になるため、
            本物のウォレットでは絶対に公開しないでください。
          </p>
          <CodeBlock code={`npm run generate:seed\n# 実行結果例\n9f64a747e1b97f131fabb6b447296c150000...`} />
        </div>
      </div>

      <div className="mt-6" id="master-key">
        <p className="text-3xl font-semibold text-zinc-950">3. マスター秘密鍵を作成しよう！</p>
        <div>
          <p>
            マスター秘密鍵は、Seedから作成されるウォレット全体の親になる秘密鍵です。
          </p>
          <p>
            このマスター秘密鍵から、後のステップで派生パスを使って受け取り用アドレスの秘密鍵を作っていきます。
          </p>
          <p>
            つまり、シードフレーズからSeedを作り、そのSeedからマスター秘密鍵を作る流れです。
          </p>
        </div>
        <div className="mt-6">
          <p>マスター秘密鍵を作成するコードを書きましょう！</p>
          <CodeBlock language="scripts/generate-master-private-key.ts" code={codes.createMasterPrivateKey} />
          <p>
            実行するとマスター秘密鍵が文字列として表示されます。
            マスター秘密鍵があればウォレット内のアドレスを再現できるため、
            本物のウォレットでは絶対に公開しないでください。
          </p>
          <CodeBlock code={`npm run generate:master-private-key\n# 実行結果例\nxprv9s21ZrQH143K...`} />
        </div>
      </div>

      <div className="mt-6" id="derived-path">
        <p className="text-3xl font-semibold text-zinc-950">4. 派生パスを作成しよう！</p>
        <div>
          <p>
            派生パスは、マスター秘密鍵からどの場所の秘密鍵を取り出すかを表す道順です。
          </p>
          <p>
            今回は、Bitcoin mainnetのBIP84を使って、
            Native SegWit形式の受け取り用アドレスを作成します。
          </p>
          <p>
            最後の数字がアドレスインデックスです。
            この数字を変えることで、同じマスター秘密鍵から複数の受け取り用アドレスを作れます。
          </p>
        </div>

        <div className="mt-6">
          <p>派生パスを作成するコードを書きましょう！</p>
          <CodeBlock language="scripts/generate-derived-path.ts" code={codes.createDerivedPath} />
          <p>
            実行すると、BIP84 mainnet用の派生パスが表示されます。
          </p>
          <CodeBlock code={`npm run generate:derived-path\n# 実行結果\nm/84'/0'/0'/0/0`} />
        </div>
        <div className="mt-4 rounded-md bg-white p-5">
          <p className="font-semibold">m/84&apos;/0&apos;/0&apos;/0/0 の意味</p>
          <div className="mt-3 space-y-2 text-sm text-zinc-700">
            <p>
              <span className="font-mono font-semibold text-zinc-950">m</span>
              ：マスター秘密鍵を起点にするという意味です。
            </p>
            <p>
              <span className="font-mono font-semibold text-zinc-950">84&apos;</span>
              ：BIP84を使うという意味です。Native SegWit形式のアドレスを作ります。
            </p>
            <p>
              <span className="font-mono font-semibold text-zinc-950">0&apos;</span>
              ：Bitcoin mainnetを使うという意味です。testnetの場合は
              <span className="font-mono">1&apos;</span>
              になります。
            </p>
            <p>
              <span className="font-mono font-semibold text-zinc-950">0&apos;</span>
              ：アカウント番号です。今回は最初のアカウントなので0を使います。
            </p>
            <p>
              <span className="font-mono font-semibold text-zinc-950">0</span>
              ：外部受け取り用アドレスという意味です。通常の受け取りアドレスでは0を使います。
            </p>
            <p>
              <span className="font-mono font-semibold text-zinc-950">0</span>
              ：アドレスインデックスです。0番目、1番目、2番目のように変えることで複数のアドレスを作れます。
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6" id="bitcoin-address">
        <p className="text-3xl font-semibold text-zinc-950">5. ビットコインのアドレスを作成しよう！</p>
        <div>
          <p>
            最後に、マスター秘密鍵から派生パスを使って子の秘密鍵を作り、
            その公開鍵からビットコインアドレスを作成します。
          </p>
          <p>
            今回はBIP84のNative SegWit形式なので、
            <span className="font-mono">bitcoin.payments.p2wpkh</span>
            を使います。
          </p>
          <p>
            mainnetでは、作成されるアドレスは
            <span className="font-mono">bc1q...</span>
            で始まります。
          </p>
        </div>
        <div className="mt-6">
          <p>ビットコインアドレスを作成するコードを書きましょう！</p>
          <CodeBlock language="scripts/generate-bitcoin-address.ts" code={codes.createBitcoinAddress} />
          <p>
            実行すると、使った派生パスとビットコインアドレスが表示されます。

          </p>
          <p>
            アドレスは公開してもよい情報ですが、シードフレーズ、Seed、マスター秘密鍵は公開してはいけません。
          </p>
          <CodeBlock code={`npm run generate:bitcoin-address\n# 実行結果例\npath: m/84'/0'/0'/0/0\naddress: bc1q0j9k7gu6q2azxkxpf502n3l96ee2x36xff90h9`} />
          <p>
            同じシードフレーズ、同じパスフレーズ、同じ派生パスを使えば、
            同じビットコインアドレスが再現されます。
          </p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <Link className="text-blue-500 hover:underline bg-white border border-zinc-300 px-4 py-2 rounded-full h-11" href="/">トップページに戻る</Link>
      </div>
    </div>
  );
}
