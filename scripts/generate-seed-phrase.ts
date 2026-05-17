import * as bip39 from "bip39";

async function main() {
  const wordlist = bip39.wordlists.japanese;
  const seedPhrase = await bip39.generateMnemonic(128, undefined, wordlist);
  return seedPhrase;
}

main().then((seedPhrase) => {
  console.log(seedPhrase);
});