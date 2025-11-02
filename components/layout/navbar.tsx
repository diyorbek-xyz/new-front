'use client';

import Link from 'next/link';
import { Edit, LogOut, UserCircle } from 'lucide-react';

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import account from '@/services/account';

export default function Navbar() {
	const isMobile = useIsMobile();
	function logOut() {
		account.logout().then((res) => console.log(res));
	}
	return (
		<header className='bg-background/75 sticky top-0 z-20 flex h-(--navbar-height) items-center py-2 backdrop-blur-3xl'>
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
							<NavigationMenuLink asChild>
								<button onClick={() => logOut()} className='flex-row w-full items-center gap-2'>
									<LogOut />
									Logout
								</button>
							</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
