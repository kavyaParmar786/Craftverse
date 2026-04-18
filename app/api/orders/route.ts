import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { requireAuth, requireAdmin } from "@/lib/auth";

// GET all orders (admin) or user's orders
export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();

    const query = auth.role === "admin" ? {} : { user: auth.id };
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate("items.product", "name image price")
      .populate("user", "name email")
      .lean();

    return NextResponse.json({ orders });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST /api/orders — place order
export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (!auth) return NextResponse.json({ error: "Login required" }, { status: 401 });
    await connectDB();

    const { items, shippingAddress } = await req.json();
    if (!items?.length) return NextResponse.json({ error: "Cart is empty" }, { status: 400 });

    const totalAmount = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: auth.id,
      items,
      totalAmount,
      shippingAddress,
      status: "pending",
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
