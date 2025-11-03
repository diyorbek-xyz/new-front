import PageSkeleton from '@/components/layout/page_layout';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { baseName } from '@/lib/utils';
import { sidebar_animes } from '@/miscs/sidebar_datas';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: baseName + ' | ' + 'All Animes',
	description: 'On this page you can find all dubed animes',
	keywords: ['all', 'animes', 'anime', 'justwatch'],
};
export default function Animes() {
	return (
		<PageSkeleton data={sidebar_animes}>
			<SidebarTrigger />
			<h1>ANIMES</h1>
		</PageSkeleton>
	);
}
