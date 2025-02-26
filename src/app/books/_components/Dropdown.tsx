"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface DropdownMenuProps {
  bookId: string;
  onClose: () => void;
}

export default function DropdownMenu({ bookId, onClose }: DropdownMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleEditClick = () => {
    router.push(`books/edit/${bookId}`);
    onClose();
  };

  const handleDeleteClick = () => {
    // 삭제 로직 추가 예정
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-24 bg-white shadow-md rounded-md text-sm overflow-hidden border"
    >
      <button
        className="w-full px-3 py-2 text-left hover:bg-gray-100"
        onClick={handleEditClick}
      >
        수정하기
      </button>
      <button
        className="w-full px-3 py-2 text-left hover:bg-red-100 text-red-500"
        onClick={handleDeleteClick}
      >
        삭제하기
      </button>
    </div>
  );
}
