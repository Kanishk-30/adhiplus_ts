import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getAuthUser } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
