import { AccountModel } from '@lib/models/account';
import connectDB from '@lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { HttpError, throwError } from '@/miscs/httpError';

const SECRET = process.env.SECRET ?? '5588';
export async function POST(request: NextRequest) {
	try {
		if (!process.env.SECRET) throw new HttpError(500, 'There is no SECRET key');
		await connectDB();
		const body = await request.json();
		console.log(body);

		const account = await AccountModel.findOne({ username: body.username }).select('_id firstname username password');

		if (!account) throw new HttpError(404, `User ${body.username} not found`);

		console.log('COMPARE');
		const match = await bcrypt.compare(body.password, account.password);
		console.log('END');

		console.log('CHECK');
		if (!match) throw new HttpError(403, 'Wrong Pasword');
		console.log('END');

		console.log('SIGN');
		const token = jwt.sign({ id: account._id, firstname: account.firstname, username: account.username }, SECRET);
		console.log('END');

		console.log('COOKIE');
		(await cookies()).set('token', token);
		console.log('END');

		console.log('RESPONSE');
		return NextResponse.json({ message: 'Successfully logged in', data: { token } });
	} catch (error) {
		return throwError(error);
	}
}
