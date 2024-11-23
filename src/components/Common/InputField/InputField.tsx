import Input from '@/components/Common/Input/Input';
import Label from '@/components/Common/Label';

interface InputFieldProps {
	children: string;
	name: string;
	value?: string;
	onChange?: () => void;
	placeholder?: string;
	type?: 'text' | 'number' | 'password';
	autoComplete?: 'current-password' | 'new-password' | 'username';
}

const InputField = ({ children, name, value, onChange, placeholder, type = 'text', autoComplete }: InputFieldProps) => {
	return (
		<div className="flex flex-col ">
			<Label>{children}</Label>
			<Input
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				type={type}
				autoComplete={autoComplete}
			/>
		</div>
	);
};

export default InputField;
