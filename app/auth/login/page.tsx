'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import Logo from '@components/icon/logo';
import Link from 'next/link';

const formSchema = z.object({
	username: z.string({ error: 'Enter username' }).min(4, { error: 'Username must be at least 4 characters' }).max(20, { error: 'Username must be at most 20 characters' }),
	password: z.string({ error: 'Enter password' }).min(8, { error: 'Password must be at least 8 characters' }).max(20, { error: 'Password must be at most 20 characters' }),
});

export default function Login() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		await fetch('http://localhost:3000/api/auth/login', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then((res) => console.log(res));
	}

	return (
		<main className='bg-secondary flex sm:min-h-screen items-center justify-center'>
			<section className='bg-background grid h-full w-full gap-10 p-4 sm:min-h-90 sm:max-w-3xl sm:grid-cols-2 sm:rounded-4xl sm:p-8'>
				<div>
					<Logo className='mb-5' size={70} />
					<h2>Login</h2>
					<p>with your Google Account. This account will be available to other Google apps in the browser.</p>
				</div>
				<form className='self-end' id='login' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className='gap-5 *:gap-1'>
						<Controller
							name='username'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='username'>Enter username</FieldLabel>
									<Input {...field} id='username' aria-invalid={fieldState.invalid} />
									<FieldError block={false} errors={[fieldState.error]} />
								</Field>
							)}
						/>
						<Controller
							name='password'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='password'>Enter password</FieldLabel>
									<Input {...field} id='password' aria-invalid={fieldState.invalid} />
									<FieldError block={false} errors={[fieldState.error]} />
								</Field>
							)}
						/>
						<Field className='justify-end gap-5!' orientation='horizontal'>
							<Link href='/auth/signin'>Create Account</Link>
							<Button type='submit' form='login'>
								Log in
							</Button>
						</Field>
					</FieldGroup>
				</form>
			</section>
		</main>
	);
}
