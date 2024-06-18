import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export interface AuthToken {
    first_name: string
    last_name: string
    email: string
    role: string
    iat: number
    exp: number
}

// This function can be marked async if using await inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const public_path = path === '/login' || path === '/registration' || path === '/' || path === '/products' || path === '/flashsale' || path === '/aboutus' || path === '/contactus';
    const admin_path = path === '/dashboard/admin' || path === '/dashboard/admin/products/add-products' || path === '/dashboard/admin/products' || path === '/dashboard/admin/all-users';
    const user_path = path === '/dashboard/user/my-orders';
    const token = request.cookies.get('accessCookieToken')?.value || '';
    if (token) {
        const decodedToken = jwtDecode(token) as AuthToken;
        const role = decodedToken?.role;
        if(!role && !public_path && admin_path) { // user & in Private area
            return NextResponse.redirect(new URL('/dashboard/user', request.url))
        }else if(role && user_path) {
            return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        }
        return NextResponse.next();
    } else {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/login',
        '/registration',
        '/products',
        '/flashsale',
        '/contactus',
        '/aboutus',
        '/dashboard/user',
        '/dashboard/admin',
        '/dashboard/admin/products/add-products',
        '/dashboard/admin/products',
        '/dashboard/admin/all-users',
        '/dashboard/user/my-orders'
    ]
}