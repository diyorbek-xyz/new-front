import { cn } from '@/lib/utils';

function Skeleton({ className, data, children, ...props }: React.ComponentProps<'div'> & { data?: string | React.ReactNode }) {
	if (data)
		return (
			<div className={cn('flex items-center justify-start', className)} {...props}>
				{children}
			</div>
		);
	return <div data-slot='skeleton' className={cn('bg-accent animate-pulse rounded-md', className)} {...props} />;
}

export { Skeleton };
