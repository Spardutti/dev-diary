import {
	createGithubConfig,
	deleteGithubConfig,
	getGithubConfigs,
	updateGithubConfig,
} from '@/features/profile/api/githubConfigApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { IGithubConfig } from '../types/IGithubConfig';
import { prependToCache, removeFromCacheList } from '@/lib/query/queryCacheUtils';
import { useRouter } from '@tanstack/react-router';

export const githubConfigQueriesKeys = {
	all: ['githubConfig'] as const,
	list: () => [githubConfigQueriesKeys.all, 'list'] as const,
};

export const useCreateGithubConfig = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation({
		mutationFn: (data: Omit<IGithubConfig, 'id'>) => createGithubConfig(data),
		onSuccess: (response) => {
			prependToCache({
				queryClient,
				queryKey: githubConfigQueriesKeys.list(),
				newItem: response.data,
			});
			router.invalidate();
		},
	});
};

export const useGetGithubConfigs = ({ projectId }: { projectId: string }) => {
	return useQuery({
		queryFn: () => getGithubConfigs({ projectId }),
		queryKey: githubConfigQueriesKeys.list(),
	});
};

export const useUpdateGithubConfig = () => {
	return useMutation({
		mutationFn: (data: IGithubConfig) => updateGithubConfig(data),
	});
};

export const useDeleteGithubConfig = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: ({ id }: { id: string }) => deleteGithubConfig({ id }),
		onSuccess: (_, { id }) => {
			removeFromCacheList({
				queryClient,
				queryKey: githubConfigQueriesKeys.list(),
				matchBy: (item: IGithubConfig) => item.id === id,
			});
			router.invalidate();
		},
	});
};
