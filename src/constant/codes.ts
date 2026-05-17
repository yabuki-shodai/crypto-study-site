export const codes = {
  installBip39: `
npm install -D tsx
npm install bip39

# ファイル作成
touch scripts/generate-seed-phrase.ts

# コマンドをPackage.jsonに追加
"scripts": {
... 省略 ...
  "generate:seed-phrase": "tsx scripts/generate-seed-phrase.ts"
}
  `,
  seedPhrase: `
import * as bip39 from "bip39";

async function main() {
  const wordlist = bip39.wordlists.japanese;
  const seedPhrase = await bip39.generateMnemonic(128, undefined, wordlist);
  return seedPhrase;
}

main().then((seedPhrase) => {
  console.log(seedPhrase);
});
  `,
  createSeed: `
import * as bip39 from "bip39";

async function main() {
  const seedPhrase =
    "ならう　るいさい　てんし　ぬぐいとる　りゆう　しゃくほう　てんし　よそう　すいえい　しゃうん　こうどう　ほたる";
  const passphrase = "";

  const seed = await bip39.mnemonicToSeed(seedPhrase, passphrase);
  return seed.toString("hex");
}

main().then((seed) => {
  console.log(seed);
});
  `,
  createMasterPrivateKey: `
import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";

const bip32 = BIP32Factory(ecc);

async function main() {
  const seedPhrase =
    "ならう　るいさい　てんし　ぬぐいとる　りゆう　しゃくほう　てんし　よそう　すいえい　しゃうん　こうどう　ほたる";
  const passphrase = "";

  const seed = await bip39.mnemonicToSeed(seedPhrase, passphrase);
  const masterPrivateKey = bip32.fromSeed(seed, bitcoin.networks.bitcoin);

  return masterPrivateKey.toBase58();
}

main().then((masterPrivateKey) => {
  console.log(masterPrivateKey);
});
  `,
  createDerivedPath: `
async function main() {
  const addressIndex = 0;
  const path = \`m/84'/0'/0'/0/\${addressIndex}\`;

  return path;
}

main().then((path) => {
  console.log(path);
});
  `,
  createBitcoinAddress: `
import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";

const bip32 = BIP32Factory(ecc);

async function main() {
  const seedPhrase =
    "ならう　るいさい　てんし　ぬぐいとる　りゆう　しゃくほう　てんし　よそう　すいえい　しゃうん　こうどう　ほたる";
  const passphrase = "";
  const network = bitcoin.networks.bitcoin;
  const addressIndex = 0;
  const path = \`m/84'/0'/0'/0/\${addressIndex}\`;

  const seed = await bip39.mnemonicToSeed(seedPhrase, passphrase);
  const masterPrivateKey = bip32.fromSeed(seed, network);
  const childPrivateKey = masterPrivateKey.derivePath(path);

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: childPrivateKey.publicKey,
    network,
  });

  if (!address) {
    throw new Error("アドレスを生成できませんでした");
  }

  return { path, address };
}

main().then(({ path, address }) => {
  console.log("path:", path);
  console.log("address:", address);
});
  `,
};
