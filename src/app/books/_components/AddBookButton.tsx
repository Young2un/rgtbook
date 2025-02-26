import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AddBookButton() {
  return (
    <Button variant="outline" className="mb-4" asChild>
      <Link href="/books/create">책 추가하기 +</Link>
    </Button>
  );
}
