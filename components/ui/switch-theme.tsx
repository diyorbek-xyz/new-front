'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<Button onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')} size='icon' className='**:size-6!'>
			{theme == 'light' ? <Sun /> : <Moon />}
		</Button>
	);
}
