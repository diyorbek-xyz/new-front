import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	`
	relative box-content duration-75 ease-out
	inline-flex items-center justify-center overflow-hidden gap-2 whitespace-nowrap rounded-xl text-base font-medium transition-all shrink-0
	disabled:pointer-events-none disabled:opacity-50 focus-visible:border-dark focus-visible:ring-dark/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
	[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 
	*:z-1! *:flex! *:size-full! *:items-center *:justify-center *:gap-2
	before:absolute active:before:inset-0! before:inset-[12%] before:rounded-lg before:opacity-0 before:duration-150 before:ease-out hover:before:opacity-100! before:bg-dark/15
	`,
	{
		variants: {
			outline: {
				dynamic: 'border border-b-3 active:border-b!',
				static: 'border border-b-3',
			},
			variant: {
				green: 'bg-green text-green-fg',
				error: 'bg-red-600 text-gray',
				gray: 'bg-gray text-gray-fg',
				dark: 'bg-dark text-dark-fg before:bg-white/20',
				link: 'text-primary underline-offset-4 hover:underline',
				ghost: 'bg-transparent text-gray! before:bg-gray/20!',
			},
			size: {
				default: 'h-11 px-7 min-w-16 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 before:inset-x-1! has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-10 *:size-full!',
			},
		},
		defaultVariants: {
			variant: 'green',
			size: 'default',
		},
	},
);
interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}
function Button({ className, onClick, variant, size, outline, asChild = false, children, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp data-slot='button' className={cn(buttonVariants({ variant, size, outline, className }), '')} onClick={onClick} {...props}>
			<span>{children}</span>
		</Comp>
	);
}

export { Button, buttonVariants };
export type { ButtonProps };
