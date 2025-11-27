import { getBaseUrl } from '@/miscs/getBaseUrl';
import Logo from '@components/icon/logo';
import { Avatar, AvatarDecoration, AvatarImage } from '@components/ui/avatar';
import type { AccountType } from '@/types/account';
import Link from 'next/link';
import { cookieHeader } from '@/miscs/getCookies';

export default async function Navbar() {
	const res = await fetch(`${getBaseUrl()}/api/account/profile`, { method: 'GET', headers: { cookie: cookieHeader }, credentials: 'include' });
	const data = (await res.json()) as AccountType;
	return (
		<nav className='container-compact fixed top-0 h-25 z-50 grid w-full grid-cols-(--navbar-columns) items-center *:flex *:h-full *:items-center'>
			<div>
				<Logo size={70} />
			</div>
			<div className='justify-self-center'>
				<ul className='flex list-none items-center gap-4'>
					<li>
						<Link href='/'>Home</Link>
					</li>
					<li>
						<Link href='/animes'>Animes</Link>
					</li>
					<li>
						<Link href='/saved'>Saved</Link>
					</li>
					<li>
						<Link href='/history'>History</Link>
					</li>
				</ul>
			</div>
			<div className='justify-self-end'>
				<Link href='/account/profile' title={data.username}>
					<Avatar className='pointer-events-none'>
						<AvatarImage src={data.avatar} />
						<AvatarDecoration src={data.decoration?.src} />
					</Avatar>
				</Link>
			</div>
		</nav>
	);
}
