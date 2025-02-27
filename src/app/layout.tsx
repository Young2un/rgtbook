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
        <div className="flex min-h-screen flex-col">
          <header className="flex h-28 w-full justify-center items-center shadow mb-8">
            <Link href="/" className="">
              <Image height={40} src={Logo} alt="logo"></Image>
            </Link>
          </header>
          <main className="flex-1 max-w-4xl mx-auto w-full px-4 h-">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} 온라인 서점. RGT BOOK 관리자
                페이지
              </p>
              <p className="text-xs mt-2 text-gray-400">
                문의: support@bookstore.com
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
