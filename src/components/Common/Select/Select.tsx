interface SelectProps {
	label?: string;
	placeholder?: string;
	options: { value: string; label: string }[];
	defaultValue?: string;
}

const Select = ({ label, placeholder, options, defaultValue }: SelectProps) => {
	return <p>s</p>;
};

export default Select;
