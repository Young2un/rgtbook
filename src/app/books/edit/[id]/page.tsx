import EditBookForm from "./_components/EditBookForm";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return (
      <div className="text-red-500 text-center">
        책 정보를 불러올 수 없습니다.
      </div>
    );
  }

  const book = await res.json();

  return <EditBookForm book={book} />;
}
