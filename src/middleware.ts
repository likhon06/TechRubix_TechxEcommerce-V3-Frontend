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
  
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const public_path = path === '/login' || path === '/registration' || path === '/' || path === '/products' || path === '/flashsale' || path === '/aboutus' || path === '/contactus';
    const token = request.cookies.get('accessCookieToken')?.value || '';
    if (token) {
        const decodedToken = jwtDecode(token) as AuthToken;
        const Role = decodedToken?.role;
        if(Role !== 'admin' && !public_path) { // admin o na + private route a ase ... tai redirect kore login a dewa holo
            return NextResponse.redirect(new URL('/login', request.url))
        }
        // if(Role === 'admin' && !admin_path) {
        //     return NextResponse.redirect(new URL('/dashboard', request.url))
        // }
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
        '/dashboard',
        '/dashboard/admin/products/add-products',
        '/dashboard/admin/products',
        '/dashboard/admin/all-users',
        '/dashboard/user/my-orders'
    ]
}