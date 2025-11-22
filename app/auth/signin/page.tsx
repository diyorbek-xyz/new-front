'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import z from 'zod';
import Link from 'next/link';
import Logo from '@components/icon/logo';
import { Step, StepNextButton, StepProgress, Steps } from '@components/ui/stepper';

const formSchema = z.object({
	first_name: z.string({ error: 'Enter your first name' }),
	last_name: z.string({ error: 'Enter your last name' }),
	username: z.string({ error: 'Enter username' }).min(4).max(20),
	password: z.string({ error: 'Enter password' }).min(8).max(20),
});

export default function Signin() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: '',
			last_name: '',
			username: '',
			password: '',
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		await fetch('http://localhost:3000/api/auth/signin', { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then((res) => console.log(res));
	}

	return (
		<main className='bg-secondary flex items-center justify-center sm:min-h-screen'>
			<section className='bg-background grid h-full w-full gap-10 p-4 sm:min-h-90 sm:max-w-3xl sm:grid-cols-2 sm:rounded-4xl sm:p-8'>
				<div>
					<Logo className='mb-5' size={70} />
					<h2>Login</h2>
					<p>with your Google Account. This account will be available to other Google apps in the browser.</p>
				</div>
				<form className='self-end' id='login' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className='gap-5 *:gap-1'>
						<Steps max={2} current={1}>
							<StepProgress />
							<Step step={1}>
								<Controller
									name='first_name'
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor='first_name'>Enter your first name</FieldLabel>
											<Input {...field} id='first_name' aria-invalid={fieldState.invalid} />
											<FieldError block={false} errors={[fieldState.error]} />
										</Field>
									)}
								/>
								<Controller
									name='last_name'
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor='last_name'>Enter your last name</FieldLabel>
											<Input {...field} id='last_name' aria-invalid={fieldState.invalid} />
											<FieldError block={false} errors={[fieldState.error]} />
										</Field>
									)}
								/>
							</Step>
							<Step step={2}>
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
							</Step>
							<Field className='justify-end gap-5!' orientation='horizontal'>
								<Link href='/auth/signin'>Create Account</Link>
								<StepNextButton type='submit' form='login'>
									Log in
								</StepNextButton>
							</Field>
						</Steps>
					</FieldGroup>
				</form>
			</section>
		</main>
	);
}
