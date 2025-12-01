import { fetcher, fetchUrl } from './fetcher';

export const fetchAccount = {
	get: async (options?: RequestInit) => fetcher.get(fetchUrl('/account'), options),
	put: async (body: any, options?: RequestInit) => fetcher.put(fetchUrl('/account'), body, options),
};
export const fetchAuth = {
	checkUsername: async (body: any, options?: RequestInit) => fetcher.post(fetchUrl('/auth/check/username'), body, options),
	login: async (body: any, options?: RequestInit) => fetcher.post(fetchUrl('/auth/login'), body, options),
	signin: async (body: any, options?: RequestInit) => fetcher.post(fetchUrl('/auth/signup'), body, options),
};
