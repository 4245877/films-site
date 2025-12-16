// apps/web/src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Login endpoint not implemented yet" }, { status: 501 });
}