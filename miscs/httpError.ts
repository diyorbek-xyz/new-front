import { NextResponse } from 'next/server';

class HttpError extends Error {
	status: number;
	constructor(status: number, message: string) {
		super(message);
		this.status = status;
	}
}
function throwError(error: unknown) {
	if (error instanceof HttpError) {
		console.error(error);
		return NextResponse.json({ error }, { status: error.status, statusText: error.message });
	} else {
		console.error(error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
export { HttpError, throwError };
