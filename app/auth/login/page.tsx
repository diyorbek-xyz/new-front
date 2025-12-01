'use client';

import { Button } from '@components/ui/button';
import Logo from '@components/icon/logo';
import Link from 'next/link';
import Input from '@components/interactive/input';

export default function Login() {
	return (
		<main className='bg-secondary flex items-center justify-center sm:min-h-screen'>
			<section className='bg-background grid h-full w-full gap-10 p-4 sm:min-h-90 sm:max-w-3xl sm:grid-cols-2 sm:rounded-4xl sm:p-8'>
				<div>
					<Logo className='mb-5' size={70} />
					<h2>Login</h2>
					<p>with your Google Account. This account will be available to other Google apps in the browser.</p>
				</div>
				<form className='self-end' id='login'>
					<div>
						<label htmlFor='username'>Enter username</label>
						<Input id='username' />
					</div>
					<div>
						<label htmlFor='password'>Enter password</label>
						<Input id='password' />
					</div>
					<div className='justify-end gap-5!'>
						<Link href='/auth/signin'>Create Account</Link>
						<Button type='submit' form='login'>
							Log in
						</Button>
					</div>
				</form>
			</section>
		</main>
	);
}
