'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Dropbox from '@components/ui/dropbox';

const formSchema = z.object({
	avatar: z.any(),
	banner: z.any(),
	avatar_effect: z.string(),
	decoration: z.string(),
	firstname: z.string().min(4).max(20),
	lastname: z.string().min(4).max(20),
	username: z.string().min(4).max(20),
	password: z.string().min(8).max(20),
});

export default function EditProfileForm() {
	const [error, setError] = useState<{ message: string }>();
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			avatar_effect: '',
			decoration: '',
			firstname: '',
			lastname: '',
			username: '',
			password: '',
		},
	});

	async function onSubmit(body: z.infer<typeof formSchema>) {
		console.log(body);

		// const res = await fetch(`${getBaseUrl()}/api/auth/login`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
		// const data = await res.json();

		// if (data.error) {
		// 	setError(data);
		// } else {
		// 	router.push('/');
		// 	window.location.reload();
		// }
	}

	return (
		<form id='login' onSubmit={form.handleSubmit(onSubmit)}>
			<FieldGroup className='grid grid-cols-2 gap-5 *:gap-1'>
				<Controller
					name='firstname'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='firstname'>Enter first name</FieldLabel>
							<Input {...field} id='firstname' aria-invalid={fieldState.invalid} />
							<FieldError block={false} errors={[fieldState.error]} />
						</Field>
					)}
				/>
				<Controller
					name='lastname'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='lastname'>Enter last name</FieldLabel>
							<Input {...field} id='lastname' aria-invalid={fieldState.invalid} />
							<FieldError block={false} errors={[fieldState.error]} />
						</Field>
					)}
				/>
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
				

				<Controller
					name='avatar'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='avatar'>Change avatar</FieldLabel>
							<Dropbox circularCrop aspect={1} {...field} id='avatar' aria-invalid={fieldState.invalid} />
							<FieldError block={false} errors={[fieldState.error]} />
						</Field>
					)}
				/>
				<Controller
					name='banner'
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor='banner'>Change banner</FieldLabel>
							<Dropbox aspect={3} {...field} id='banner' aria-invalid={fieldState.invalid} />
							<FieldError block={false} errors={[fieldState.error]} />
						</Field>
					)}
				/>
				{error && <FieldError block={false} errors={[error]} />}
				<Field className='col-span-2 justify-end gap-5!' orientation='horizontal'>
					<Button type='submit' form='login'>
						Save changes
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
}
