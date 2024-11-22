import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Heading as AriaHeading } from 'react-aria-components';

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
		<AriaHeading
			className={clsx(textSizeClass)}
			level={variant}
		>
			{children}
		</AriaHeading>
	);
};

export default Heading;
