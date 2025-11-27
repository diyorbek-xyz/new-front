import { getBaseUrl } from '@/miscs/getBaseUrl';
import { cookieHeader } from '@/miscs/getCookies';
import ImageWithFallback from '@components/ui/image';
import type { AccountType } from '@/types/account';
import { Avatar, AvatarDecoration, AvatarImage } from '@components/ui/avatar';
import { Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@components/ui/dialog';
import { Button } from '@components/ui/button';
import EditProfileForm from '@components/forms/edit_profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Profile',
	description: 'Check your profile',
	keywords: 'profile,account,justwatch,anime,edit',
};

export default async function Profile() {
	const res = await fetch(`${getBaseUrl()}/api/account/profile`, { method: 'GET', headers: { cookie: cookieHeader } });
	const data = (await res.json()).data as AccountType;
	function createdDate() {
		const date = new Date(data.createdAt);
		const dd = new Date(new Date().getTime() - date.getTime()).getFullYear()
		console.log(dd);
	}
	createdDate();

	return (
		<section className='profile'>
			<Dialog>
				<article className='bg-accent-shadow' style={{ background: `linear-gradient(0deg,${data.accent ?? '#0000ff30'} 0%,transparent 50%)` }} />
				<article className='relative flex h-100 items-end justify-center overflow-hidden pb-15'>
					<ImageWithFallback className='absolute inset-0 z-0 h-full w-full object-cover object-center' alt='banner' src={data.banner} fallback='/assets/images/banner.jpg' />
					<article className='bg-accent-shadow absolute! inset-0!' style={{ background: `linear-gradient(0deg, #000000 0%,transparent 50%)` }} />
					<Avatar className='z-10 size-50'>
						<AvatarImage src={data.avatar} />
						<AvatarDecoration src={'/assets/decorations/nobara.png'} />
					</Avatar>
					<div className='container-compact absolute inset-0 z-15 flex items-end justify-between'>
						<h5>{data.createdAt ?? 5} yildan beri Amedia TVda</h5>
						<DialogTrigger asChild>
							<Button>
								<Edit />
								Edit profile
							</Button>
						</DialogTrigger>
					</div>
				</article>
				<article className='container-compact grid grid-cols-2'>
					<div>
						<h2 className='mb-3!'>
							{data.firstname} {data.lastname}
						</h2>
						<h5 className='bg-background/30'>16 yosh</h5>
					</div>
					<div></div>
				</article>
				<DialogContent className='max-h-[calc(100vh-4rem)] max-w-[calc(100%-10rem)]! overflow-auto'>
					<DialogTitle>Edit</DialogTitle>

					<EditProfileForm />
				</DialogContent>
			</Dialog>
		</section>
	);
}
