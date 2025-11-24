'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/ui/field';
import { Input } from '@components/ui/input';
import z from 'zod';
import Link from 'next/link';
import Logo from '@components/icon/logo';
import { useState } from 'react';
import { Button } from '@components/ui/button';
import { useRouter } from 'next/navigation';
import { getBaseUrl } from '@/miscs/getBaseUrl';
import { Steps, Step, StepActions, StepProgress } from '@components/ui/stepper';

const fullSchema = z.object({
	firstname: z.string().nonempty('Enter your first name').min(4).max(20),
	lastname: z.string().nonempty('Enter your last name'),
	username: z.string().nonempty('Enter username').min(4).max(20),
	password: z.string().nonempty('Enter password').min(8).max(20),
});

type FormType = z.infer<typeof fullSchema>;

const stepFields: Record<number, (keyof FormType)[]> = {
	1: ['firstname', 'lastname'],
	2: ['username'],
	3: ['password'],
};

export default function Signin() {
	const router = useRouter();
	const [error, setError] = useState<{ message: string }>();
	const [currentStep, setCurrentStep] = useState<number>(1);
	const form = useForm<FormType>({
		resolver: zodResolver(fullSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
			username: '',
			password: '',
		},
		mode: 'onChange',
	});

	async function onStepChange(value: number, back?: boolean) {
		if (back) setCurrentStep(Math.min(Math.max(value, 1), 3));
		const ok = await form.trigger(stepFields[currentStep]);
		console.log(ok);
		if (ok) {
			setCurrentStep(Math.min(Math.max(value, 1), 3));
		}
	}
	async function checkUsername() {
		if (Number(form.getValues('username')) < 4) return;
		const res = await fetch('http://localhost:3000/api/auth/check/username', { method: 'POST', body: JSON.stringify({ username: form.getValues('username') }), headers: { 'Content-Type': 'application/json' } });
		const data = await res.json().then((res) => res);
		console.log(data);

		if (!data.available) form.setError('username', { message: data.message });
		return data.available;
	}

	async function onSubmit(data: FormType) {
		console.log('SUBMITTED:', data);

		const res = await fetch(`${getBaseUrl()}/api/auth/signin`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		}).then((res) => res.json());

		if (res.error) {
			setError(res);
		} else {
			router.push('/');
			window.location.reload();
		}
	}

	return (
		<main className='bg-secondary flex items-center justify-center sm:min-h-screen'>
			<section className='bg-background md:max-h-xl grid h-full w-full items-start gap-4 p-4 sm:min-h-80 sm:max-w-3xl sm:grid-cols-2 sm:rounded-4xl sm:p-8 md:min-h-80 md:max-w-3xl lg:min-h-125 lg:max-w-4xl'>
				<Steps current={currentStep} max={3} onStepChange={(v, b) => onStepChange(v, b)}>
					<Logo size={70} />
					<StepProgress />
					<div className='min-h-90'>
						<h2>Create new Account</h2>
						<p>with your Google Account. This account will be available to other Google apps in the browser.</p>
					</div>

					<form id='signin' onSubmit={form.handleSubmit(onSubmit)} className='h-full min-h-90 self-end *:h-full *:gap-10'>
						<FieldGroup>
							<Step step={1} className='grid gap-5'>
								<Controller
									name='firstname'
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor='firstname'>Enter your first name</FieldLabel>
											<Input {...field} aria-invalid={fieldState.invalid} id='firstname' autoComplete='given-name' />
											<FieldError block={false} errors={[fieldState.error]} />
										</Field>
									)}
								/>
								<Controller
									name='lastname'
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor='lastname'>Enter your last name</FieldLabel>
											<Input {...field} aria-invalid={fieldState.invalid} id='lastname' autoComplete='family-name' />
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
											<Input {...field} aria-invalid={fieldState.invalid} id='username' />
											<FieldError block={false} errors={[fieldState.error]} />
										</Field>
									)}
								/>
							</Step>
							<Step step={3}>
								<Controller
									name='password'
									control={form.control}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<FieldLabel htmlFor='password'>Enter password</FieldLabel>
											<Input {...field} aria-invalid={fieldState.invalid} id='password' />
											<FieldError block={false} errors={[fieldState.error]} />
										</Field>
									)}
								/>
								<FieldError block={false} errors={[error]} />
							</Step>
							<div className='mt-auto flex items-center justify-between'>
								<Link href='/auth/login'>Have an account?</Link>
								<StepActions check={currentStep == 2 && checkUsername} form={form} noError={!error}>
									<Button type='submit' form='signin'>
										Sign in
									</Button>
								</StepActions>
							</div>
						</FieldGroup>
					</form>
				</Steps>
			</section>
		</main>
	);
}
