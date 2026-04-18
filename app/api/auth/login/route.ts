import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { signToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
 
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();
 
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
 
    // Use .lean(false) to get a full Mongoose doc, but compare manually
    const user = await User.findOne({ email: email.toLowerCase().trim() });
 
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
 
    // Use bcrypt.compare directly — more reliable than the instance method
    const valid = await bcrypt.compare(password, user.password as string);
 
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
 
    const token = signToken({
      id: user._id.toString(),
      email: user.email as string,
      role: user.role as string,
    });
 
    return NextResponse.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
 
