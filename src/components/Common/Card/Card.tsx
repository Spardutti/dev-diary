import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
	children: ReactNode;
	className?: string;
}

const Card = ({ children, className }: CardProps) => {
	return <div className={clsx(' p-4 rounded shadow bg-muted-teal', className)}> {children}</div>;
};

export default Card;
