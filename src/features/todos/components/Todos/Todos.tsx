import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetTodos, useUpdateTodo } from '@/features/todos/api/todos';
import CreateTodoForm from '@/features/todos/components/CreateTodoForm';
import DeleteTodoModal from '@/features/todos/components/DeleteTodoModal';
import EditTodoModal from '@/features/todos/components/EditTodoModal';
import { formatPaginationList } from '@/features/utils/formatPaginationList';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useParams } from '@tanstack/react-router';
import { useRef } from 'react';

const Todos = () => {
	const { projectId } = useParams({ strict: false });
	const {
		data: todos,
		fetchNextPage,
		hasNextPage,
		isPending,
	} = useGetTodos(projectId, 'completed=false&ordering=-updated_at');

	const observerRef = useRef<HTMLDivElement>(null);

	const { mutateAsync: updateTodo } = useUpdateTodo();

	const onUpdate = async ({ id, completed }: { id: string; completed: boolean }) => {
		await updateTodo({ id, completed: !completed });
	};

	useInfiniteScroll({ observerRef, fetchNextPage, hasNextPage });

	if (isPending) return <p>Loading...</p>;

	if (!todos) return <p>No Data</p>;

	return (
		<aside className="hidden w-[400px] border-l border-l-separator bg-background lg:block ">
			<div className="p-4 flex flex-grow flex-col h-full">
				<h2 className="mb-4 text-lg font-semibold">Unfinished Business</h2>
				<div className="flex flex-col gap-4 flex-grow ">
					<CreateTodoForm />
					<ScrollArea
						className="flex-grow h-0"
						ref={observerRef}
					>
						<ul className="space-y-2">
							{formatPaginationList(todos).map((todo) => (
								<li
									key={todo.id}
									className="group flex items-center justify-between p-3 rounded-lg bg-background-alt hover:bg-background-alt/60"
								>
									<div className="flex items-center gap-3">
										<Checkbox
											checked={todo.completed}
											onClick={() => onUpdate({ id: todo.id, completed: todo.completed })}
										/>
										<span className="text-sm">{todo.title}</span>
									</div>
									<div className="flex items-center gap-2 w-10 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
										<EditTodoModal todo={todo} />
										<DeleteTodoModal todo={todo} />
									</div>
								</li>
							))}
						</ul>
					</ScrollArea>
				</div>
			</div>
		</aside>
	);
};

export default Todos;
