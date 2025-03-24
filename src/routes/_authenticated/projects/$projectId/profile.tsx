import PageBreadcrumb from '@/components/PageBreadcrumb';
import { getGithubConfigs } from '@/features/profile/api/githubConfigApi';
import { githubConfigQueriesKeys } from '@/features/profile/api/githubConfigQueries';
import GithubForm from '@/features/profile/components/GithubConfigForm';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
	const config = Route.useLoaderData();

	const { author, repo, installationId, owner } = config.data[0] ?? {};
	return (
		<div className="flex flex-grow md:flex-row flex-col  gap-4 overflow-auto">
			<div className="flex flex-col flex-grow p-4 gap-6">
				<PageBreadcrumb />

				<GithubForm
					author={author}
					repo={repo}
					installationId={installationId}
					owner={owner}
				/>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/profile')({
	component: RouteComponent,
	context: () => ({
		routeTitle: 'Profile',
	}),
	loader: async ({ params, context }) => {
		const { queryClient } = context;

		const { projectId } = params;

		return await queryClient.ensureQueryData({
			queryKey: githubConfigQueriesKeys.list(),
			queryFn: () => getGithubConfigs({ projectId }),
		});
	},
});
