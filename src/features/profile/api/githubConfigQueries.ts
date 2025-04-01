import {
	createGithubConfig,
	deleteGithubConfig,
	getGithubConfigs,
	updateGithubConfig,
} from '@/features/profile/api/githubConfigApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IGithubConfig } from '../types/IGithubConfig';
import { prependToCache, removeFromCacheList, updateCacheListItem } from '@/lib/query/queryCacheUtils';
import { useRouter } from '@tanstack/react-router';

export const githubConfigQueriesKeys = {
	all: ['githubConfig'] as const,
	list: (projectId: string) => [githubConfigQueriesKeys.all, 'list', projectId] as const,
};

export const useCreateGithubConfig = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation({
		mutationFn: (data: Omit<IGithubConfig, 'id'>) => createGithubConfig(data),
		onSuccess: (response) => {
			prependToCache({
				queryClient,
				queryKey: githubConfigQueriesKeys.list(response.data.projectId),
				newItem: response.data,
			});

			router.invalidate();
		},
	});
};

export const useGetGithubConfigs = ({ projectId }: { projectId: string }) => {
	return useQuery({
		queryFn: () => getGithubConfigs({ projectId }),
		queryKey: githubConfigQueriesKeys.list(projectId),
	});
};

export const useUpdateGithubConfig = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: (data: IGithubConfig) => updateGithubConfig(data),
		onSuccess: (response, data) => {
			updateCacheListItem({
				queryClient,
				queryKey: githubConfigQueriesKeys.list(data.projectId),
				matchBy: (item: IGithubConfig) => item.id === data.id,
				item: response.data,
			});

			router.invalidate();
		},
	});
};

export const useDeleteGithubConfig = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: ({ id, projectId }: { id: string; projectId: string }) => deleteGithubConfig({ id, projectId }),
		onSuccess: (_, { id, projectId }) => {
			removeFromCacheList({
				queryClient,
				queryKey: githubConfigQueriesKeys.list(projectId),
				matchBy: (item: IGithubConfig) => item.id === id,
			});

			router.invalidate();
		},
	});
};
