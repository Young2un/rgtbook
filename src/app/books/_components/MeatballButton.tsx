"use client";

import { useState } from "react";
import DropdownMenu from "./Dropdown";

export default function MeatballButton({ bookId }: { bookId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative">
      <button
        className="flex justify-between gap-1 items-center h-2"
        type="button"
        onClick={toggleMenu}
      >
        <span className="w-1.5 h-1.5 bg-primary/30 rounded-full transition-colors"></span>
        <span className="w-1.5 h-1.5 bg-primary/30 rounded-full transition-colors"></span>
        <span className="w-1.5 h-1.5 bg-primary/30 rounded-full transition-colors"></span>
      </button>

      {isOpen && (
        <DropdownMenu bookId={bookId} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
