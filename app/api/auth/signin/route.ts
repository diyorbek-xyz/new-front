import { AccountModel } from '@lib/models/account';
import connectDB from '@lib/mongodb';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
	try {
		if (!process.env.SECRET) throw Error(`There is no SECRET key`, { cause: process.env.SECRET });
		await connectDB();
		const body = await request.json();
		const exist = await AccountModel.findOne({ username: body.username });
		if (exist) throw Error('This username already taken', { cause: body.username });
		const password = await bcrypt.hash(body.password, 10);
		const account = await AccountModel.create({ password, ...body });
		const token = jwt.sign({ _id: account._id, first_name: account.first_name, username: account.username, password }, process.env.SECRET, { expiresIn: '4h' });
		(await cookies()).set('token', token);
		return NextResponse.json({ message: 'Successfully created', token: token }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 200 });
	}
}
