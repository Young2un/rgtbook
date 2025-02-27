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
  image: z.instanceof(FileList).refine((fileList) => fileList.length > 0, {
    message: "이미지를 업로드해주세요.",
  }),
});

type BookFormValues = z.infer<typeof bookSchema>;

export default function CreateBookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data: BookFormValues) => {
    setErrorMessage("");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    if (data.description) formData.append("description", data.description);
    if (data.image?.length) formData.append("image", data.image[0]); // 이미지 파일 추가

    const response = await fetch("/api/books", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      setErrorMessage(result.message || "책 추가 중 오류 발생");
      return;
    }

    alert("책이 성공적으로 추가되었습니다!");
    reset();
    router.refresh();
    router.push("/books");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-4 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">새 책 추가</h2>

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

      <div>
        <Label htmlFor="image">책 표지 업로드</Label>
        <Input
          className="md:text-sm"
          type="file"
          id="image"
          accept="image/jpeg, image/png, image/gif, image/webp"
          {...register("image", { required: "이미지를 업로드해주세요." })}
        />

        {errors.image && (
          <p className="text-red-500 text-sm ">{errors.image.message}</p>
        )}
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "등록 중..." : "저장하기"}
      </Button>
    </form>
  );
}
