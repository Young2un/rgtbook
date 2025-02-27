import Image from "next/image";
import { notFound } from "next/navigation";
import MeatballButton from "../_components/MeatballButton";
import BackButton from "./_components/BackButton";

// 상세페이지
export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${params.id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) return notFound();
  const book = await response.json();

  return (
    <>
      <div className="h-96 mb-10 border-b">
        <div className="flex justify-center font-black text-2xl mb-6 ">
          책 기본 정보
        </div>
        <div className="w-full flex justify-center">
          <div className="flex gap-8 mb-40 min-w-[640px]">
            <Image
              src={book.image_url}
              alt={book.title}
              width={200}
              height={200}
            />
            <div className="flex-col flex gap-5 w-full">
              <div className="flex justify-end w-full">
                <MeatballButton bookId={book.id} />
              </div>
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col items-start gap-1">
                  <h2 className="text-xl font-bold">{book.title}</h2>
                  <p className="text-gray-600">저자: {book.author}</p>
                  <p className="pb-4 text-sm text-gray-500">
                    재고: {book.stock} | 판매수량: {book.sales_count}
                  </p>
                </div>
                <BackButton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20">
        <div className="flex justify-center font-black text-2xl mb-6 ">
          책 소개
        </div>
        <p className="text-center mx-auto max-w-3xl">{book.description}</p>
      </div>
    </>
  );
}
