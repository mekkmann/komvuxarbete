export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { count } = await req.json();
  const n = Number(count) || 10;

  const users = Array.from({ length: n }, (_, i) => ({
    name: `User${i}`,
    email: `user${i}@mail.com`,
    age: 18 + (i % 50),
  }));
  
  const start = performance.now();
  await prisma.user.createMany({ data: users });
  const end = performance.now();
  return NextResponse.json({ inserted: n , timeMs: Math.round(end - start),});
}

