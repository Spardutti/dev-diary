import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCreateTodo } from '@/features/todos/api/todosQueries';
import PriorityBadge from '@/features/todos/components/PriorityBadge';
import { useParams } from '@tanstack/react-router';
import React, { useState } from 'react';

const CreateTodoForm = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [priority, setPriority] = useState(0);

	const { projectId } = useParams({ strict: false });

	const { mutateAsync: createTodo, isPending } = useCreateTodo();

	const onSave = async () => {
		await createTodo({
			title: todoTitle,
			projectId: projectId,
			description: '',
			priority,
			status: false,
		});

		setTodoTitle('');
		setIsOpen(false);
		setPriority(0);
	};

	const onEnter = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			await onSave();
		}
	};

	return (
		<div>
			<TooltipProvider>
				<Tooltip open={isOpen}>
					<TooltipTrigger className="w-full">
						<Textarea
							disabled={isPending}
							placeholder="What needs doing?"
							onKeyDown={onEnter}
							value={todoTitle}
							onChange={(e) => setTodoTitle(e.target.value)}
							onFocus={() => setIsOpen(true)}
							onBlur={() => setIsOpen(false)}
						/>
					</TooltipTrigger>
					<TooltipContent
						className="text-primary"
						side="top"
					>
						Press enter to save changes
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<div className="flex gap-1 items-end">
				<PriorityBadge
					priority={priority}
					setPriority={setPriority}
				/>

				<div className="flex justify-end flex-grow">
					<Button
						onClick={onSave}
						disabled={isPending || !todoTitle}
						isLoading={isPending}
						// className="bg-primary px-2.5 py-0.5 text-xs font-semibold rounded-md text-neutral-50 transition-colors  h-6"
						className="px-2 py-1 bg-gray-800 text-xs rounded border border-green-900/60 h-6 text-primary"
					>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateTodoForm;
