'use client';
export default function Error(err: any) {
	return (
		<div>
			Error while loading page <br /> <code>{err.error.message}</code>
		</div>
	);
}
