import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white dark:bg-primary">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary dark:text-primary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-primary md:text-4xl dark:text-white">
            잘못된 페이지에 접근하셨습니다.
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            홈으로 가기
          </Link>
        </div>
      </div>
    </section>
  );
}
