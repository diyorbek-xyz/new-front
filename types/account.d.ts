interface LoginType {
	username: string;
	password: string;
}

interface SigninType {
	first_name: string;
	last_name: string;
	username: string;
	password: string;
	role: 'user' | 'admin';
}
interface AccountType {
	avatar?: string;
	avatar_effect?: { src: string };
	decoration?: { src: string };
	banner?: string;
	accent?: string;
	firstname: string;
	lastname: string;
	username: string;
	role: 'user' | 'admin';
	[key: string]: any;
}
export type { LoginType, SigninType, AccountType };
