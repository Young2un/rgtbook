"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/books?search=${searchQuery}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full flex gap-2 mb-6 items-center "
    >
      <Input
        type="text"
        placeholder="책 제목 또는 저자로 검색하기"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full py-7 text-lg placeholder:text-lg"
      />
      <Button type="submit" className="py-7 w-40 text-lg">
        검색
      </Button>
    </form>
  );
}
