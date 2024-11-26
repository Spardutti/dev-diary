import clsx from 'clsx';
interface InputProps {
	value?: string;
	name: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type: 'text' | 'number' | 'password';
	autoComplete?: 'current-password' | 'new-password' | 'username';
	onBlur?: () => void;
}

const Input = ({ value, placeholder, onChange, name, type, autoComplete, onBlur }: InputProps) => {
	return (
		<input
			type={type}
			name={name}
			placeholder={placeholder}
			value={value}
			autoComplete={autoComplete}
			onBlur={onBlur}
			className={clsx(
				'bg-background-alt px-4 py-2 rounded outline-none focus-within:bg-background-alt/10 text-text transition-all focus-within:ring-1 ring-primary hover:ring-1',
			)}
			onChange={onChange}
		/>
	);
};

export default Input;
