import type { ReactNode } from 'react';

interface HeadingProps {
	textSize: 'sm' | 'md' | 'lg' | '2xl';
	variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	children: ReactNode;
}

const Heading = ({ textSize, variant, children }: HeadingProps) => {
	const Tag = variant;

	const textSizeClass = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
		'2xl': 'text-2xl',
	}[textSize];

	return <Tag className={textSizeClass}>{children}</Tag>;
};

export default Heading;
