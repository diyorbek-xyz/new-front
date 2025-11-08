import { NextResponse } from 'next/server';
import { AccountModel } from '@lib/models/account';
import connectDB from '@/lib/mongodb';

export async function GET() {
	try {
		await connectDB();
		const users = await AccountModel.find({});
		return NextResponse.json(users);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}
}

export async function POST(request: Request) {
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
