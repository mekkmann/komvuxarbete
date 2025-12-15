export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { MongoUser } from "@/models/MongoUser";

export async function DELETE() {
  await connectMongo();
  const result = await MongoUser.deleteMany();

  return NextResponse.json({
    deleted: result.deletedCount,
  });
}

