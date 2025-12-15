export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { MongoUser } from "@/models/MongoUser";

export async function POST(req: Request) {
  await connectMongo();

  const { count } = await req.json();
  const n = Number(count) || 10;

  const users = Array.from({ length: n }, (_, i) => ({
    name: `User${i}`,
    email: `user${i}@mail.com`,
    age: 18 + (i % 50),
  }));
  
  const start = performance.now();
  await MongoUser.insertMany(users);
  const end = performance.now();
  return NextResponse.json({ inserted: n , timeMs: Math.round(end - start),});
}

