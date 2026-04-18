import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    const exists = await User.findOne({ email });
    if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    const user = await User.create({ name, email, password });
    const token = signToken({ id: user._id.toString(), email: user.email, role: user.role });
    return NextResponse.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }, token });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
