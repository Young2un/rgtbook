import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const bookId = params.id;
  const body = await req.json();
  const supabase = createClient();

  const { error } = await supabase.from("books").update(body).eq("id", bookId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "책 정보 수정 완료" });
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();

  if (!params.id) {
    return NextResponse.json(
      { error: "ID가 제공되지 않았습니다." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("books").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "삭제 성공!" });
}
