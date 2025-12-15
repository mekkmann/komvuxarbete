export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const start = performance.now();

  const users = await prisma.user.findMany();

  const end = performance.now();

  return NextResponse.json({
    count: users.length,
    timeMs: Math.round(end - start),
  });
}



