import type { ColumnDef } from '@tanstack/react-table';
import type { ITodo } from '@/features/todos/types/ITodo';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CogIcon, Pen, Trash2 } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { EditTodoContent } from '@/features/todos/components/EditTodoModal/EditTodoModal';
import { useState } from 'react';
import { DeleteTodoContent } from '@/features/todos/components/DeleteTodoModal/DeleteTodoModal';

export const todoColumns: ColumnDef<ITodo>[] = [
	{
		accessorKey: 'title',
		header: 'Description',
	},
	{
		accessorKey: 'date',
		header: 'Created',
	},
	{
		accessorKey: 'completed',
		header: () => <div className="flex justify-center">Completed</div>,
		cell: ({ row }) => {
			const completed = row.getValue('completed') as boolean;
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
							<CogIcon />
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
