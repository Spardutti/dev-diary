import { createSnippet, getSnippet, getSnippets } from '@/features/snippets/api/snippetApi';
import { useMutation, useQuery } from '@tanstack/react-query';

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
	return useMutation({
		mutationFn: createSnippet,
	});
};
