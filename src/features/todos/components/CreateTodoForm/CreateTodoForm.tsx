import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useCreateTodo } from '@/features/todos/api/todosQueries';
import { cn } from '@/lib/utils';
import { useParams } from '@tanstack/react-router';
import React, { useState } from 'react';

const CreateTodoForm = () => {
	const [todoTitle, setTodoTitle] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [priority, setPriority] = useState(0);

	const { projectId } = useParams({ strict: false });

	const { mutateAsync: createTodo, isPending } = useCreateTodo();

	const onEnter = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
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
						>
							<p>hello</p>
						</Textarea>
					</TooltipTrigger>
					<TooltipContent side="top">Press enter to save changes</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<div className="flex gap-1 items-end">
				<PriorityBadge
					priority={priority}
					setPriority={setPriority}
				/>
			</div>
		</div>
	);
};

export default CreateTodoForm;

const PriorityBadge = ({ priority, setPriority }: { priority: number; setPriority: (v: number) => void }) => {
	const config = {
		0: 'default',
		1: 'low',
		2: 'mid',
		3: 'high',
	};

	const colors: Record<number, string> = {
		0: 'bg-background',
		1: 'bg-priority-low',
		2: 'bg-priority-mid',
		3: 'bg-priority-high',
	};

	return Object.entries(config).map(([key, value]) => (
		<Badge
			onClick={() => setPriority(Number(key))}
			key={key}
			className={cn('cursor-pointer', colors[Number(key)], Number(key) === priority && 'ring-primary ring-2')}
		>
			{value}
		</Badge>
	));
};
