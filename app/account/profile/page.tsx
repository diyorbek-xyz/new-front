import PageSkeleton from '@components/layout/page_layout';
import { LinksType } from '@components/layout/sidebar';
import { SidebarTrigger } from '@components/ui/sidebar';
import { BookmarkCheck, Edit, History, Settings, UserCircle } from 'lucide-react';
import GetProfile from './client';

const data: LinksType[] = [
	{
		title: 'Account',
		links: [
			{
				title: 'Profile',
				url: '/account/profile',
				icon: UserCircle,
			},
			{
				title: 'Edit',
				url: '/account/edit',
				icon: Edit,
			},
			{
				title: 'History',
				url: '/account/history',
				icon: History,
			},
			{
				title: 'Saved',
				url: '/account/saved',
				icon: BookmarkCheck,
			},
			{
				title: 'Settings',
				url: '/account/settings',
				icon: Settings,
			},
		],
	},
];

export default function Profile() {
	return (
		<PageSkeleton data={data}>
			<SidebarTrigger />
			<h1>Profile</h1>
			<GetProfile />
		</PageSkeleton>
	);
}
