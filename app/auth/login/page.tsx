'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';

const formSchema = z.object({
	username: z.string({ error: 'Enter username' }).min(4).max(20),
	password: z.string({ error: 'Enter password' }).min(4).max(20),
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
		<Card className='w-full sm:max-w-md'>
			<CardHeader>
				<CardTitle>Login</CardTitle>
			</CardHeader>
			<CardContent>
				<form id='login' onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name='username'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor='username'>Enter username</FieldLabel>
									<Input {...field} id='username' aria-invalid={fieldState.invalid} />
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter>
				<Field orientation='horizontal'>
					<Button type='button' variant='outline' onClick={() => form.reset()}>
						Reset
					</Button>
					<Button type='submit' form='login'>
						Submit
					</Button>
				</Field>
			</CardFooter>
		</Card>
	);
}
