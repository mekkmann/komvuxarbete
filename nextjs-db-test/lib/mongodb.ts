import mongoose from "mongoose";

let isConnected = false;

export async function connectMongo() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URL!);
  isConnected = true;
}
