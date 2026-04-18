import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const posts = await News.find({ published: true }).sort({ createdAt: -1 }).limit(limit).lean();
    return NextResponse.json({ posts });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    // Auto-generate slug
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const post = await News.create({ ...body, slug });
    return NextResponse.json({ post }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
