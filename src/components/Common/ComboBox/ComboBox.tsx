import Input from '@/components/Common/Input';
import Popover from '@/components/Common/Popover';
import { ComboBox as AriaComboBox, Button, Label, ListBox, ListBoxItem } from 'react-aria-components';

interface ComboBoxProps {
	label?: string;
	size?: 'lg' | 'md' | '2xl';
	value: string;
	options: { label: string; value: string }[];
}

const ComboBox = ({ label, size = 'md', value, options }: ComboBoxProps) => {
	console.log('options:', options);
	return (
		<AriaComboBox>
			{label && <Label>Favorite Animal</Label>}
			<div>
				<Input
					value={value}
					textSize={size}
				/>
				<Button>▼</Button>
			</div>
			<Popover>
				<ListBox>
					{options?.map(({ label, value }) => (
						<ListBoxItem key={value}>{label}</ListBoxItem>
					))}
				</ListBox>
			</Popover>
		</AriaComboBox>
	);
};

export default ComboBox;
