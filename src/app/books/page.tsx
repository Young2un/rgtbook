import SearchBar from "../_components/SearchBar";
import AddBookButton from "./_components/AddBookButton";
import BookList from "./_components/BookList";
import BookListPagination from "./_components/BookListPagination";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page || "1", 10);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books?search=${search}&page=${page}`,
    { cache: "no-store" }
  );
  const { books, totalPages } = await response.json();
  const prevPage = page > 1 ? `/books?page=${page - 1}&search=${search}` : null;
  const nextPage =
    page < totalPages ? `/books?page=${page + 1}&search=${search}` : null;

  return (
    <main className="flex flex-col items-center p-20 ">
      <div className="w-full max-w-3xl">
        <SearchBar search={search} />
        <div className="flex justify-end">
          <AddBookButton />
        </div>
        <BookList books={books} />
        <BookListPagination
          prevPage={prevPage}
          nextPage={nextPage}
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    </main>
  );
}
