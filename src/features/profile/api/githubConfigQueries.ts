import { createGithubConfig, getGithubConfigs } from '@/features/profile/api/githubConfigApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const githubConfigQueriesKeys = {
	all: ['githubConfig'] as const,
	list: () => [githubConfigQueriesKeys.all, 'list'] as const,
};

export const useCreateGithubConfig = () => {
	return useMutation({
		mutationFn: ({
			owner,
			repo,
			author,
			installationId,
			projectId,
		}: {
			owner: string;
			repo: string;
			author: string;
			installationId: string;
			projectId: string;
		}) => createGithubConfig({ owner, repo, author, installationId, projectId }),
	});
};

export const useGetGithubConfigs = ({ projectId }: { projectId: string }) => {
	return useQuery({
		queryFn: () => getGithubConfigs({ projectId }),
		queryKey: githubConfigQueriesKeys.list(),
	});
};
