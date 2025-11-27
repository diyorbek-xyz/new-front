'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import ImageWithFallback from './image';

function Avatar({ className, ...props }: React.ComponentProps<'span'>) {
	return <span data-slot='avatar' className={cn('relative flex size-20 shrink-0 items-center justify-center rounded-full', className)} {...props} />;
}

function AvatarImage({ className, src, fallback = '/assets/images/AvatarPiece.png', alt = 'avatar-image', ...props }: React.ComponentProps<'img'> & { fallback?: string }) {
	return <ImageWithFallback data-slot='avatar-image' className={cn('aspect-square size-[85%] rounded-full', className)} alt={alt} src={src} fallback={fallback} {...props} />;
}

function AvatarDecoration({ className, src, fallback = '/assets/decorations/goto.png', alt = 'avatar-decoration', ...props }: React.ComponentProps<'img'> & { fallback?: string }) {
	return <ImageWithFallback data-slot='avatar-decoration' className={cn('absolute aspect-square size-full', className)} alt={alt} src={src} fallback={fallback} {...props} />;
}
export { Avatar, AvatarImage, AvatarDecoration };
