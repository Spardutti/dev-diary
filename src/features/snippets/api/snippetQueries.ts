import { createSnippet, deleteSnippet, getSnippet, getSnippets } from '@/features/snippets/api/snippetApi';
import type { ISnippet } from '@/features/snippets/types/ISnippet';
import { prependToCache, removeFromCacheList } from '@/lib/query/queryCacheUtils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const snippetQueryKeys = {
	all: ['snippet'] as const,
	list: () => [...snippetQueryKeys.all, 'list'] as const,
	filter: (filters: string) => [...snippetQueryKeys.list(), filters] as const,
	detail: (id: string) => [...snippetQueryKeys.all, id] as const,
};

export const useGetSnippets = () =>
	useQuery({
		queryKey: snippetQueryKeys.list(),
		queryFn: () => getSnippets(),
		select: (data) => data.data,
	});

export const useGetSnippet = (id: string) =>
	useQuery({
		queryKey: snippetQueryKeys.detail(id),
		queryFn: () => getSnippet(id),
		select: (data) => data.data,
	});

export const useCreateSnippet = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createSnippet,
		onSuccess: (response) => {
			prependToCache({
				queryClient,
				queryKey: snippetQueryKeys.list(),
				newItem: response.data,
			});
		},
	});
};

export const useDeleteSnippet = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteSnippet,
		onSuccess: (_, id) => {
			removeFromCacheList<ISnippet>({
				queryClient,
				queryKey: snippetQueryKeys.list(),
				matchBy: (item) => item.id === id,
			});
		},
	});
};
