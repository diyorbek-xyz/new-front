'use client';
import React, { useEffect, useState } from 'react';

const texts = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

export default function Cursor() {
	const [position, setPosition] = useState<React.CSSProperties>();
	const [dotPosition, setDotPosition] = useState<React.CSSProperties>();
	useEffect(() => {
		function move(e: MouseEvent) {
			const el = e.target as HTMLElement;
			let button;
			let text;

			if (el.className.includes('cursor-button') || el.tagName == 'BUTTON') {
				button = el.getBoundingClientRect();
			}
			if (el.className.includes('cursor-text') || texts.includes(el.tagName)) {
				text = el.getBoundingClientRect();
			}

			setDotPosition({ left: e.clientX, top: e.clientY, display: text ? 'none' : '' });
			setPosition({
				left: button?.x != undefined ? button.x - 5 : e.clientX,
				top: button?.y != undefined ? button.y - 5 : e.clientY,
				width: text ? 0 : button?.width != undefined ? button?.width + 10 : 20,
				height: button?.height != undefined ? button?.height + 10 : 20,
				translate: button ? 0 : '-50% -50%',
				borderRadius: button ? 2 : 2,
			});
		}
		window.addEventListener('mousemove', move);
		return () => {
			window.removeEventListener('mousemove', move);
		};
	}, [position, dotPosition]);

	return (
		<>
			<div className='pointer-events-none! fixed z-50 size-1.5 -translate-1/2 rounded-xs bg-white transition-all duration-75 ease-out' style={dotPosition}></div>
			<div className='pointer-events-none! fixed z-50 border border-white transition-all duration-100 ease-out' style={position}>
				<div className='absolute -top-1 -left-1 size-1.5 rounded-xs bg-white'></div>
				<div className='absolute -top-1 -right-1 size-1.5 rounded-xs bg-white'></div>
				<div className='absolute -bottom-1 -left-1 size-1.5 rounded-xs bg-white'></div>
				<div className='absolute -right-1 -bottom-1 size-1.5 rounded-xs bg-white'></div>
			</div>
		</>
	);
}
