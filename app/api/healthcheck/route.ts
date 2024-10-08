import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(JSON.stringify({ message: "Healthcheck passed." }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
