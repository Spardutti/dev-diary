import { upsertSummary, getSummaries, todaySummaryExist, updateSummary } from '@/features/summaries/api/summaryApi';
import { sortedInsertToCache, updateAndSortCacheListItem, updateCacheItemDetail } from '@/lib/query/queryCacheUtils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import dayjs from 'dayjs';

export const summaryQueryKeys = {
	all: ['summary'] as const,
	list: (projectId: string) => [...summaryQueryKeys.all, 'list', projectId] as const,
	detail: (id: string) => [...summaryQueryKeys.all, 'detail', id] as const,
	exist: (projectId: string) => [...summaryQueryKeys.all, 'exist', projectId] as const,
};

export const useGetSummaries = (projectId: string) =>
	useQuery({
		queryKey: summaryQueryKeys.list(projectId),
		queryFn: () => getSummaries(projectId),
	});

export const useUpsertSummary = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	return useMutation({
		mutationFn: upsertSummary,
		onSuccess: (response, { date, projectId }) => {
			if ('data' in response) {
				sortedInsertToCache({
					queryClient,
					queryKey: summaryQueryKeys.list(projectId),
					sortBy: 'createdAt',
					newItem: response.data,
				});

				updateAndSortCacheListItem({
					queryClient,
					queryKey: summaryQueryKeys.list(projectId),
					sortBy: 'createdAt',
					matchBy: (existingItem) => dayjs(existingItem.createdAt).isSame(dayjs(date), 'day'),
					item: response.data,
				});

				updateCacheItemDetail({
					queryClient,
					queryKey: summaryQueryKeys.detail(response.data.id),
					item: response.data,
				});

				if (dayjs(date).isSame(dayjs(), 'day')) {
					queryClient.setQueryData<{ exist: boolean }>(summaryQueryKeys.exist(projectId), (oldData) => {
						if (!oldData) return;
						return {
							...oldData,
							exists: true,
						};
					});
				}
			}
			router.invalidate();
		},
	});
};

export const useUpdateSummary = () => {
	// const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateSummary,
	});
};

export const useGetTodaySummaryExists = (projectId: string) =>
	useQuery({
		queryKey: summaryQueryKeys.exist(projectId),
		queryFn: () => todaySummaryExist(projectId),
		select: (data) => data.exists,
		staleTime: Infinity,
	});
