'use client';
import React, { createContext } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@lib/utils';
import { Button } from './button';
import { UseFormReturn } from 'react-hook-form';

interface StepperContextType {
	current: number;
	max: number;
	setStep: (step: number, back?: boolean) => void;
}
const stepperContext = createContext<StepperContextType | null>(null);
function useStepContext() {
	const context = React.useContext(stepperContext);
	if (!context) {
		throw new Error('useStep must be used within a StepProvider');
	}
	return context;
}
function Steps({ children, current, max, onStepChange }: { children: React.ReactNode; onStepChange: (value: number, back?: boolean) => void; current: number; max: number }) {
	const value = { current: current, max: max, setStep: onStepChange };
	return <stepperContext.Provider value={value}>{children}</stepperContext.Provider>;
}
function Step({ step, ...props }: React.ComponentProps<'div'> & { step: number }) {
	const { current } = useStepContext();

	if (current != step) return null;
	return <div {...props} />;
}

function StepProgress({ className, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
	const { current, max, setStep } = useStepContext();

	return (
		<ProgressPrimitive.Root data-slot='progress' className={cn('bg-primary/20 relative my-3 flex h-2 w-full items-center justify-start rounded-full px-1', className)} {...props}>
			<div className='absolute inset-0 z-2 flex items-center justify-between'>
				{Array.from({ length: max }).map((e, i) => (
					<div
						onClick={() => setStep(i + 1, i + 1 < current)}
						className={cn('border-secondary bg-background data-[current="true"]:border-primary flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 *:m-0! data-[complete="true"]:border-green-600')}
						data-complete={i + 1 < current}
						data-current={i + 1 == current}
						key={i}>
						<h6>{i + 1}</h6>
					</div>
				))}
			</div>
			<ProgressPrimitive.Indicator data-slot='progress-indicator' className='h-full rounded-s-full bg-green-500 transition-all duration-300' style={{ width: `${(current - 1) * (100 / (max - 1))}%` }} />
		</ProgressPrimitive.Root>
	);
}
function StepActions({ noError, check, ...props }: React.ComponentProps<'div'> & { noError: boolean; check: any; form: UseFormReturn<{ firstname: string; lastname: string; username: string; password: string }, { firstname: string; lastname: string; username: string; password: string }> }) {
	const { current, max, setStep } = useStepContext();

	return (
		<div className='flex items-center justify-between gap-5'>
			{current != 1 && (
				<Button type='button' onClick={() => setStep(current - 1, true)}>
					Back
				</Button>
			)}
			{current != max ? (
				<Button
					type='button'
					disabled={!noError}
					onClick={async () => {
						if (check) {
							if (await check()) setStep(current + 1);
							return;
						}
						setStep(current + 1);
					}}>
					{check ? 'Check' : 'Next'}
				</Button>
			) : (
				props.children
			)}
		</div>
	);
}
export { useStepContext, Steps, Step, StepProgress, StepActions };
