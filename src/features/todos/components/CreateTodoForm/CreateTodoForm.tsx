import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCreateTodo } from '@/features/todos/api/todosQueries';
import { useParams } from '@tanstack/react-router';
import React, { useState } from 'react';

const CreateTodoForm = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	const { projectId } = useParams({ strict: false });

	const { mutateAsync: createTodo, isPending } = useCreateTodo();

	const onEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			await createTodo({
				title: todoTitle,
				projectId: projectId,
				description: '',
				priority: 0,
				status: false,
			});

			setTodoTitle('');
			setIsOpen(false);
		}
	};

	return (
		<div>
			<TooltipProvider>
				<Tooltip open={isOpen}>
					<TooltipTrigger asChild>
						<Input
							disabled={isPending}
							placeholder="What needs doing?"
							onKeyDown={onEnter}
							value={todoTitle}
							onChange={(e) => setTodoTitle(e.target.value)}
							onFocus={() => setIsOpen(true)}
							onBlur={() => setIsOpen(false)}
						/>
					</TooltipTrigger>
					<TooltipContent>Press enter to save changes</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export default CreateTodoForm;
