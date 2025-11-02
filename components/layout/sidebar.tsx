import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
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
export function AppSidebar({ data }: { data: LinksType[] }) {
	return (
		<Sidebar variant='sidebar'>
			<SidebarHeader />
			<SidebarContent>
				{data.map((header) => (
					<SidebarGroup key={header.title}>
						<SidebarGroupLabel>{header.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{header.links.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<a href={item.url}>
												<item.icon />
												<span>{item.title}</span>
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
