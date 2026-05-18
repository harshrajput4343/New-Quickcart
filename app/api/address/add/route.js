import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { fullName, phoneNumber, pincode, area, city, state } = await request.json();

    await connectDB();
    const address = await Address.create({ userId, fullName, phoneNumber, pincode, area, city, state });

    return NextResponse.json({ success: true, message: "Address saved", address }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
