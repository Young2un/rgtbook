import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

// 책 목록 조회
export async function GET(req: Request) {
  const supabase = createClient();
  const { search, page } = Object.fromEntries(new URL(req.url).searchParams);

  const PAGE_SIZE = 10;
  const pageNumber = parseInt(page) || 1;
  const start = (pageNumber - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  let query = supabase
    .from("books")
    .select("*", { count: "exact" })
    .range(start, end)
    .order("title");

  if (search) {
    query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%`);
  }

  const { data: books, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return NextResponse.json(
    { books, total: count, totalPages },
    { status: 200 }
  );
}
// 책 추가
export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const price = parseFloat(formData.get("price") as string);
    const stock = parseInt(formData.get("stock") as string, 10);
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = null;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${randomUUID()}.${fileExt}`;
      const filePath = `book_bucket/${fileName}`;

      const { data, error } = await supabase.storage
        .from("book_bucket")
        .upload(filePath, imageFile, { cacheControl: "3600", upsert: false });

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from("book_bucket")
        .getPublicUrl(filePath);

      imageUrl = publicUrl.publicUrl;
    }

    const { error: dbError } = await supabase.from("books").insert([
      {
        title,
        author,
        price,
        stock,
        sales_count: 0,
        description,
        image_url: imageUrl,
      },
    ]);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, imageUrl }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
