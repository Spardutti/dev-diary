import React from 'react';
import { Button as AriaButton } from 'react-aria-components';

interface ButtonProps {
	children: React.ReactNode;
	onPress: () => void;
}

const Button = ({ children, onPress }: ButtonProps) => {
	return (
		<AriaButton
			className="bg-primary px-2 py-1 rounded outline-none hover:bg-primary/50 transition-all active:bg-primary/10"
			onPress={onPress}
		>
			{children}
		</AriaButton>
	);
};

export default Button;
