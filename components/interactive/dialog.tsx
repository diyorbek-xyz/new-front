'use client';
import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { Slot } from '@radix-ui/react-slot';
import React, { createContext, useContext, useMemo, useState } from 'react';

interface ContextType {
	isOpen: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
}

const dialog = createContext<ContextType | null>(null);
function useDialog() {
	const context = useContext(dialog);
	if (!context) throw new Error('useDialog() must be in DialogProvider');
	return context;
}

function DialogProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState<boolean>(false);
	const value = useMemo(() => {
		return { isOpen: open, open: () => setOpen(true), close: () => setOpen(false), toggle: () => setOpen(!open) } as ContextType;
	}, [open]);

	return <dialog.Provider value={value}>{children}</dialog.Provider>;
}
function DialogTrigger({ asChild, children, ...props }: React.ComponentProps<'button'> & { asChild: boolean }) {
	const Comp = asChild ? Slot : Button;
	const { toggle } = useDialog();
	return (
		<Comp onClick={() => toggle()} {...props}>
			{children}
		</Comp>
	);
}
function Dialog({ className, rootClassName, ...props }: React.ComponentProps<'div'> & { rootClassName?: string }) {
	const { isOpen, close } = useDialog();
	if (!isOpen) return;
	return (
		<div className={cn('fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xl', rootClassName)}>
			<div onClick={() => close()} className='absolute inset-0' />
			<div className={cn('bg-background border-border pointer-events-auto relative z-51 rounded-xl border p-5 md:size-10/12', className)} {...props} />
		</div>
	);
}

export { DialogProvider, Dialog, DialogTrigger };
