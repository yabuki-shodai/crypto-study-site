import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bitcoin Wallet",
  description: "BIP39 seed phrase to Bitcoin receiving address",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased ">
      <body className="min-h-full flex flex-col">
        <main className="min-h-screen bg-stone-100 text-zinc-950">
          {children}
        </main>

      </body>
    </html>
  );
}
