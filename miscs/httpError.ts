import { NextResponse } from 'next/server';

class HttpError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}
function throwError(error: unknown) {
	console.error(error);

	if (error instanceof HttpError) {
		return NextResponse.json({ message: error.message, error: true }, { status: error.status });
	}
	return NextResponse.json({ message: String(error), error: true }, { status: 500 });
}
export { HttpError, throwError };
