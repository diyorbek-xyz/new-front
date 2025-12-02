import { AnimeCard } from '@components/ui/anime-card';
import { connectToDB } from '@lib/mongodb';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'JustWatch | All Animes',
	description: 'On this page you can find all dubed animes',
	keywords: ['all', 'animes', 'anime', 'justwatch'],
};
export default async function Animes() {
	const db = await connectToDB();
	const data = await db.collection('animes').find({}).toArray();

	return (
		<main className='*:container-compact'>
			<section className='grid grid-cols-3 gap-5'>
				{data.map((anime) => {
					return <AnimeCard key={anime._id.toString()} _id={anime._id.toString()} name={anime.name} description={anime.description} poster={anime.poster} />;
				})}
				<AnimeCard name='anime' _id="gg" description='Lorem sit amet consectetur adip. Maiores sed consequatur' />
				<AnimeCard name='anime' _id="gg" description='Lorem Maiores sed consequatur' />
				<AnimeCard name='anime' _id="gg" description='Lorem adipisicing elit. Maiores sed consequatur' />
				<AnimeCard name='anime' _id="gg" description='Lorem sit amet consectetur. Maiores sed consequatur' />
				<AnimeCard name='anime' _id="gg" description='Lorem sit amet consectetur adipisicing elit consequatur' />
				<AnimeCard name='anime' _id="gg" description='Ipsum amet consectetur adipisicing elit. Maiores sed consequatur' />
			</section>
		</main>
	);
}
