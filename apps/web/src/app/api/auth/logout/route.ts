import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Logout endpoint not implemented yet" }, { status: 501 });
}