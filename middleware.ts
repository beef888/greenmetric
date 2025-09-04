import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For now, we'll handle auth protection on the client side
  // since we're using localStorage for authentication
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}