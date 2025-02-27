import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader() {
  return (
    <main className="flex flex-col items-center px-4">
      <div className="w-full max-w-3xl space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white"
          >
            {/* 책 이미지 스켈레톤 */}
            <Skeleton className="h-20 w-20 rounded-md" />

            {/* 텍스트 스켈레톤 */}
            <div className="flex flex-col space-y-3 w-full">
              <Skeleton className="h-5 w-3/5 rounded" />
              <Skeleton className="h-4 w-2/5 rounded" />
              <Skeleton className="h-4 w-1/3 rounded" />
            </div>
          </div>
        ))}

        {/* 버튼 스켈레톤 */}
        <div className="flex justify-between mt-6">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
    </main>
  );
}
