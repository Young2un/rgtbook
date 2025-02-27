import BookList from "./BookList";
import BookListPagination from "./BookListPagination";

export default async function BookListGroup({
  search,
  page,
}: {
  search: string;
  page: number;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books?search=${search}&page=${page}`,
    { cache: "no-store" }
  );

  const { books, totalPages } = await response.json();
  const prevPage = page > 1 ? `/books?page=${page - 1}&search=${search}` : null;
  const nextPage =
    page < totalPages ? `/books?page=${page + 1}&search=${search}` : null;

  return (
    <>
      <BookList books={books} />
      <BookListPagination
        prevPage={prevPage}
        nextPage={nextPage}
        currentPage={page}
        totalPages={totalPages}
      />
    </>
  );
}
