import AccountModel from '@lib/models';
import connectMongoDB from '@lib/mongodbConnection';

export async function GET() {
	await connectMongoDB();
	const accounts = await AccountModel.find();

	return new Response(JSON.stringify(accounts), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
}

export async function POST(request: Request) {
	await connectMongoDB();
	const body = await request.json();
	const newUser = await AccountModel.create(body);

	return new Response(JSON.stringify(newUser), {
		status: 201,
		headers: { 'Content-Type': 'application/json' },
	});
}
