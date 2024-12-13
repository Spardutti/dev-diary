import { Dialog, DialogContent } from '@/components/ui/dialog';
import EditTodoForm from '@/features/todos/components/EditTodoForm';
import type { ITodo } from '@/features/todos/types/ITodo';
import { DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { Pen } from 'lucide-react';
import { useState } from 'react';

interface EditTodoModalProps {
	todo: ITodo;
}
const EditTodoModal = ({ todo }: EditTodoModalProps) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogTrigger>
				<Pen className="text-primary size-4" />
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Edit Todo</DialogTitle>
				<DialogDescription>edit the description</DialogDescription>
				<EditTodoForm
					todo={todo}
					setOpen={setOpen}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default EditTodoModal;
