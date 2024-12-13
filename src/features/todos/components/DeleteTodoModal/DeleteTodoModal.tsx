import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { useDeleteTodo } from '@/features/todos/api/todos';
import type { ITodo } from '@/features/todos/types/ITodo';
import { DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeleteTodoModalProps {
	todo: ITodo;
}
const DeleteTodoModal = ({ todo }: DeleteTodoModalProps) => {
	const [open, setOpen] = useState<boolean>(false);
	const { mutateAsync: deleteTodo, isPending } = useDeleteTodo();

	const onDelete = async () => {
		await deleteTodo({ id: todo.id, project: todo.project });
		setOpen(false);
	};
	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogTrigger>
				<Trash2 className="text-danger size-4" />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Delete Todo</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete <span className="font-bold">&quot;{todo.title}&quot;</span> ? This action is
					permanent!
				</DialogDescription>

				<div className="flex gap-2 justify-end">
					<DialogClose asChild>
						<Button
							disabled={isPending}
							variant="ghost"
						>
							Cancel
						</Button>
					</DialogClose>

					<Button
						isLoading={isPending}
						disabled={isPending}
						variant="destructive"
						onClick={onDelete}
					>
						Yes, Delete!
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteTodoModal;
