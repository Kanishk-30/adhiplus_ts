import type { NextRequest } from "next/server"
import { SignJWT, jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-this-in-production")

export interface AdminUser {
  id: string
  username: string
  role: "admin"
}

// Simple admin credentials - in production, use proper user management
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  password: process.env.ADMIN_PASSWORD || "admin123",
}

export async function signToken(payload: AdminUser) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)
}

export async function verifyToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as AdminUser
  } catch (error) {
    return null
  }
}

export async function authenticate(username: string, password: string): Promise<AdminUser | null> {
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    return {
      id: "1",
      username: username,
      role: "admin",
    }
  }
  return null
}

export async function getAuthUser(request: NextRequest): Promise<AdminUser | null> {
  const token = request.cookies.get("admin-token")?.value
  if (!token) return null

  return await verifyToken(token)
}
