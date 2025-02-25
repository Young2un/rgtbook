// 메인페이지
export default async function Home() {
  const response = await fetch("http://localhost:3000/api/books");
  const data = await response.json();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      home
    </main>
  );
}
