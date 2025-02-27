"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface DropdownMenuProps {
  bookId: string;
  onClose: () => void;
}

export default function DropdownMenu({ bookId, onClose }: DropdownMenuProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    router.push(`/books/edit/${bookId}`);
    onClose();
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(`/api/books/${bookId}`, { method: "DELETE" });

      if (!res.ok) {
        const errorData = await res.json();
        alert("삭제 실패! 다시 시도해주세요.");
        return;
      }

      alert("삭제 완료!");
      router.push("/books");
      onClose();
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="absolute right-0 mt-2 w-24 bg-white shadow-md rounded-md text-sm overflow-hidden border">
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

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleConfirmDelete}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
