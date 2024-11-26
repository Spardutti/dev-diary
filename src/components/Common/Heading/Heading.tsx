import clsx from 'clsx';
import type { ReactNode } from 'react';

interface HeadingProps {
	textSize: 'sm' | 'md' | 'lg' | '2xl';
	variant: 1 | 2 | 3 | 4 | 5 | 6;
	children: ReactNode;
}

const Heading = ({ textSize, variant, children }: HeadingProps) => {
	const textSizeClass = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
		'2xl': 'text-2xl',
	}[textSize];

	return (
		<h1
			className={clsx(textSizeClass)}
			level={variant}
		>
			{children}
		</h1>
	);
};

export default Heading;
