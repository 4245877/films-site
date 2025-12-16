import { NextResponse } from "next/server";

// Вот эта строка решает проблему для output: 'export'
export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(
    { message: "Reindex endpoint not implemented yet" }, 
    { status: 501 }
  );
}