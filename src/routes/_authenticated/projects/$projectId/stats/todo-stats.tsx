import PageBreadcrumb from '@/components/PageBreadcrumb';
import TodoChart from '@/features/todos/components/TodoChart';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
	return (
		<div className="p-4 flex flex-col flex-grow gap-6 overflow-hidden">
			<PageBreadcrumb />

			<TodoChart />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/stats/todo-stats')({
	component: RouteComponent,
	context: () => ({
		routeTitle: 'Todo',
	}),
});
