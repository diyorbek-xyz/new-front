'use client';

import { ImageCrop, ImageCropApply, ImageCropContent, ImageCropReset } from '@/components/kibo-ui/image-crop';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import base64ToFile from '@/miscs/base64toFile';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import React, { type ChangeEvent, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './dialog';
import { UploadDropzone } from '@components/upload-dropzone';

interface DropboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> {
	onChange: (...event: any[]) => void;
	aspect?: number;
	circularCrop?: boolean;
}
function Dropbox({ onChange, aspect = 1, circularCrop = false, ...props }: DropboxProps) {
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

	const handleComplete = (image: any) => {
		setCroppedImage(image);
		onChange(base64ToFile(image, props.name));
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				{croppedImage ? (
					<div className='space-y-4'>
						<Button onClick={handleReset} size='lg' type='button' variant='destructive'>
							<XIcon /> Reset
						</Button>
						<img alt='Cropped' className='w-full object-cover' src={croppedImage} />
					</div>
				) : (
					<Button>Change</Button>
				)}
			</DialogTrigger>
			{!croppedImage && (
				<DialogContent>
					<DialogTitle>Select {props.name}</DialogTitle>
					{!selectedFile ? (
						<UploadDropzone changeFile={handleFileChange} accept='image/*' />
					) : (
						!croppedImage && (
							<div>
								<ImageCrop circularCrop={circularCrop} aspect={aspect} file={selectedFile} maxImageSize={10485760 * 10485760} onCrop={handleComplete}>
									<ImageCropContent className='max-w-md' />
									<div className='flex items-center gap-2'>
										<ImageCropApply />
										<ImageCropReset />
										<Button onClick={handleReset} size='icon' type='button' variant='ghost'>
											<XIcon className='size-4' />
										</Button>
									</div>
								</ImageCrop>
							</div>
						)
					)}
				</DialogContent>
			)}
		</Dialog>
	);
}

export default Dropbox;
