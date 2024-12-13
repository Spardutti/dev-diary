import { Input } from '@/components/ui/input';
import { useCreateTodo } from '@/features/todos/api/todos';
import { useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import React, { useState } from 'react';

const CreateTodoForm = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const { projectId } = useParams({ strict: false });
	const { mutateAsync: createTodo } = useCreateTodo();

	const onEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			await createTodo({
				title: todoTitle,
				project: projectId,
				date: dayjs().format('YYYY-MM-DD'),
			});

			setTodoTitle('');
		}
	};

	return (
		<div>
			<Input
				placeholder="What needs doing?"
				onKeyDown={onEnter}
				value={todoTitle}
				onChange={(e) => setTodoTitle(e.target.value)}
			/>
		</div>
	);
};

export default CreateTodoForm;
