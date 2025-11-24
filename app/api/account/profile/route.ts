import { NextRequest, NextResponse } from 'next/server';
import { AccountModel } from '@lib/models/account';
import connectDB from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Chalk from 'chalk';

const SECRET = process.env.SECRET ?? '5588';
export async function GET(request: NextRequest) {
	try {
		await connectDB();
		const { searchParams } = new URL(request.url);
		let data;
		const token = request.cookies.get('token')?.value ?? (await cookies()).get('token')?.value;
		console.log('TOKEN', Chalk.blue(request.cookies.get('token')));

		const profile = token ? (jwt.verify(token, SECRET) as { _id?: string; id?: string; username: string }) : undefined;

		const id = searchParams.get('id') ?? profile?.id ?? profile?._id;
		const username = searchParams.get('username') ?? profile?.username;

		if (id || username) {
			data = await AccountModel.findOne({ _id: id, username }).select('-password -_id -__v').lean();
		} else {
			data = await AccountModel.find().lean();
		}

		return NextResponse.json({ message: 'Account found', data: data });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: 'Failed to fetch account', error }, { status: 500 });
	}
}

export async function POST(request: NextRequest) {
	try {
		await connectDB();
		const body = await request.json();
		const result = await AccountModel.insertOne(body);
		return NextResponse.json({ success: true, insertedId: result.insertedId });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
	}
}
