import { cookies } from "next/headers";

export const cookieHeader = (await cookies())
	.getAll()
	.map((c) => `${c.name}=${c.value}`)
	.join('; ');
