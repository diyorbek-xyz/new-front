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
	banner?: string;
	first_name: string;
	last_name: string;
	username: string;
	role: 'user' | 'admin';
}
export { LoginType, SigninType, AccountType };
