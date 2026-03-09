import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login');
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    // If trying to access admin route without a token
    if (isAdminRoute && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If logged in and trying to access login page
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin/:path*', '/login'],
}
