"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const bookSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "책 제목을 입력해주세요."),
  author: z.string().min(1, "저자를 입력해주세요."),
  price: z.preprocess(
    (val) => Number(val),
    z.number().positive("가격은 0보다 커야 합니다.")
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().int().positive("재고는 1 이상이어야 합니다.")
  ),
  description: z.string().min(1, "책 설명을 입력해주세요."),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface EditBookFormProps {
  book: BookFormValues;
}

export default function EditBookForm({ book }: EditBookFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: book,
  });

  const onSubmit = async (data: BookFormValues) => {
    setErrorMessage("");

    const response = await fetch(`/api/books/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const result = await response.json();
      setErrorMessage(result.message || "책 수정 중 오류 발생");
      return;
    }

    alert("책 정보가 수정되었습니다!");
    router.refresh();
    router.push("/books");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-4 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">책 수정</h2>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <div>
        <Label htmlFor="title">책 제목</Label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="author">저자</Label>
        <Input id="author" {...register("author")} />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="price">가격</Label>
        <Input type="number" id="price" {...register("price")} />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="stock">재고</Label>
        <Input type="number" id="stock" {...register("stock")} />
        {errors.stock && (
          <p className="text-red-500 text-sm">{errors.stock.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">책 설명</Label>
        <Textarea id="description" {...register("description")} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "수정 중..." : "수정 완료"}
      </Button>
    </form>
  );
}
