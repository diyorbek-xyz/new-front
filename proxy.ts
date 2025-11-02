import { NextRequest, NextResponse } from 'next/server';
import authMiddleware from '@middlewares/auth';

export function proxy(req: NextRequest) {
	const authResult = authMiddleware(req);
	if (!authResult.ok) {
		return NextResponse.redirect(new URL('/login', req.url));
	}
	return NextResponse.next();
}
export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
