import connectDB from "@/config/db";
import Order from "@/models/Order";
import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);
    if (!isSeller) return NextResponse.json({ success: false, message: "Not authorized" }, { status: 403 });

    await connectDB();
    const orders = await Order.find({}).sort({ date: -1 });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
