import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateTodo } from '@/features/todos/api/todosQueries';
import type { ITodo } from '@/features/todos/types/ITodo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface EditTodoFormProps {
	todo: ITodo;
	setOpen: (open: boolean) => void;
}

const formSchema = z.object({
	title: z.string({ message: 'description is required' }),
});

const EditTodoForm = ({ todo, setOpen }: EditTodoFormProps) => {
	const { mutateAsync: updateTodo, isPending } = useUpdateTodo();

	const onUpdate = async (data: z.infer<typeof formSchema>) => {
		await updateTodo({ id: todo.id, project: todo.project, title: data.title });
		setOpen(false);
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: todo.title,
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onUpdate)}>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									placeholder="Title"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex gap-2 justify-end">
					<Button
						onClick={() => setOpen(false)}
						disabled={isPending}
						variant="ghost"
						type="button"
					>
						Cancel
					</Button>

					<Button
						isLoading={isPending}
						disabled={isPending}
						type="submit"
					>
						Save
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default EditTodoForm;
