import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBar from "./_components/SearchBar";

// 메인페이지
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-6/12 max-w-3xl mb-60">
        <SearchBar search="" />
        <Link href="/books">
          <Button className="w-full text-lg py-7">📚 전체 책 목록 보기</Button>
        </Link>
      </div>
    </main>
  );
}
