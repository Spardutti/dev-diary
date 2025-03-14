import PageBreadcrumb from '@/components/PageBreadcrumb';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';

const RouteComponent = () => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/stats' });
	return (
		<div className="p-4 flex flex-col w-full gap-6">
			<PageBreadcrumb />

			<Link
				to="/projects/$projectId/stats/todo-stats"
				params={{ projectId }}
			>
				{' '}
				Todos
			</Link>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/stats/')({
	component: RouteComponent,
});
