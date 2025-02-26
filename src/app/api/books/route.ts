import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

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
    .range(start, end);

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

export async function POST() {}
