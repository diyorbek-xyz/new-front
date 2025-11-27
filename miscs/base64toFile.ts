export default function base64ToFile(base64: string, name: string = 'file'): File {
	const [header, data] = base64.split(',');

	const mimeMatch = header.match(/data:(.*?);base64/);
	if (!mimeMatch) throw new Error('Invalid base64 string');
	const mime = mimeMatch[1];

	const ext = mime.split('/')[1];

	const bstr = atob(data);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) u8arr[n] = bstr.charCodeAt(n);
	
	return new File([u8arr], `${name}.${ext}`, { type: mime });
}
