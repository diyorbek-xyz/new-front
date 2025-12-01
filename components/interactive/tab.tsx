'use client';

import { Button } from '@components/ui/button';
import { cn } from '@lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

function Tabs({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('bg-dark *:text-dark-fg! flex items-center gap-2 rounded-t-2xl', className)} {...props} />;
}
function Tab({ tab, className, ...props }: React.ComponentProps<'button'> & { tab: string }) {
	const url = new URL('', process.env.NEXT_PUBLIC_URL);
	url.searchParams.set('tab', tab);
	const router = useRouter();
	const current = useSearchParams().get('tab');
	return (
		<Button
			className={cn('before:bg-gray/10 outline! outline-dark after:bg-green rounded-sm bg-transparent before:inset-x-1.5! after:absolute after:-bottom-0.5 overflow-visible after:opacity-0 after:h-1 after:w-2/3 after:rounded-full data-[current="true"]:after:opacity-100!', className)}
			onClick={() => router.push(url.search)}
			data-current={tab == current}
			{...props}
		/>
	);
}

function TabContents({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('bg-dark rounded-b-2xl px-5 py-3', className)} {...props} />;
}
function TabContent({ tab, ...props }: React.ComponentProps<'div'> & { tab: string }) {
	const current = useSearchParams().get('tab');
	if (current == tab) return <div {...props} />;
	return null;
}

export { Tabs, Tab, TabContents, TabContent };
