import Navbar from '@components/layout/navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Justwatch | Not Found 404',
};

export default function NotFound() {
	return (
		<>
			<Navbar />
			<div className='p-10 text-center'>
				<h1 className='text-4xl font-bold'>404 — Page Not Found 🧱</h1>
				<p className='mt-2 text-gray-500'>This route doesn’t exist, bro.</p>
			</div>
		</>
	);
}
