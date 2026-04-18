import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CustomRequest from "@/models/CustomRequest";
import { requireAuth, requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const admin = requireAdmin(req);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const requests = await CustomRequest.find().sort({ createdAt: -1 }).populate("user", "name email").lean();
    return NextResponse.json({ requests });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (!auth) return NextResponse.json({ error: "Login required" }, { status: 401 });
    await connectDB();
    const body = await req.json();
    const request = await CustomRequest.create({ ...body, user: auth.id });
    return NextResponse.json({ request }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
