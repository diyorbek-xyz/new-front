'use server';
import { cookies } from 'next/headers';

export const cookieHeader = async () => {
	return (await cookies())
		.getAll()
		.map((c) => `${c.name}=${c.value}`)
		.join('; ');
};
