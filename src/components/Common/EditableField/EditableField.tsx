import { Input } from '@/components/ui/input';
import type { ChangeEvent } from 'react';
import React, { useState, useEffect } from 'react';

interface EditableFieldProps {
	value: string;
	onChange?: (newValue: string) => void;
	name?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange, name = 'editableField' }) => {
	const [localValue, setLocalValue] = useState(value);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setLocalValue(value);
	}, [value]);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setLocalValue(newValue);

		if (onChange) {
			onChange(newValue);
		}
	};

	return (
		<div className="w-full">
			{isEditing ? (
				<Input
					name={name}
					type="text"
					value={localValue}
					onBlur={() => setIsEditing(false)}
					onChange={handleInputChange}
				/>
			) : (
				<div
					role="button"
					tabIndex={0}
					className="bg-background-alt px-4 py-2 cursor-pointer rounded outline-none focus:bg-background-alt/10 text-text transition-all focus:ring-1 ring-primary hover:ring-1"
					onClick={() => setIsEditing(true)}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') setIsEditing(true);
					}}
				>
					{localValue}
				</div>
			)}
		</div>
	);
};

export default EditableField;
