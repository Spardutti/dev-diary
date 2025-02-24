import PageBreadcrumb from '@/components/PageBreadcrumb';
import { getSummary } from '@/features/summaries/api/summaryApi';
import { summaryQueryKeys } from '@/features/summaries/api/summaryQueries';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
const RouteComponent = () => {
	return (
		<div className="p-4 flex flex-col w-full gap-6">
			<PageBreadcrumb />
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
