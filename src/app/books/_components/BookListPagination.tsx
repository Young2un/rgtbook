"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BookListPaginationProps {
  prevPage: string | null;
  nextPage: string | null;
  currentPage: number;
  totalPages: number;
}

export default function BookListPagination({
  prevPage,
  nextPage,
  currentPage,
  totalPages,
}: BookListPaginationProps) {
  // 페이지 번호 생성 로직
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    if (totalPages <= 5) {
      // 전체 페이지가 5 이하인 경우: 전체 표시
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage > 3) pageNumbers.push(1, "...");
      for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(totalPages, currentPage + 2);
        i++
      )
        pageNumbers.push(i);
      if (currentPage < totalPages - 2) pageNumbers.push("...", totalPages);
    }
    return pageNumbers;
  };

  return (
    <Pagination className="mt-6 flex justify-center">
      <PaginationContent>
        {prevPage && (
          <PaginationItem>
            <PaginationPrevious href={prevPage} />
          </PaginationItem>
        )}

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === "number" ? (
              <PaginationLink
                href={`/books?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        {nextPage && (
          <PaginationItem>
            <PaginationNext href={nextPage} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
