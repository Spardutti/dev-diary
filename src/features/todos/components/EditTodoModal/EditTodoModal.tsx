import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EditTodoForm from '@/features/todos/components/EditTodoForm';
import type { ITodo } from '@/features/todos/types/ITodo';
import { cn } from '@/lib/utils';
import { Pen } from 'lucide-react';
import { useState } from 'react';

interface EditTodoModalProps {
	todo: ITodo;
	triggerClassName?: string;
}

export const EditTodoContent = ({ todo, setOpen }: { todo: ITodo; setOpen: (open: boolean) => void }) => (
	<DialogContent>
		<DialogTitle>Edit Todo</DialogTitle>
		<DialogDescription>edit the description</DialogDescription>
		<EditTodoForm
			todo={todo}
			setOpen={setOpen}
		/>
	</DialogContent>
);

const EditTodoModal = ({ todo, triggerClassName }: EditTodoModalProps) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogTrigger>
				<Pen className={cn('text-primary size-4', triggerClassName)} />
			</DialogTrigger>
			<EditTodoContent
				todo={todo}
				setOpen={setOpen}
			/>
		</Dialog>
	);
};

export default EditTodoModal;
