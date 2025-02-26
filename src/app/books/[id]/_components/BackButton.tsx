"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <Button onClick={handleBackClick} className="p-5" variant={"destructive"}>
      목록으로 돌아가기
    </Button>
  );
}
