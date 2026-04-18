import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CustomRequest from "@/models/CustomRequest";
import { requireAdmin } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    const request = await CustomRequest.findByIdAndUpdate(params.id, body, { new: true }).lean();
    return NextResponse.json({ request });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
