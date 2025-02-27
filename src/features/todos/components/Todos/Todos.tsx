import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTodos, useUpdateTodo } from '@/features/todos/api/todosQueries';
import CreateTodoForm from '@/features/todos/components/CreateTodoForm';
import DeleteTodoModal from '@/features/todos/components/DeleteTodoModal';
import EditTodoModal from '@/features/todos/components/EditTodoModal';
import { todoPriorityColors } from '@/features/todos/types/ITodo';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { cn } from '@/lib/utils';
import { useParams } from '@tanstack/react-router';

export const todosFilterQuery = (projectId: string) =>
	`status=false&projectId=${projectId}&orderBy=priority,createdAt&limit=12`;

const Todos = () => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/dashboard' });

	const {
		data: todos,
		isPending,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	} = useGetTodos(todosFilterQuery(projectId));

	const { mutateAsync: updateTodo, isPending: isUpdating } = useUpdateTodo();

	const onUpdate = async ({ id, status }: { id: string; status: boolean }) => {
		await updateTodo({ id, status: !status });
	};

	const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

	if (isPending) {
		return (
			<aside className=" md:w-[400px] w-full border-l border-l-separator bg-background">
				<div className="p-4 flex flex-grow flex-col h-full">
					<h2 className="mb-4 text-lg font-semibold">Unfinished Business</h2>
					<div className="flex flex-col gap-4 flex-grow ">
						<Skeleton className="h-[80px] w-full" />
						<div className="flex gap-1">
							{Array.from({ length: 3 }).map((_, i) => (
								<Skeleton
									key={i}
									className="h-5 w-10"
								/>
							))}
							<div className="ml-auto">
								<Skeleton className="h-5 w-10" />
							</div>
						</div>
						{Array.from({ length: 3 }).map((_, i) => (
							<Skeleton
								key={i}
								className="h-14 w-full"
							/>
						))}
					</div>
				</div>
			</aside>
		);
	}

	if (!todos) return <p>No Data</p>;

	return (
		<aside className="md:w-[400px] w-full border-l border-l-separator bg-background">
			<div className="p-4 flex flex-grow flex-col h-full">
				<h2 className="mb-4 text-lg font-semibold">Unfinished Business</h2>
				<div className="flex flex-col gap-4 flex-grow ">
					<CreateTodoForm />
					<ScrollArea className="flex-grow md:h-0 h-[320px]">
						<ul className="space-y-2">
							{todos.map((todo) => (
								<li
									key={todo.id}
									className={cn(
										'group flex items-center justify-between p-3 rounded-lg',
										todoPriorityColors[todo.priority as keyof typeof todoPriorityColors],
									)}
								>
									<div className="flex items-center gap-3">
										<Checkbox
											className={cn(todo.priority === 1 && 'border-background')}
											disabled={isUpdating}
											checked={todo.status}
											onClick={() => onUpdate({ id: todo.id, status: todo.status })}
										/>
										<span className="text-sm">{todo.title}</span>
									</div>
									<div className="flex items-center gap-2 w-10 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
										<EditTodoModal
											todo={todo}
											triggerClassName={todo.priority > 0 ? 'text-text' : ''}
										/>
										<DeleteTodoModal todo={todo} />
									</div>
								</li>
							))}
						</ul>
						{isFetchingNextPage && (
							<div className="flex flex-col gap-2 mt-2">
								{Array.from({ length: 3 }).map((_, i) => (
									<Skeleton
										key={i}
										className="h-14 w-full"
									/>
								))}
							</div>
						)}
						<div ref={observerRef} />
					</ScrollArea>
				</div>
			</div>
		</aside>
	);
};

export default Todos;
