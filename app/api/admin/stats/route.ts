import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";
import CustomRequest from "@/models/CustomRequest";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    const [totalProducts, totalOrders, totalUsers, totalRequests, orders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      CustomRequest.countDocuments(),
      Order.find().select("totalAmount status createdAt").lean(),
    ]);

    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.totalAmount, 0);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .lean();

    return NextResponse.json({
      stats: { totalProducts, totalOrders, totalUsers, totalRequests, totalRevenue },
      recentOrders,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
