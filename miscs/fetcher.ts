import { cookieHeader } from './getCookies';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const fetchUrl = (url: string) => new URL(url, baseUrl);
export const fetchFile = (url?: string) => {
	if (!url) return;
	return new URL(url, baseUrl).toString();
};

export const fetcher = {
	get: async (url: string | URL, options?: RequestInit) => {
		const res = await fetch(url, {
			method: 'GET',
			credentials: 'include',
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
				cookies: await cookieHeader(),
			},
			...options,
		});

		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
		return { data: await res.json() };
	},
	post: async (url: string | URL, body: BodyInit, options?: RequestInit) => {
		let res: any;
		if (body instanceof FormData) {
			res = await fetch(url, {
				method: 'POST',
				body: body,
				credentials: 'include',
				headers: { cookies: await cookieHeader() },
				...options,
			});
		} else {
			res = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(body),
				credentials: 'include',
				headers: { cookies: await cookieHeader() },
				...options,
			});
		}

		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
		return { data: await res.json() };
	},
	put: async (url: string | URL, body: BodyInit, options?: RequestInit) => {
		let res: any;
		if (body instanceof FormData) {
			res = await fetch(url, {
				method: 'PUT',
				body: body,
				credentials: 'include',
				headers: { cookies: await cookieHeader() },
				...options,
			});
		} else {
			res = await fetch(url, {
				method: 'PUT',
				body: JSON.stringify(body),
				credentials: 'include',
				headers: { cookies: await cookieHeader() },
				...options,
			});
		}

		if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
		return { data: await res.json() };
	},
};
