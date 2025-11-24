import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
export async function proxy(req: NextRequest) {
	const token = (await cookies()).get('token')?.value;

	const { pathname } = req.nextUrl;

	if (!token) {
		if (pathname.startsWith('/auth/') || pathname.startsWith('/public') || pathname.startsWith('/api/')) {
			return NextResponse.next();
		}
		return NextResponse.redirect(new URL('/auth/login', req.url));
	}
	if (pathname.startsWith('/auth/')) {
		return NextResponse.redirect(new URL('/', req.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
