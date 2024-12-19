import TodosTable from '@/features/todos/components/TodosTable';
import { todoColumns } from '@/features/todos/components/TodosTable/TodosColumn';
import type { ITodo } from '@/features/todos/types/ITodo';
import { formatPaginationList } from '@/features/utils/formatPaginationList';
import type { IPaginatedResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';

const RouteComponent = () => {
	const routeApi = getRouteApi('/_authenticated/projects/$projectId/todos/');
	const todos = routeApi.useLoaderData();

	return (
		<div className="flex flex-grow p-4">
			<TodosTable
				data={formatPaginationList(todos)}
				columns={todoColumns}
			/>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/todos/')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { projectId } = params;
		const { queryClient } = context;

		return await queryClient.ensureInfiniteQueryData({
			queryKey: ['todos', projectId?.toString(), 'table'],
			queryFn: ({ pageParam }) =>
				axiosHelper<IPaginatedResponse<ITodo>>({
					method: 'get',
					url: `/todos/?project_id=${projectId}&cursor=${pageParam}`,
				}),
			initialPageParam: '',
		});
	},
});
