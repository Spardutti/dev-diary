import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useCreateTodo, useUpdateTodo } from '@/features/todos/api/todosQueries';
import type { ITodo } from '@/features/todos/types/ITodo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import PriorityBadge from '../PriorityBadge';
import { Input } from '@/components/ui/input';
import { useParams } from '@tanstack/react-router';
import { Checkbox } from '@/components/ui/checkbox';
import DateSelector from '@/components/Common/DateSelector';

interface EditTodoFormProps {
	todo: ITodo | null;
	setOpen: (open: boolean) => void;
}

const getDefaultValues = (todo: ITodo | null) => {
	if (todo) {
		return {
			title: todo.title,
			description: todo.description,
			priority: todo.priority,
			isCompleted: todo.status,
			completedAt: todo.completedAt,
		};
	}
	return {
		title: '',
		description: '',
		priority: 0,
		isCompleted: false,
		completedAt: null,
	};
};

const formSchema = z
	.object({
		title: z.string({ message: 'Title is required' }).min(1, 'Title is required'),
		description: z.string().optional(),
		priority: z.number({ message: 'Priority is required' }),
		isCompleted: z.boolean(),
		completedAt: z.date().nullable(),
		createdAt: z.date(),
	})
	.superRefine((data, ctx) => {
		if (data.isCompleted) {
			if (!data.completedAt) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'You have to select a completion date.',
					path: ['completedAt'],
				});
			} else if (data.createdAt > data.completedAt) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'The completion date cannot be older than the creation date.',
					path: ['completedAt'],
				});
			}
		}
	});

const EditTodoForm = ({ todo, setOpen }: EditTodoFormProps) => {
	const { mutateAsync: updateTodo, isPending } = useUpdateTodo();
	const { mutateAsync: createTodo, isPending: isPendingCreate } = useCreateTodo();
	const { projectId } = useParams({ strict: false });

	const onUpsert = async (data: z.infer<typeof formSchema>) => {
		if (todo) {
			await updateTodo({
				id: todo.id,
				projectId: todo.projectId,
				title: data.title,
				description: data.description,
				priority: data.priority,
				status: data.isCompleted,
			});
		} else {
			await createTodo({
				title: data.title,
				projectId: projectId,
				description: data.description,
				priority: data.priority,
				status: data.isCompleted,
				createdAt: data.createdAt ?? null,
				completedAt: data.isCompleted ? data.completedAt : null,
			});
		}
		setOpen(false);
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: getDefaultValues(todo),
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onUpsert)}
				className="flex flex-col gap-5"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
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
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Description"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="priority"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="flex flex-col justify-center">Priority</FormLabel>
							<FormControl>
								<div className="flex gap-1">
									<PriorityBadge
										priority={field.value}
										setPriority={(v) => field.onChange(v)}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<CreateSelectDate form={form} />
				<CompletedSelectDate form={form} />

				<div className="flex gap-2 justify-end">
					<Button
						onClick={() => setOpen(false)}
						disabled={todo ? isPending : isPendingCreate}
						variant="ghost"
						type="button"
					>
						Cancel
					</Button>

					<Button
						isLoading={todo ? isPending : isPendingCreate}
						disabled={todo ? isPending : isPendingCreate}
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

interface SelectDateProps {
	form: UseFormReturn<z.infer<typeof formSchema>>;
}

const CreateSelectDate = ({ form }: SelectDateProps) => {
	return (
		<FormField
			control={form.control}
			name="createdAt"
			render={({ field }) => (
				<FormItem className="space-y-2">
					<div className="flex items-center gap-2">
						<FormLabel className="shrink-0">Select a creation date</FormLabel>
						<div className="border-t border-primary/50 w-full" />
					</div>
					<FormControl>
						<DateSelector
							date={field.value ?? undefined}
							setDate={field.onChange}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

const CompletedSelectDate = ({ form }: SelectDateProps) => {
	return (
		<div className="flex flex-col gap-3">
			<FormField
				control={form.control}
				name="isCompleted"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<div className="flex items-center gap-2">
								<Checkbox
									checked={field.value}
									onCheckedChange={(checked) => {
										field.onChange(checked);
										if (!checked) {
											form.setValue('completedAt', null); // Clear the date when unchecked
										}
									}}
								/>
								<FormLabel>Completed todo</FormLabel>
							</div>
						</FormControl>
					</FormItem>
				)}
			/>
			{form.watch('isCompleted') ? (
				<FormField
					control={form.control}
					name="completedAt"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<div className="flex items-center gap-2">
								<FormLabel className="shrink-0">Select a completed date</FormLabel>
								<div className="border-t border-primary/50 w-full" />
							</div>

							<FormControl>
								<DateSelector
									date={field.value ?? undefined}
									setDate={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			) : null}
		</div>
	);
};
