import { Button, Label, ListBox, ListBoxItem, Popover, Select as AriaSelect, SelectValue } from 'react-aria-components';

interface SelectProps {
	label?: string;
	placeholder?: string;
	options: { value: string; label: string }[];
	defaultValue?: string;
}

const Select = ({ label, placeholder, options, defaultValue }: SelectProps) => {
	return (
		<AriaSelect
			placeholder={placeholder}
			defaultSelectedKey={defaultValue?.toString()}
		>
			{label && <Label>{label}</Label>}
			<Button>
				<SelectValue />
				<span aria-hidden="true">▼</span>
			</Button>
			<Popover>
				<ListBox>
					{options.map(({ label, value }) => (
						<ListBoxItem
							key={value.toString()}
							id={value.toString()}
						>
							{label}
						</ListBoxItem>
					))}
				</ListBox>
			</Popover>
		</AriaSelect>
	);
};

export default Select;
