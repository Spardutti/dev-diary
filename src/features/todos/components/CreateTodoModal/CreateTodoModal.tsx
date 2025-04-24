import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import EditTodoForm from '@/features/todos/components/EditTodoForm';
import { useState } from 'react';

const CreateTodoModal = () => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger>
				<Button>New To-Do</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Create a new Todo</DialogTitle>
				<DialogDescription>Create a new Todo for past, present or future days.</DialogDescription>
				<EditTodoForm
					todo={null}
					setOpen={setOpen}
				/>
			</DialogContent>
		</Dialog>
	);
};
export default CreateTodoModal;
