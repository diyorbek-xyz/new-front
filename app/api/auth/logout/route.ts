import connectDB from '@lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { throwError } from '@/miscs/httpError';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
	try {
		await connectDB();
		request.cookies.delete('token');
		(await cookies()).delete('token');
		return NextResponse.json({ message: 'Successfully logged out', status: 200 });
	} catch (error) {
		return throwError(error);
	}
}
