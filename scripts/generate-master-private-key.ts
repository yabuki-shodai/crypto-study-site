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
