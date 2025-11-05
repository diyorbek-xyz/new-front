import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'JustWatch | Login',
	description: 'Login to use all features',
};

export default function Login() {
	return (
		<article>
			<form action='http://localhost:3000/api/users' method='post'>
				<input type="text" name="username" id="username" placeholder='Enter username' />
				<input type="text" name="password" id="password" placeholder='Enter password' />
				<input type="submit" />
			</form>
		</article>
	);
}
