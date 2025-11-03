import { twMerge } from 'tailwind-merge';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar, LinksType } from './sidebar';
import Navbar from './navbar';

function PageSkeleton({ children, data, className, ...props }: { children: React.ReactNode; data?: LinksType[] } & React.ComponentProps<'section'>) {
	if (data) {
		return (
			<>
				<SidebarProvider>
					<AppSidebar data={data} />
					<Navbar />
					<main className={twMerge('container-compact', className)} {...props}>
						{children}
					</main>
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
