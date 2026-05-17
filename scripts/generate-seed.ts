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
