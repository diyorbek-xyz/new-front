'use client';

import React from 'react';

function ImageWithFallback({ src, fallback = '', alt, ...props }: React.ComponentProps<'img'> & { fallback?: string }) {
	const [imgSrc, setImgSrc] = React.useState(src);

	React.useEffect(() => {
		if (!src) {
			setImgSrc(fallback);
			return;
		}
		const img = new Image();
		img.src = src as string;
		img.onload = () => setImgSrc(src);
		img.onerror = () => setImgSrc(fallback);
	}, [src, fallback]);
	if (imgSrc == '') return <div {...props}/>;
	return <img alt={alt} {...props} src={imgSrc} />;
}
export default ImageWithFallback;
