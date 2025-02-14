import { getTodos } from '@/features/todos/api/todosApi';
import { todosQueryKeys } from '@/features/todos/api/todosQueries';
import TodosTable from '@/features/todos/components/TodosTable';
import { todoColumns } from '@/features/todos/components/TodosTable/TodosColumn';
import { createFileRoute, getRouteApi } from '@tanstack/react-router';

const RouteComponent = () => {
	const routeApi = getRouteApi('/_authenticated/projects/$projectId/todos/');
	const todos = routeApi.useLoaderData();

	return (
		<div className="flex flex-grow p-4">
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
			queryKey: todosQueryKeys.list(),
			queryFn: () => getTodos(`projectId=${params.projectId}`),
		});
	},
});
