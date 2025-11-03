'use client';
import { twMerge } from 'tailwind-merge';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar, LinksType } from './sidebar';
import { useState } from 'react';
import Navbar from './navbar';

function PageSkeleton({ children, data, className, ...props }: { children: React.ReactNode; data?: LinksType[] } & React.ComponentProps<'div'>) {
	const [open, setOpen] = useState<boolean>(JSON.parse(localStorage.getItem('sidebar_state') ?? 'false'));
	function openSidebar(e: boolean) {
		setOpen(e);
		localStorage.setItem('sidebar_state', String(e));
	}
	if (data) {
		return (
			<>
				<SidebarProvider data-open={open} open={open} onOpenChange={(e) => openSidebar(e)} className='grid h-screen grid-cols-[300px_1fr] data-[open=false]:grid-cols-[4rem_1fr]'>
					<AppSidebar data={data} className='static h-full w-full' />
					<div className={twMerge('col-start-2 col-end-3 row-start-1 row-end-3 h-full w-full overflow-auto', className)} {...props}>
						<Navbar />
						<main className='container-compact'>{children}</main>
					</div>
				</SidebarProvider>
			</>
		);
	} else {
		return (
			<>
				<Navbar />
				<main className={twMerge('container-compact', className)} {...props}>
					{children}
				</main>
			</>
		);
	}
}
export default PageSkeleton;
