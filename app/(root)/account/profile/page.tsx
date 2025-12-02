import ImageWithFallback from '@components/ui/image';
import { Avatar, AvatarDecoration, AvatarImage } from '@components/ui/avatar';
import { BookmarkCheckIcon, ClockIcon, Edit, HeartIcon } from 'lucide-react';
import { Button } from '@components/ui/button';
import EditProfileForm from '@components/forms/edit_profile';
import { Metadata } from 'next';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';
import { Dialog, DialogProvider, DialogTrigger } from '@components/interactive/dialog';
import { Tab, TabContent, TabContents, Tabs } from '@components/interactive/tab';
import { AccountModel } from '@lib/models/account';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { connectToDB } from '@lib/mongodb';
import { AnimeCard } from '@components/ui/anime-card';
export const metadata: Metadata = {
	title: 'Profile',
	description: 'Check your profile',
	keywords: 'profile,account,justwatch,anime,edit',
};

export default async function Profile() {
	// const data = (await fetchAccount.get().then((res) => res.data)) as AccountType;
	const token = (await cookies()).get('token')?.value;
	const decode: any = await jwtDecode(token!);
	const db = await connectToDB();
	const data: any | null = await db.collection('users').findOne({ _id: decode.id });

	return (
		<section className='profile'>
			<DialogProvider>
				<ImageWithFallback className='h-60 w-full object-cover object-center' alt='banner' src='dd' fallback='/assets/images/banner.jpg' />
				<article className='container-compact relative flex overflow-hidden pb-15'>
					<div className='flex flex-wrap items-start gap-x-10 gap-y-5'>
						<div className='flex justify-center max-md:w-full'>
							<Avatar className='z-10 size-50'>
								<AvatarImage src='/assets/images/AvatarPiece.png' />
								<AvatarDecoration src='/assets/decorations/goto.png' />
							</Avatar>
						</div>
						<div className='flex w-full flex-col gap-2 md:flex-1 md:py-5'>
							<h2 className='mb-3!'>
								{data?.firstname ?? 'DD'} {data?.lastname ?? 'LL'}
							</h2>
							<div className='*:not-[a]:text-gray/60! flex items-center gap-5 *:flex *:items-center *:gap-1 *:text-nowrap'>
								<a>@{data?.username??"USS"}</a>
								<span>16 yosh</span>
								<span>56 xp</span>
								<span>100 tomosha</span>
							</div>
							<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio corporis fugit tempora illo cum velit, dolorum temporibus natus consectetur similique cupiditate ratione non nisi delectus reiciendis et fuga labore molestiae.</p>
						</div>
						<div className='flex items-end justify-between gap-2 self-start justify-self-end md:flex-col md:py-5'>
							<DialogTrigger asChild>
								<Button size='sm'>
									<Edit />
									Edit profile
								</Button>
							</DialogTrigger>
							<Popover>
								<PopoverTrigger asChild>
									<Button variant='error' size='sm'>
										Logout
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<h4>Are you sure?</h4>
									<a href='/api/auth/logout/'>Loog</a>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</article>
				<article className='container-compact grid **:bg-transparent'>
					<Tabs>
						<Tab tab='history'>
							<ClockIcon />
							History
						</Tab>
						<Tab tab='saved'>
							<BookmarkCheckIcon />
							Saved
						</Tab>
						<Tab tab='liked'>
							<HeartIcon />
							Liked
						</Tab>
					</Tabs>
					<TabContents>
						<TabContent className='grid grid-cols-3 gap-5 py-5' tab='history'>
							<AnimeCard name='anime' _id='gg' description='Lorem sit amet consectetur adip. Maiores sed consequatur' />
							<AnimeCard name='anime' _id='gg' description='Lorem sit amet consectetur adip. Maiores sed consequatur' />
							<AnimeCard name='anime' _id='gg' description='Lorem sit amet consectetur adip. Maiores sed consequatur' />
						</TabContent>
						<TabContent tab='saved'>Saved</TabContent>
						<TabContent tab='liked'>Liked</TabContent>
					</TabContents>
				</article>

				<Dialog className='grid overflow-auto'>
					<h2>Edit</h2>
					<EditProfileForm />
				</Dialog>
			</DialogProvider>
		</section>
	);
}
