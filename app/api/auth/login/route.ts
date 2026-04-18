import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const valid = await user.comparePassword(password);
    if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const token = signToken({ id: user._id.toString(), email: user.email, role: user.role });
    return NextResponse.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }, token });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
