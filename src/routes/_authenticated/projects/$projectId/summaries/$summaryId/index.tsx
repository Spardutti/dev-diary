import PageBreadcrumb from '@/components/PageBreadcrumb';

import { getSummary } from '@/features/summaries/api/summaryApi';
import { summaryQueryKeys } from '@/features/summaries/api/summaryQueries';
import SummaryProgress from '@/features/summaries/components/SummaryProgress';
import SummaryTodoCard from '@/features/summaries/components/SummaryTodoCard';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { CheckCircle, Circle, ClipboardList } from 'lucide-react';
const RouteComponent = () => {
	const summary = Route.useLoaderData();

	return (
		<div className="p-4 flex flex-col w-full gap-6">
			<PageBreadcrumb />
			<h1>Summary of {dayjs(summary.data.createdAt).format('dddd DD, MMM YYYY')}</h1>

			<SummaryProgress
				completedTodos={summary.data.completedTodos.length}
				createdTodos={summary.data.createdTodos.length}
			/>

			<div className="grid gap-6 md:grid-cols-2">
				<SummaryTodoCard
					title="Completed Tasks"
					todos={summary.data.completedTodos}
					icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
					todoIcon={<CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />}
				/>
				<SummaryTodoCard
					title="Pending Tasks"
					todos={summary.data.createdTodos}
					icon={<ClipboardList className="h-5 w-5 text-yellow-500" />}
					todoIcon={<Circle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />}
				/>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/summaries/$summaryId/')({
	component: RouteComponent,
	context: () => ({
		routeTitle: 'Summary',
	}),
	loader: async ({ context, params: { summaryId } }) => {
		const { queryClient } = context;
		const response = await queryClient.ensureQueryData({
			queryKey: summaryQueryKeys.detail(summaryId),
			queryFn: () => getSummary(summaryId),
		});

		context.routeTitle = dayjs(response.data.createdAt).format('dddd DD MMM, YYYY ');

		return response;
	},
});
