import clsx from 'clsx';
import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { FaCheck } from 'react-icons/fa';

interface ButtonBaseProps {
	children: React.ReactNode;
	type: 'button' | 'submit';
	variant?: 'primary' | 'secondary' | 'danger';
	isLoading?: boolean;
	isDisabled?: boolean;
	isSuccess?: boolean;
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

const Button = ({ children, onPress, type, variant = 'primary', isLoading, isDisabled, isSuccess }: ButtonProps) => {
	const variants = {
		primary: 'bg-primary hover:bg-primary/50 active:bg-primary/10',
		secondary: 'bg-secondary hover:bg-secondary/50 active:bg-secondary/10 text-text-dark',
		danger: 'bg-danger hover:bg-danger/50 active:bg-danger/10',
	};
	return (
		<AriaButton
			type={type}
			className={clsx(
				'px-4 py-2 rounded outline-none h-10 transition-all flex items-center justify-center',
				variants[variant],
				isDisabled && 'opacity-50 pointer-events-none',
				isSuccess && 'bg-green-500',
			)}
			onPress={onPress}
			isDisabled={isDisabled}
		>
			<span
				className={clsx(
					'animate-spin w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full mr-2',
					isLoading ? 'block' : 'hidden',
				)}
			/>
			<span className={clsx('', isSuccess ? 'block' : 'hidden')}>
				<FaCheck />
			</span>
			<span className={clsx(isLoading || isSuccess ? 'hidden' : 'block')}>{children}</span>
		</AriaButton>
	);
};

export default Button;
