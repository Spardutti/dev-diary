import PageBreadcrumb from '@/components/PageBreadcrumb';
import { TodoStats } from '@/features/todos/components/TodoStats';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
	return (
		<div className="p-4 flex flex-col w-full gap-6">
			<PageBreadcrumb />

			<TodoStats />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/stats/')({
	component: RouteComponent,
	context: () => ({
		routeTitle: 'Todo',
	}),
});
