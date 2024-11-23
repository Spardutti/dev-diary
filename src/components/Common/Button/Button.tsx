import clsx from 'clsx';
import React from 'react';
import { Button as AriaButton } from 'react-aria-components';

interface ButtonBaseProps {
	children: React.ReactNode;
	type: 'button' | 'submit';
	variant?: 'primary' | 'secondary' | 'danger';
}

interface ButtonWithOnPress extends ButtonBaseProps {
	type: 'button';
	onPress: () => void;
}

interface ButtonWithoutOnPress extends ButtonBaseProps {
	type: 'submit';
	onPress?: never;
}

type ButtonProps = ButtonWithOnPress | ButtonWithoutOnPress;

const Button = ({ children, onPress, type, variant = 'primary' }: ButtonProps) => {
	const variants = {
		primary: 'bg-primary hover:bg-primary/50 active:bg-primary/10',
		secondary: 'bg-secondary hover:bg-secondary/50 active:bg-secondary/10 text-text-dark',
		danger: 'bg-danger hover:bg-danger/50 active:bg-danger/10',
	};
	return (
		<AriaButton
			type={type}
			className={clsx('px-4 py-2 rounded outline-none transition-all', variants[variant])}
			onPress={onPress}
		>
			{children}
		</AriaButton>
	);
};

export default Button;
