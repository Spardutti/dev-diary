import type { ReactNode } from 'react';

interface DialogProps {
	trigger: ReactNode;
	children: ReactNode;
}

const Dialog = ({ children, trigger }: DialogProps) => {
	return <p>a</p>;
};

export default Dialog;
