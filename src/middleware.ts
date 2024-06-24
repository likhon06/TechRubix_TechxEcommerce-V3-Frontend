import {jwtDecode} from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export interface AuthToken {
    first_name: string;
    last_name: string;
    email: string;
    role?: string; // Optional since only admin has role
    iat: number;
    exp: number;
}

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const publicPaths = [
        '/login',
        '/registration',
        '/',
        '/products',
        '/flashsale',
        '/aboutus',
        '/contactus'
    ];

    const adminPaths = [
        '/dashboard/admin',
        '/dashboard/admin/products/add-products',
        '/dashboard/admin/products',
        '/dashboard/admin/all-users'
    ];

    const userPaths = [
        '/dashboard/user',
        '/dashboard/user/my-orders'
    ];

    const isPublicPath = publicPaths.includes(path);
    const isAdminPath = adminPaths.includes(path);
    const isUserPath = userPaths.includes(path);

    const token = request.cookies.get('accessCookieToken')?.value || '';

    if (token) {
        try {
            const decodedToken = jwtDecode(token) as AuthToken;
            const role = decodedToken?.role;

            if (role === 'admin') {
                if (isUserPath) {
                    return NextResponse.redirect(new URL('/dashboard/admin', request.url));
                }
            }else if(role === 'user') {
                if (isAdminPath) {
                    return NextResponse.redirect(new URL('/dashboard/user', request.url));
                }
            }
        } catch (error) {
            // Handle invalid token by redirecting to login
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else {
        if (!isPublicPath) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

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
};
