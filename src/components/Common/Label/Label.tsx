import type { ReactNode } from '@tanstack/react-router';
import { Label as AriaLabel } from 'react-aria-components';

interface LabelProps {
	children: ReactNode;
}

const Label = ({ children }: LabelProps) => {
	return <AriaLabel>{children}</AriaLabel>;
};

export default Label;
