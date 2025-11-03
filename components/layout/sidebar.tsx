import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui/sidebar';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface LinksType {
	title: string;
	links: Array<{
		title: string;
		url: string;
		icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
	}>;
}
export function AppSidebar({ data, ...props }: { data: LinksType[] } & React.ComponentProps<'div'>) {
	return (
		<Sidebar collapsible='icon' variant='sidebar' {...props}>
			<SidebarHeader>
				<SidebarMenuItem className='justify-start group-data-[collapsible=icon]:justify-center'>
					<SidebarMenuButton className='w-min' size='custom' tooltip='toggle' asChild>
						<SidebarTrigger />
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarHeader>
			<SidebarContent>
				{data.map((header) => (
					<SidebarGroup key={header.title}>
						<SidebarGroupLabel>{header.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{header.links.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton size='custom' tooltip={item.title} asChild>
											<a href={item.url}>
												<item.icon />
												<span className='label'>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
export type { LinksType };
