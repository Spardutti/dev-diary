import PageBreadcrumb from '@/components/PageBreadcrumb';
import { getSummaries } from '@/features/summaries/api/summaryApi';
import { summaryQueryKeys } from '@/features/summaries/api/summaryQueries';
import CreateSummaryModal from '@/features/summaries/components/CreateSummaryModal';
import SummaryCard from '@/features/summaries/components/SummaryCard';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
	const summaries = Route.useLoaderData();

	return (
		<div className="p-4 flex flex-col w-full gap-6">
			<PageBreadcrumb />
			<div className="flex w-full justify-between">
				<h1>Summaries Vault</h1>
				<CreateSummaryModal />
			</div>
			<div className="flex flex-wrap gap-4">
				{!summaries.data?.length && <p>No summaries found</p>}

				{summaries.data?.map((summary) => (
					<SummaryCard
						key={summary.id}
						summary={summary}
					/>
				))}
			</div>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/summaries/')({
	component: RouteComponent,
	loader: async ({ context: { queryClient }, params: { projectId } }) => {
		const summaries = await queryClient.ensureQueryData({
			queryKey: summaryQueryKeys.list(projectId),
			queryFn: () => getSummaries(projectId),
		});

		return summaries;
	},
});
