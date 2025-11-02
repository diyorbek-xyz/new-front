import PageSkeleton from '@/components/layout/page_layout';
import { LinksType } from '@/components/layout/sidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { baseName } from '@/lib/utils';
import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';
import { Metadata } from 'next';

const data: LinksType[] = [
	{
		title: 'Application',
		links: [
			{
				title: 'Home',
				url: '#',
				icon: Home,
			},
			{
				title: 'Inbox',
				url: '#',
				icon: Inbox,
			},
			{
				title: 'Calendar',
				url: '#',
				icon: Calendar,
			},
			{
				title: 'Search',
				url: '#',
				icon: Search,
			},
			{
				title: 'Settings',
				url: '#',
				icon: Settings,
			},
		],
	},
];

export const metadata: Metadata = {
	title: baseName + ' | ' + 'All Animes',
	description: 'On this page you can find all dubed animes',
	keywords: ['all', 'animes', 'anime', 'justwatch'],
};
export default function Animes() {
	return (
		<PageSkeleton data={data} hasSidebar>
			<SidebarTrigger />
			<h1>ANIMES</h1>
		</PageSkeleton>
	);
}
