import Logo from '@components/icon/logo';
import { Avatar, AvatarDecoration, AvatarImage } from '@components/ui/avatar';
import Link from 'next/link';
import { ThemeToggle } from '@components/ui/switch-theme';
export default async function Navbar() {
	// const data = (await fetchAccount.get().then((res) => res.data)) as AccountType;
	return (
		<nav className='container-compact fixed top-0 z-50 grid h-25 w-full grid-cols-(--navbar-columns) items-center *:flex *:gap-5 *:h-full *:items-center'>
			<div>
				<Logo size={70} />
			</div>
			<div className='justify-self-center'>
				<Link href='/'>Home</Link>
				<Link href='/animes'>Animes</Link>
				<Link href='/saved'>Saved</Link>
				<Link href='/history'>History</Link>
			</div>
			<div className='justify-self-end'>
				<ThemeToggle />
				<Link href='/account/profile'>
					<Avatar className='pointer-events-none'>
						<AvatarImage src='/assets/images/AvatarPiece.png' />
						<AvatarDecoration src='/assets/decorations/gojo.png' />
					</Avatar>
				</Link>
			</div>
		</nav>
	);
}
