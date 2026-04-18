import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();
    return NextResponse.json({ users });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
