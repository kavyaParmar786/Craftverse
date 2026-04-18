import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";
import { requireAdmin } from "@/lib/auth";

export async function GET(_: NextRequest, { params }: { params: { slug: string } }) {
  try {
    await connectDB();
    const post = await News.findOne({ slug: params.slug }).lean();
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { slug: string } }) {
  const admin = requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    await News.findOneAndDelete({ slug: params.slug });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
