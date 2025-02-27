import PageBreadcrumb from '@/components/PageBreadcrumb';
import { getTodos } from '@/features/todos/api/todosApi';
import { todosQueryKeys, useGetTodos } from '@/features/todos/api/todosQueries';
import TodosTable from '@/features/todos/components/TodosTable';
import { todoColumns } from '@/features/todos/components/TodosTable/TodosColumn';
import type { ITodo } from '@/features/todos/types/ITodo';
import type { IPaginatedResponse } from '@/lib/axios';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';

export const todosTableFilterQuery = (projectId: string) =>
	`projectId=${projectId}&orderBy=status,completedAt,createdAt&orderDirection=desc,desc&limit=20`;

const RouteComponent = () => {
	const routeApi = getRouteApi('/_authenticated/projects/$projectId/todos/');
	const todos = routeApi.useLoaderData();

	const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetTodos(
		todosTableFilterQuery(routeApi.useParams().projectId),
		todos,
	);

	return (
		<div className="flex flex-grow flex-col p-4 gap-6 overflow-hidden">
			<PageBreadcrumb />

			<TodosTable
				hasNextPage={hasNextPage}
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				data={data}
				columns={todoColumns}
			/>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/todos/')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { queryClient } = context;

		return await queryClient.ensureInfiniteQueryData({
			queryKey: todosQueryKeys.filter(todosTableFilterQuery(params.projectId)),
			queryFn: ({ pageParam }) => getTodos({ filters: todosTableFilterQuery(params.projectId), page: pageParam }),
			initialPageParam: 1,
			getNextPageParam: (lastPage: IPaginatedResponse<ITodo[]>) => {
				if (lastPage.pagination.totalPages > lastPage.pagination.currentPage) {
					return lastPage.pagination.currentPage + 1;
				}
				return undefined;
			},
		});
	},
	context: () => ({
		routeTitle: 'Todos',
	}),
});
