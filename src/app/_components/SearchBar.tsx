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
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("검색어를 입력해주세요.");
      return;
    }
    setError("");
    if (searchQuery.trim()) {
      router.push(`/books?search=${searchQuery}`);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex flex-col gap-2 mb-2">
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          placeholder="책 제목 또는 저자로 검색하기"
          value={searchQuery}
          onChange={handleOnChange}
          className="w-full py-7 text-lg  placeholder:text-lg text-inherit"
        />
        <Button type="submit" className="py-7 w-40 text-lg">
          검색
        </Button>
      </div>
      <p
        className={`text-red-500 text-sm h-5 transition-opacity duration-300 ${
          error ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {error}
      </p>
    </form>
  );
}
