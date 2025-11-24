import { AccountModel } from '@lib/models/account';
import connectDB from '@lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { HttpError } from '@/miscs/httpError';

export async function POST(request: NextRequest) {
	try {
		if (!process.env.SECRET) throw new HttpError(500, `There is no SECRET key`);
		await connectDB();
		const body = await request.json();
		const exist = await AccountModel.findOne({ username: body.username });
		if (exist) return Response.json({ message: 'This username is not available', available: false });

		const type = /^[a-zA-Z0-9._]+$/.test(body.username);

        if (!type) return Response.json({ message: 'Username can only contain letters, numbers, dots, and underscores.', available: false });
		return Response.json({ message: 'This username is available', available: true });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: error });
	}
}
