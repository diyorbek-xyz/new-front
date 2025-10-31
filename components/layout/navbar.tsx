'use client';

import Link from 'next/link';
import { Edit, UserCircle } from 'lucide-react';

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Navbar() {
	const isMobile = useIsMobile();
	return (
		<header className='bg-background/75 sticky top-0 z-20 h-(--navbar-height) flex items-center py-2 backdrop-blur-3xl'>
			<NavigationMenu viewport={isMobile}>
				<div className='flex items-center'>
					<h1 className='text-2xl'>Just Watch</h1>
				</div>
				<NavigationMenuList className='flex-wrap'>
					<NavigationMenuItem>
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
							<Link href='/'>Home</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
							<Link href='/animes'>Animes</Link>
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Account</NavigationMenuTrigger>
						<NavigationMenuContent>
							<NavigationMenuLink asChild>
								<Link href='/account/profile' className='flex-row items-center gap-2'>
									<UserCircle />
									Check your account
								</Link>
							</NavigationMenuLink>
							<NavigationMenuLink asChild>
								<Link href='/account/edit' className='flex-row items-center gap-2'>
									<Edit />
									Edit your account
								</Link>
							</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
