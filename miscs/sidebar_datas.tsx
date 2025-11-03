'use client';
import { LinksType } from '@components/layout/sidebar';
import { Calendar, Home, Inbox, Search, Settings, BookmarkCheck, Edit, History, UserCircle } from 'lucide-react';

const sidebar_animes: LinksType[] = [
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
const sidebar_account: LinksType[] = [
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

export { sidebar_animes, sidebar_account };
