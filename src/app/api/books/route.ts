import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// 기본세팅
export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase.from("books").select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data, { status: 200 });
}
export async function POST() {}
