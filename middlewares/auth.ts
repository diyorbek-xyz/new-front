import { NextRequest, NextResponse } from 'next/server';

export default function authMiddleware(req: NextRequest) {
	const token = req.cookies.get('token')?.value;
	
	const loginUrl = new URL('/login', req.url);

	if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/public')) {
		return NextResponse.next();
	}
	if (!token) {
		return NextResponse.redirect(loginUrl);
	}
	return NextResponse.next();
}

