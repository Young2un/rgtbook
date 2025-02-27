import { Suspense } from "react";
import SearchBar from "../_components/SearchBar";
import AddBookButton from "./_components/AddBookButton";
import BookListGroup from "./_components/BookListGroup";
import SkeletonLoader from "./_components/SkeletonLoader";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const search = searchParams.search || "";
  const page = parseInt(searchParams.page || "1", 10);

  return (
    <main className="flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <SearchBar search={search} />
        <div className="flex justify-end">
          <AddBookButton />
        </div>
        <Suspense fallback={<SkeletonLoader />}>
          <BookListGroup search={search} page={page} />
        </Suspense>
      </div>
    </main>
  );
}
