import clsx from 'clsx';
import { useState } from 'react';
import { Input as AriaInput } from 'react-aria-components';
interface InputProps {
	textSize: 'lg' | 'md' | '2xl';
	value?: string;
}

const textSizes = {
	'2xl': 'text-2xl',
	lg: 'text-lg',
	md: 'text-md',
};

const Input = ({ textSize, value }: InputProps) => {
	const [val, setVal] = useState(() => value);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVal(e.target.value);
	};

	return (
		<AriaInput
			value={val}
			className={clsx('bg-background-alt', textSizes[textSize])}
			onChange={onChange}
		/>
	);
};

export default Input;
