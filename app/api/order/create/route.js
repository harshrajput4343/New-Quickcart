import connectDB from "@/config/db";
import Order from "@/models/Order";
import Address from "@/models/Address";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { addressId, items, amount } = await request.json();

    await connectDB();

    // Validate address belongs to user
    const address = await Address.findOne({ _id: addressId, userId });
    if (!address) return NextResponse.json({ success: false, message: "Address not found" }, { status: 404 });

    // Create order with address snapshot
    const order = await Order.create({
      userId,
      address: {
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        pincode: address.pincode,
        area: address.area,
        city: address.city,
        state: address.state
      },
      items,
      amount,
      paymentStatus: 'paid',  // COD — mark paid immediately; swap for 'pending' if adding Stripe later
      status: 'Order Placed',
      date: Date.now()
    });

    // Clear user cart
    await User.findByIdAndUpdate(userId, { cartItems: {} });

    return NextResponse.json({ success: true, message: "Order placed successfully", orderId: order._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
