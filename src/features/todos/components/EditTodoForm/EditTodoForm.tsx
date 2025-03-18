import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useUpdateTodo } from '@/features/todos/api/todosQueries';
import type { ITodo } from '@/features/todos/types/ITodo';
import { zodResolver } from '@hookform/resolvers/zod';
import { SelectValue } from '@radix-ui/react-select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface EditTodoFormProps {
	todo: ITodo;
	setOpen: (open: boolean) => void;
}

const formSchema = z.object({
	title: z.string({ message: 'description is required' }),
	priority: z.number({ message: 'priority is required' }),
});

const EditTodoForm = ({ todo, setOpen }: EditTodoFormProps) => {
	const { mutateAsync: updateTodo, isPending } = useUpdateTodo();

	const onUpdate = async (data: z.infer<typeof formSchema>) => {
		await updateTodo({ id: todo.id, projectId: todo.projectId, title: data.title, priority: data.priority });
		setOpen(false);
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: todo.title,
			priority: todo.priority,
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onUpdate)}
				className="flex flex-col gap-2"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Title"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="priority"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Priority</FormLabel>
							<FormControl>
								<Select
									onValueChange={(value) => field.onChange(Number(value))}
									value={field.value.toString()}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="0">Default</SelectItem>
										<SelectItem value="1">Low</SelectItem>
										<SelectItem value="2">Medium</SelectItem>
										<SelectItem value="3">High</SelectItem>
									</SelectContent>
								</Select>
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
