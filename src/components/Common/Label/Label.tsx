import type { ReactNode } from '@tanstack/react-router';

interface LabelProps {
	children: ReactNode;
}

const Label = ({ children }: LabelProps) => {
	return <label>{children}</label>;
};

export default Label;
