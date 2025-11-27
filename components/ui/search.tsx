'use client';

import React from 'react';
import { Input } from './input';

export default function Search(props: React.ComponentProps<'input'>) {
    
	return (
		<div>
			<Input className='box-content rounded-full px-7! py-2! text-xl!' type='text' placeholder='Search anime' {...props} />
			<h5>Found </h5>
		</div>
	);
}
