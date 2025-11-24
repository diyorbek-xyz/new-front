import { getBaseUrl } from '@/miscs/getBaseUrl';
import ChromaGrid from '@components/ChromaGrid';
import { cookies } from 'next/headers';

const items = [
	{
		image: 'https://i.pravatar.cc/300?img=1',
		title: 'Sarah Johnson',
		subtitle: 'Frontend Developer',
		handle: '@sarahjohnson',
		borderColor: '#3B82F6',
		gradient: 'linear-gradient(145deg, #3B82F6, #000)',
		url: 'https://github.com/sarahjohnson',
	},
	{
		image: 'https://i.pravatar.cc/300?img=2',
		title: 'Mike Chen',
		subtitle: 'Backend Engineer',
		handle: '@mikechen',
		borderColor: '#10B981',
		gradient: 'linear-gradient(180deg, #10B981, #000)',
		url: 'https://linkedin.com/in/mikechen',
	},
];
export default async function Home() {
	const token = (await cookies()).get('token')?.value;
	const res = await fetch(`${getBaseUrl()}/api/account/profile`, { method: 'GET', headers: { cookie: `token=${token}` } });
	const accountData = (await res.json()).data;

	return (
		<div className='relative!'>
			<ChromaGrid />
		</div>
	);
}
