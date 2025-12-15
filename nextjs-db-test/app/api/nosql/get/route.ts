export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { MongoUser } from "@/models/MongoUser";

export async function GET() {
  await connectMongo();

  const start = performance.now();

  const users = await MongoUser.find();

  const end = performance.now();

  return NextResponse.json({
    count: users.length,
    timeMs: Math.round(end - start),
  });
}


