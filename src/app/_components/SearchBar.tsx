"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface SearchBarProps {
  search: string;
}

export default function SearchBar({ search }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(search);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      router.push("/books");
      return;
    }

    router.push(`/books?search=${trimmedQuery}`);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex flex-col gap-2 mb-2">
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          placeholder="책 제목 또는 저자로 검색하기"
          value={searchQuery}
          onChange={handleOnChange}
          className="w-full py-7 text-lg placeholder:text-lg text-inherit"
        />
        <Button type="submit" className="py-7 w-40 text-lg">
          검색
        </Button>
      </div>
    </form>
  );
}
