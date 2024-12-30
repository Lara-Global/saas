import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';


export async function middleware(req: NextRequest) {
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store');

    const { pathname } = req.nextUrl;
    console.log('Middleware hit on path:', pathname);
    const token = req.cookies.get('token1')?.value || '';

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    try {
        const secret = process.env.ACCES_TOKEN;
        if (!secret) {
            throw new Error('JWT secret not found');
        }

        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(token, encoder.encode(secret));

        if (pathname.startsWith('/admin') && payload.role !== 'Admin') {
            return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
        }

        if (pathname.startsWith('/employee') && payload.role !== 'Employee') {
            return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
        }
        if (pathname.startsWith('/manager') && payload.role !== 'Manager') {
            return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
        }
        if (pathname.startsWith('/super') && payload.role !== 'SuperAdmin') {
            return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
        }


        return response;
    } catch (error) {
        console.error('Token verification failed:', error);
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

export const config = {
    matcher: ['/super/:path*', '/admin/:path*', '/pricing/:path*', '/manager/:path*', '/employee/:path*',  '/api/:path*'],
};
