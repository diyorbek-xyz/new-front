import { fetchFile } from '@/miscs/fetcher';
import { AnimeType } from '@/types/anime';
import ImageWithFallback from '@components/ui/image';
import { AnimeModel } from '@lib/models/anime';
import { connectDB } from '@lib/mongodb';
import { SearchParams } from 'next/dist/server/request/search-params';
import { redirect } from 'next/navigation';

export default async function Anime({ searchParams }: { searchParams: Promise<SearchParams> }) {
	let data: AnimeType;
	try {
		const params = await searchParams;
		if (!params) throw Error();
		await connectDB();
		data = (await AnimeModel.findById(params.id).populate('episodes seasons').lean()) as AnimeType;
	} catch {
		redirect('/animes');
	}

	return (
		<section>
			<article>
				<ImageWithFallback src={fetchFile(data.poster)} />
				
			</article>
		</section>
	);
}
