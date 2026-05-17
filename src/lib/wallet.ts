import * as bip39 from "bip39";
import BIP32Factory from "bip32";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";

const bip32 = BIP32Factory(ecc);

export type Address = {
  address: string;
  path: string;
};

export type WalletResult = {
  addresses: Address[];
};


export async function deriveAddress(
  phrase: string,
  passphrase: string,
): Promise<WalletResult> {


  // Bitcoin testnet を使う
  const network = bitcoin.networks.bitcoin;

  // シードフレーズのチェック
  const mnemonic = phrase.trim().toLowerCase().replace(/\s+/g, " ");
  if (!bip39.validateMnemonic(mnemonic, bip39.wordlists.japanese)) {
    throw new Error("正しい日本語シードフレーズではありません");
  }

  // 5. シードフレーズから seed を作る　(PBKDF2 を使っている)
  const seed = await bip39.mnemonicToSeed(mnemonic, passphrase);

  // 6. seed から マスターの秘密鍵を作成する
  const root = bip32.fromSeed(seed, network);
  console.log("root", root);
  console.log("root chain code", root.chainCode);


  const addresses: Address[] = [];

  for (let i = 0; i < 10; i++) {
    // BIP84 mainnet の派生パスを作る
    // tb1q... で始まる Native SegWit アドレス

    const path = `m/84'/0'/0'/0/${i}`;
    console.log("path", path);

    // 7. 派生パスから child key を作る
    const child = root.derivePath(path);
    console.log("child", child);
    // 8. child key の公開鍵から Bitcoin アドレスを作る
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: child.publicKey,
      network,
    });
    console.log("address", address);

    if (!address) {
      throw new Error("アドレスを生成できませんでした");
    }
    addresses.push({
      address,
      path,
    });
  }


  return {
    addresses,
  };
}

export async function generateMnemonic() {
  const japaneseWordlist = bip39.wordlists.japanese;
  const mnemonic = await bip39.generateMnemonic(128, undefined, japaneseWordlist);
  return mnemonic;
}
