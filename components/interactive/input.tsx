import { cn } from '@lib/utils';

export default function Input({ className, big, outline, ...props }: React.ComponentPropsWithoutRef<'input'> & { big?: boolean; outline?: boolean }) {
	return (
		<input
			className={cn(
				"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-block w-full shrink-0 items-center justify-center gap-2 rounded-md text-base font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				'bg-accent border-border h-9 border px-3 py-2',
				{ 'h-12 px-5 py-3': big, 'bg-background border-border border-2': outline },
				className,
			)}
			{...props}
		/>
	);
}
