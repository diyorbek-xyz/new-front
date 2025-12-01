'use client';

import { Button } from '@components/ui/button';
import { CheckIcon, CropIcon, RotateCcwIcon } from 'lucide-react';
import { type ComponentProps, type CSSProperties, createContext, type MouseEvent, type ReactNode, type RefObject, type SyntheticEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, type PercentCrop, type PixelCrop, type ReactCropProps } from 'react-image-crop';
import { cn } from '@/lib/utils';

import 'react-image-crop/dist/ReactCrop.css';

const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number | undefined): PercentCrop => centerCrop(aspect ? makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight) : { x: 0, y: 0, width: 90, height: 90, unit: '%' }, mediaWidth, mediaHeight);

type ImageCropContextType = {
	file: File;
	imgSrc: string;
	crop: PercentCrop | undefined;
	completedCrop: PixelCrop | null;
	imgRef: RefObject<HTMLImageElement | null>;
	onCrop?: (croppedImage: PixelCrop, file: File) => void;
	reactCropProps: Omit<ReactCropProps, 'onChange' | 'onComplete' | 'children'>;
	handleChange: (pixelCrop: PixelCrop, percentCrop: PercentCrop) => void;
	handleComplete: (pixelCrop: PixelCrop, percentCrop: PercentCrop) => Promise<void>;
	onImageLoad: (e: SyntheticEvent<HTMLImageElement>) => void;
	applyCrop: () => Promise<void>;
	resetCrop: () => void;
};

const ImageCropContext = createContext<ImageCropContextType | null>(null);

const useImageCrop = () => {
	const context = useContext(ImageCropContext);
	if (!context) throw new Error('ImageCrop components must be used within ImageCrop');
	return context;
};

export type ImageCropProps = {
	file: File;
	onCrop?: (croppedImage: PixelCrop, file: File) => void;
	children: ReactNode;
	onChange?: ReactCropProps['onChange'];
	onComplete?: ReactCropProps['onComplete'];
} & Omit<ReactCropProps, 'onChange' | 'onComplete' | 'children'>;

export const ImageCrop = ({ file, onCrop, children, ...reactCropProps }: ImageCropProps) => {
	const imgRef = useRef<HTMLImageElement | null>(null);
	const [imgSrc, setImgSrc] = useState<string>('');
	const [crop, setCrop] = useState<PercentCrop>();
	const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
	const [initialCrop, setInitialCrop] = useState<PercentCrop>();

	useEffect(() => {
		const reader = new FileReader();
		reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
		reader.readAsDataURL(file);
	}, [file]);

	const onImageLoad = useCallback(
		(e: SyntheticEvent<HTMLImageElement>) => {
			const { width, height } = e.currentTarget;
			const newCrop = centerAspectCrop(width, height, reactCropProps.aspect);
			setCrop(newCrop);
			setInitialCrop(newCrop);
		},
		[reactCropProps.aspect],
	);

	function handleChange(pixelCrop: PixelCrop, percentCrop: PercentCrop) {
		setCrop(percentCrop);
	}

	async function handleComplete(pixelCrop: PixelCrop) {
		setCompletedCrop(pixelCrop);
	}

	async function applyCrop() {
		if (!(imgRef.current && completedCrop)) return;
		console.log(completedCrop);
		onCrop?.(completedCrop, file);
	}

	async function resetCrop() {
		if (initialCrop) {
			setCrop(initialCrop);
			setCompletedCrop(null);
		}
	}

	const contextValue: ImageCropContextType = { file, imgSrc, crop, completedCrop, imgRef, onCrop, reactCropProps, handleChange, handleComplete, onImageLoad, applyCrop, resetCrop };

	return <ImageCropContext.Provider value={contextValue}>{children}</ImageCropContext.Provider>;
};

export const ImageCropContent = ({ style, className }: { style?: CSSProperties; className?: string }) => {
	const { imgSrc, crop, handleChange, handleComplete, onImageLoad, imgRef, reactCropProps } = useImageCrop();

	const shadcnStyle = {
		'--rc-border-color': 'var(--color-border)',
		'--rc-focus-color': 'var(--color-primary)',
	} as CSSProperties;

	return (
		<ReactCrop className={cn('max-h-[277px] max-w-full', className)} crop={crop} onChange={handleChange} onComplete={handleComplete} style={{ ...shadcnStyle, ...style }} {...reactCropProps}>
			{imgSrc && <img alt='crop' className='size-full' onLoad={onImageLoad} ref={imgRef} src={imgSrc} />}
		</ReactCrop>
	);
};

export const ImageCropApply = ({ children, onClick, ...props }: ComponentProps<'button'> & { asChild?: boolean }) => {
	const { applyCrop } = useImageCrop();

	const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
		await applyCrop();
		onClick?.(e);
	};

	return (
		<Button onClick={handleClick} type='button' size='icon' variant='ghost' {...props}>
			{children ?? <CheckIcon className='size-7' />}
		</Button>
	);
};

export const ImageCropReset = ({ children, onClick, ...props }: ComponentProps<'button'>) => {
	const { resetCrop } = useImageCrop();

	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		resetCrop();
		onClick?.(e);
	};

	return (
		<Button onClick={handleClick} type='button' size='icon' variant='ghost' {...props}>
			{children ?? <RotateCcwIcon className='size-6' />}
		</Button>
	);
};
