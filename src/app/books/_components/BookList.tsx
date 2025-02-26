import { Book } from "@/type";
import Image from "next/image";
import Link from "next/link";
import MeatballButton from "./MeatballButton";

export default function BookList({
  books,
}: {
  books: Omit<Book, "description">[];
}) {
  return (
    <div className="w-full max-w-3xl">
      {books.length === 0 ? (
        <p className="text-center text-gray-500 pt-10 text-lg">
          검색 결과가 없습니다.
        </p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book.id}
              className=" border p-4 rounded shadow flex justify-between "
            >
              <Link
                href={`/books/${book.id}`}
                className="flex gap-4 items-center"
              >
                <Image
                  src={book.image_url}
                  alt={`${book.title} 이미지`}
                  width={80}
                  height={80}
                />
                <div className="flex flex-col justify-around h-full">
                  <div>
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-gray-600">저자: {book.author}</p>
                  </div>
                  <div>
                    <span className="mr-3 text-sm text-gray-400 font-normal">
                      재고: {book.stock}
                    </span>
                    <span className="text-sm text-gray-400 font-normal">
                      판매수량: {book.sales_count}
                    </span>
                  </div>
                </div>
              </Link>
              <MeatballButton bookId={book.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
