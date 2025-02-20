import type { ColumnDef } from '@tanstack/react-table';
import { todoPriorityColors, type ITodo } from '@/features/todos/types/ITodo';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pen, Settings, Trash2 } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EditTodoContent } from '@/features/todos/components/EditTodoModal/EditTodoModal';
import { useState } from 'react';
import { DeleteTodoContent } from '@/features/todos/components/DeleteTodoModal/DeleteTodoModal';
import { formatDate } from '@/lib/dayjs/utils';
import { cn } from '@/lib/utils';

export const todoColumns: ColumnDef<ITodo>[] = [
	{
		accessorKey: 'title',
		header: 'Description',
	},
	{
		accessorKey: 'createdAt',
		header: 'Created',
		cell: ({ row }) => {
			const date = row.original.createdAt;
			return <span>{formatDate(date)}</span>;
		},
	},
	{
		accessorKey: 'completedAt',
		header: 'Completed',
		cell: ({ row }) => {
			const date = row.original.completedAt;
			if (date) {
				return <span>{formatDate(date)}</span>;
			}
		},
	},
	{
		accessorKey: 'status',
		header: () => <div className="flex justify-center">Completed</div>,
		cell: ({ row }) => {
			const completed = row.original.status;
			return (
				<div className="flex justify-center">
					<Badge variant={completed ? 'secondary' : 'destructive'}>{completed ? 'Done' : 'Pending'}</Badge>
				</div>
			);
		},
	},
	{
		accessorKey: 'priority',
		header: 'Priority',
		cell: ({ row }) => {
			const priority = row.original.priority;
			return (
				<div className="flex justify-start">
					<Badge className={cn('text-text', todoPriorityColors[priority as keyof typeof todoPriorityColors])}>
						{priority === 0 ? 'Low' : priority === 1 ? 'Medium' : 'High'}
					</Badge>
				</div>
			);
		},
	},

	{
		id: 'actions',
		cell: ({ row }) => {
			const [open, setOpen] = useState<boolean>(false);
			const [dialogContent, setDialogContent] = useState<'delete' | 'edit'>('edit');
			const todo = row.original;

			return (
				<Dialog
					onOpenChange={setOpen}
					open={open}
				>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Settings />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<DialogTrigger
									className="flex gap-2 items-center w-full"
									onClick={() => setDialogContent('edit')}
								>
									<Pen className="size-4" />
									Edit Todo
								</DialogTrigger>
							</DropdownMenuItem>

							<DialogTrigger className="flex gap-2 items-center w-full">
								<DropdownMenuItem
									className="focus:bg-danger focus:text-white transition-colors"
									onClick={() => setDialogContent('delete')}
								>
									<Trash2 className="size-4" /> Delete Todo
								</DropdownMenuItem>
							</DialogTrigger>
						</DropdownMenuContent>
					</DropdownMenu>

					{dialogContent === 'edit' && (
						<EditTodoContent
							setOpen={setOpen}
							todo={todo}
						/>
					)}

					{dialogContent === 'delete' && (
						<DeleteTodoContent
							todo={todo}
							setOpen={setOpen}
						/>
					)}
				</Dialog>
			);
		},
	},
];
