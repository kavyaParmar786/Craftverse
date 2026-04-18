import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const order = await Order.findById(params.id)
      .populate("items.product", "name image price")
      .populate("user", "name email")
      .lean();
    if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { status } = await req.json();
    const order = await Order.findByIdAndUpdate(params.id, { status }, { new: true }).lean();
    return NextResponse.json({ order });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
