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
  const path = `m/84'/0'/0'/0/${addressIndex}`;

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
