import { Input } from '@/components/ui/input';
import { useCreateTodo } from '@/features/todos/api/todosQueries';
import { useParams } from '@tanstack/react-router';
import React, { useState } from 'react';

const CreateTodoForm = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const { projectId } = useParams({ strict: false });
	const { mutateAsync: createTodo } = useCreateTodo();

	const onEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			await createTodo({
				title: todoTitle,
				projectId: projectId,
				description: '',
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
