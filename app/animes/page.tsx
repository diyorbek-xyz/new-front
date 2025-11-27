import Search from '@components/ui/search';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'JustWatch | All Animes',
	description: 'On this page you can find all dubed animes',
	keywords: ['all', 'animes', 'anime', 'justwatch'],
};
export default function Animes() {
	return (
		<main className='*:container-compact '>
			<section>
				<article>
					<Search />
				</article>
			</section>
		</main>
	);
}
