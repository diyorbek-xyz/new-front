import { twMerge } from 'tailwind-merge';
import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar, LinksType } from './sidebar';

function PageSkeleton({ children, hasSidebar, data, className, ...props }: { children: React.ReactNode; hasSidebar?: boolean } & { data?: LinksType[] } & React.ComponentProps<'section'>) {
	if (hasSidebar && data) {
		return (
			<SidebarProvider>
				<AppSidebar data={data} />
				<section className={twMerge('container-compact', className)}>{children}</section>
			</SidebarProvider>
		);
	} else {
		return <section className={twMerge('container-compact', className)}>{children}</section>;
	}
}
export default PageSkeleton;
