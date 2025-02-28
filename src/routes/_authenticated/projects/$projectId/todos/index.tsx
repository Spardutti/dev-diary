import PageBreadcrumb from '@/components/PageBreadcrumb';
import RetroLoadingOverlay from '@/components/RetroLoadingOverlay';
import { getTodos } from '@/features/todos/api/todosApi';
import { todosQueryKeys, useGetTodos } from '@/features/todos/api/todosQueries';
import TodosTable from '@/features/todos/components/TodosTable';
import { todoColumns } from '@/features/todos/components/TodosTable/TodosColumn';
import TodosTableFilters from '@/features/todos/components/TodosTableFilters';
import type { ITodo } from '@/features/todos/types/ITodo';
import type { IPaginatedResponse } from '@/lib/axios';
import { createFileRoute, getRouteApi, useParams } from '@tanstack/react-router';
import { useState } from 'react';

export const todosTableFilterQuery = (projectId: string, filter?: string) => {
	if (filter) {
		return `projectId=${projectId}&orderBy=status,completedAt,createdAt&orderDirection=desc,desc&limit=20&${filter}`;
	} else {
		return `projectId=${projectId}&orderBy=status,completedAt,createdAt&orderDirection=desc,desc&limit=20`;
	}
};

const RouteComponent = () => {
	const routeApi = getRouteApi('/_authenticated/projects/$projectId/todos/');
	const todos = routeApi.useLoaderData();
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/todos/' });

	const [filters, setFilters] = useState(todosTableFilterQuery(projectId));

	const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } = useGetTodos(filters, todos);

	return (
		<div className="flex flex-grow flex-col p-4 gap-6 overflow-hidden">
			<PageBreadcrumb />

			<TodosTableFilters setFilters={setFilters} />

			<div className="relative flex flex-grow overflow-hidden">
				<RetroLoadingOverlay isLoading={isRefetching} />
				<TodosTable
					hasNextPage={hasNextPage}
					fetchNextPage={fetchNextPage}
					isFetchingNextPage={isFetchingNextPage}
					data={data ?? []}
					columns={todoColumns}
				/>
			</div>
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
