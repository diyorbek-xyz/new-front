import { AccountModel } from '@lib/models/account';
import connectDB from '@lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

class HttpError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}

export async function POST(request: NextRequest) {
	try {
		if (!process.env.SECRET) throw new HttpError(500, 'There is no SECRET key');
		await connectDB();
		const body = await request.json();
		console.log(body);

		const account = await AccountModel.findOne({ username: body.username }).select('_id first_name username password');
		console.log(account);

		if (!account) throw new HttpError(404, `User ${body.username} not found`);

		const match = await bcrypt.compare(body.password, account.password);
		if (!match) throw new HttpError(403, 'Wrong Pasword');

		const token = jwt.sign(account, process.env.SECRET, { expiresIn: '4h' });
		(await cookies()).set('token', token);
		console.log({ message: 'Successfully logged in', data: { token } });

		return NextResponse.json({ message: 'Successfully logged in', data: { token } }, { status: 200 });
	} catch (error) {
		if (error instanceof HttpError) {
			console.error(error);
			return NextResponse.json({ error }, { status: error.status, statusText: error.message });
		}
	}
}
