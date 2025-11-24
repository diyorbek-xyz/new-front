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
		if (!process.env.SECRET) throw new HttpError(500, `There is no SECRET key`);
		await connectDB();
		const body = await request.json();
		const exist = await AccountModel.findOne({ username: body.username });

		if (exist) throw new HttpError(403, 'This username already taken');

		const password = await bcrypt.hash(body.password, 10);
		const account = await AccountModel.create({ ...body, password });
		const token = jwt.sign({ id: account._id, firstname: account.firstname, username: account.username, password }, SECRET, { expiresIn: '4h' });

		(await cookies()).set('token', token);
		return NextResponse.json({ message: 'Successfully created', token: token }, { status: 201 });
	} catch (error) {
		console.error(error);
		throwError(error);
	}
}
