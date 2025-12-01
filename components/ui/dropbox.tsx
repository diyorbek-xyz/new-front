'use client';

import { ImageCrop, ImageCropApply, ImageCropContent, ImageCropReset } from '@/components/kibo-ui/image-crop';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { UploadDropzone } from '@components/upload-dropzone';
import { Dialog, DialogProvider, DialogTrigger } from '@components/interactive/dialog';

interface DropboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
	id: string;
	onComplete?: (name: string, file: { data: any; file: File }) => void;
	aspect?: number;
	circularCrop?: boolean;
}
function Dropbox({ onComplete, aspect = 1, circularCrop = false, ...props }: DropboxProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [croppedImage, setCroppedImage] = useState<string | null>(null);

	const handleFileChange = (file: File) => {
		if (file) {
			setSelectedFile(file);
			setCroppedImage(null);
		}
	};

	const handleReset = () => {
		setSelectedFile(null);
		setCroppedImage(null);
	};

	const handleComplete = (data: any, file: File) => {
		setCroppedImage(URL.createObjectURL(file));
		onComplete?.(props.id, { data, file });
	};

	return (
		<DialogProvider>
			<DialogTrigger asChild>
				{croppedImage ? (
					<div className='flex items-start justify-between space-y-4'>
						<Button onClick={handleReset} size='lg' type='button' variant='destructive'>
							<XIcon /> Reset
						</Button>
						<img alt='Cropped' className='w-1/2 object-cover' src={croppedImage} />
					</div>
				) : (
					<Button>Change</Button>
				)}
			</DialogTrigger>
			{!croppedImage && (
				<Dialog rootClassName='backdrop-blur-none' className='grid grid-rows-[auto_1fr] *:size-full md:h-9/12 md:w-5/12'>
					<h2>Select {props.id}</h2>
					{!selectedFile ? (
						<div>
							<UploadDropzone name={props.id} id={props.id} changeFile={handleFileChange} accept='image/*' />
						</div>
					) : (
						!croppedImage && (
							<div className='flex flex-col justify-between'>
								<ImageCrop circularCrop={circularCrop} aspect={aspect} file={selectedFile} onCrop={handleComplete}>
									<div className='flex items-center gap-2 self-end'>
										<ImageCropApply />
										<ImageCropReset />
										<Button onClick={handleReset} size='icon' type='button' variant='ghost'>
											<XIcon className='size-7' />
										</Button>
									</div>
									<ImageCropContent className='max-w-md' />
								</ImageCrop>
							</div>
						)
					)}
				</Dialog>
			)}
		</DialogProvider>
	);
}

export default Dropbox;
