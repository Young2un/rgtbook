import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import Logo from "/public/assets/logo.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RGT BOOK",
  description: "project test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <header className="relative flex h-[60px] justify-center items-center">
          <Link href={"/"}>
            <Image height={40} src={Logo} alt="logo" className="mt-20"></Image>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
