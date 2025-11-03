'use client';

import { AccountType } from '@/types/account';
import { Skeleton } from '@components/ui/skeleton';
import account from '@services/account';
import { useEffect, useState } from 'react';

export default function GetProfile() {
	const [data, setData] = useState<AccountType>();
	useEffect(() => {
		account.my().then((res) => setData(res.data));
	}, []);
	console.log(data);
	return (
		<section>
			<article className='grid w-100 gap-1'>
				<Skeleton className='h-8 w-full' data={data?.first_name}>
					<h1>First Name: {data?.first_name}</h1>
				</Skeleton>
				<Skeleton className='h-8 w-full' data={data?.last_name}>
					<h1>Last Name: {data?.last_name}</h1>
				</Skeleton>
				<Skeleton className='h-8 w-full' data={data?.username}>
					<h1>Username: {data?.username}</h1>
				</Skeleton>
			</article>
		</section>
	);
}
