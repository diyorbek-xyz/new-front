'use client';
import { AnimeType } from '@/types/anime';
import ImageWithFallback from './image';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import MenuDots from '@components/icon/dot-menu';
import { Button } from './button';
import { Bookmark, Eye, Heart } from 'lucide-react';
import { CSSProperties, useEffect, useState } from 'react';
import { fetchFile } from '@/miscs/fetcher';

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

function AnimeCard({ _id: id, name, poster, description }: AnimeType) {
	const url = new URL('/anime', process.env.NEXT_PUBLIC_URL);
	url.searchParams.set('id', id);
	const[color,setColor]=useState<string>('#00ff00');useEffect(()=>{function Change(){let res='#';while(res.length<=6)res+=arr[Math.floor(arr.length*Math.random())].toString().toUpperCase();setColor(res);}Change()},[]);
	return (
		<article>
			<div
				style={{ '--color': color } as CSSProperties}
				className='relative z-2! grid *:z-1 before:pointer-events-none! before:absolute before:inset-4 before:z-0 before:rounded-2xl before:bg-(--color)/10 before:opacity-0 before:duration-200 hover:before:-inset-3 hover:before:opacity-100 active:before:-inset-2'>
				<Link href={url.href}>
					<ImageWithFallback className='rounded-xl shadow-xl shadow-black/20' src={fetchFile(poster)} fallback='/assets/images/banner.png' />
					<div className='*:bg-green! *:text-green-fg! absolute top-1 right-1 flex items-center gap-1 *:flex *:items-center *:gap-1 *:rounded-2xl! *:px-2 *:py-0.5 *:text-[13px] *:leading-0! *:font-bold *:shadow-md *:shadow-black/30'>
						<span>
							<Eye size={17} strokeWidth={2} /> 32K
						</span>
						<span>
							<Heart size={17} strokeWidth={2} /> 63K
						</span>
					</div>
				</Link>
				<div className='relative flex items-start justify-between! p-2 pb-0!'>
					<Popover>
						<Link href={url.href} className='w-full! no-underline!'>
							<h3 className='mb-2! text-xl!'>{name}</h3>
							<p className='mb-0! *:text-sm'>{description ?? 'Lorem ipsum, dolor sit amet consectetur.'}</p>
							<p className='mb-1! text-right text-[13px]'>5 days ago</p>
						</Link>
						<PopoverTrigger asChild>
							<Button className='pointer-events-auto! absolute top-2 right-2 z-10!' size='icon' variant='ghost'>
								<MenuDots />
							</Button>
						</PopoverTrigger>
						<PopoverContent align='end' className='border-gray/20! flex w-40 flex-col rounded-md p-0! *:rounded-none **:justify-start! *:before:rounded-sm! *:first:rounded-t-md *:last:rounded-b-md'>
							<Button variant='dark'>
								<Bookmark />
								Save
							</Button>
							<Button variant='dark'>
								<Bookmark />
								Share
							</Button>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</article>
	);
}

export { AnimeCard };
