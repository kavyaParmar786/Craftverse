import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: { id: string; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: string };
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  const cookieToken = req.cookies.get("craft_token")?.value;
  return cookieToken || null;
}

export function requireAuth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

export function requireAdmin(req: NextRequest) {
  const user = requireAuth(req);
  if (!user || user.role !== "admin") return null;
  return user;
}
