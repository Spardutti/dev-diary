import PageBreadcrumb from '@/components/PageBreadcrumb';
import { getTodos } from '@/features/todos/api/todosApi';
import { todosQueryKeys } from '@/features/todos/api/todosQueries';
import TodosTable from '@/features/todos/components/TodosTable';
import { todoColumns } from '@/features/todos/components/TodosTable/TodosColumn';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';

export const todosTableFilterQuery = (projectId: string) =>
	`projectId=${projectId}&orderBy=status,completedAt,createdAt&orderDirection=desc,desc`;

const RouteComponent = () => {
	const routeApi = getRouteApi('/_authenticated/projects/$projectId/todos/');
	const todos = routeApi.useLoaderData();

	return (
		<div className="flex flex-grow flex-col p-4 gap-6 overflow-hidden">
			<PageBreadcrumb />

			<TodosTable
				data={todos?.data}
				columns={todoColumns}
			/>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/todos/')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { queryClient } = context;

		return await queryClient.ensureQueryData({
			queryKey: todosQueryKeys.filter(todosTableFilterQuery(params.projectId)),
			queryFn: () => getTodos(todosTableFilterQuery(params.projectId)),
		});
	},
	context: () => ({
		routeTitle: 'Todos',
	}),
});
