'use client';
import React, { createContext, useMemo, useState } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@lib/utils';
import { Button, ButtonProps, buttonVariants } from './button';
import { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

interface StepperContextType {
	current: number;
	max: number;
	setStep: (step: number) => void;
}
const stepperContext = createContext<StepperContextType | null>(null);
function useStepContext() {
	const context = React.useContext(stepperContext);
	if (!context) {
		throw new Error('useStep must be used within a StepProvider');
	}
	return context;
}
function Steps({ children, current, max }: { children: React.ReactNode; current: number; max: number }) {
	const [step, setStep] = useState<number>(current);
	const value = useMemo<StepperContextType>(() => ({ current: step, max: max, setStep: setStep }), [step, max]);
	return <stepperContext.Provider value={value}>{children}</stepperContext.Provider>;
}
function Step({ step, ...props }: React.ComponentProps<'div'> & { step: number }) {
	const { current } = useStepContext();

	if (current != step) return null;
	return <div {...props} />;
}

function StepProgress({ className, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root>) {
	const { current, max } = useStepContext();

	return (
		<div>
			<ProgressPrimitive.Root data-slot='progress' className={cn('bg-primary/20 relative my-4 flex h-2 w-full items-center justify-start rounded-full', className)} {...props}>
				<div className='absolute inset-0 z-2 flex items-center justify-between'>
					{Array.from({ length: max }).map((e, i) => (
						<div className={cn('border-secondary bg-background data-[current="true"]:border-primary flex h-10 w-10 items-center justify-center rounded-full border-2 *:m-0!')} data-current={i + 1 == current} key={i}>
							<h4>{i + 1}</h4>
						</div>
					))}
				</div>
				<ProgressPrimitive.Indicator data-slot='progress-indicator' className='bg-primary h-full rounded-s-full transition-all' style={{ width: `${(current / max - 1) * 100 || 0}% !important` }} />
			</ProgressPrimitive.Root>
		</div>
	);
}
function StepNextButton({ children, onClick, ...props }: ButtonProps) {
	const { current, max, setStep } = useStepContext();
	if (current == max) {
		return (
			<Button onClick={onClick} {...props}>
				{children}
			</Button>
		);
	}
	return <Button type='submit' onClick={() => setStep(current + 1)}>Next</Button>;
}

export { Steps, Step, StepProgress, StepNextButton };
