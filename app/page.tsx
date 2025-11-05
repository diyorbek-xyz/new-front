export default async function Home() {
	const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' });
	const data: Array<{ id: number; username: string }> = await res.json();
	
	return (
		<div>
			<ul>
				{data.map(({ id, username }) => (
					<li key={id}>{username}</li>
				))}
			</ul>
			
			<h1>Hello</h1>
		</div>
	);
}
