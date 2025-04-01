import { createTodo, deleteTodo, getTodos, updateTodo } from '@/features/todos/api/todosApi';
import { todosFilterQuery } from '@/features/todos/components/Todos/Todos';
import type { ITodo } from '@/features/todos/types/ITodo';
import { flattenInfiniteQueryData } from '@/features/utils/formatPaginationList';
import type { IPaginatedResponse } from '@/lib/axios';
import {
	removeFromPaginatedCache,
	sortedInsertToPaginatedCache,
	updateAndSortPaginatedCacheItem,
} from '@/lib/query/queryCacheUtils';
import { todosTableFilterQuery } from '@/routes/_authenticated/projects/$projectId/todos';

import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export const todosQueryKeys = {
	all: ['todos'] as const,
	list: (projectId: string) => [...todosQueryKeys.all, 'list', projectId] as const,
	detail: (id: string) => [...todosQueryKeys.all, id] as const,
	filter: (filters: string) => [...todosQueryKeys.all, filters] as const,
};

export const useCreateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<ITodo>) => createTodo(data),
		onSuccess: (response) => {
			sortedInsertToPaginatedCache({
				queryClient,
				newItem: response.data,
				queryKey: todosQueryKeys.filter(todosTableFilterQuery(response.data.projectId)),
				sortBy: 'status,completedAt,createdAt',
			});
			sortedInsertToPaginatedCache({
				queryClient,
				newItem: response.data,
				queryKey: todosQueryKeys.filter(todosFilterQuery(response.data.projectId)),
				sortBy: 'priority,createdAt',
			});
		},
	});
};

export const useGetTodos = (filters: string, initialData?: InfiniteData<IPaginatedResponse<ITodo[]>, number>) =>
	useInfiniteQuery({
		queryKey: todosQueryKeys.filter(filters),
		queryFn: ({ pageParam }) => getTodos({ filters, page: pageParam }),
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.totalPages > lastPage.pagination.currentPage) {
				return lastPage.pagination.currentPage + 1;
			}
			return undefined;
		},
		initialPageParam: 1,
		select: (data) => flattenInfiniteQueryData(data),
		initialData,
	});

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: (data: Partial<ITodo>) => updateTodo(data),
		onSuccess: (response) => {
			updateAndSortPaginatedCacheItem({
				queryClient,
				item: response.data,
				queryKey: todosQueryKeys.filter(todosTableFilterQuery(response.data.projectId)),
				matchBy: (a: ITodo) => a.id === response.data.id,
				sortBy: 'status,completedAt,createdAt',
			});
			updateAndSortPaginatedCacheItem({
				queryClient,
				item: response.data,
				queryKey: todosQueryKeys.filter(todosFilterQuery(response.data.projectId)),
				sortBy: 'priority,createdAt',
				matchBy: (a: ITodo) => a.id === response.data.id,
			});

			router.invalidate();
		},
	});
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: ({ id }: { id: string; projectId: string }) => deleteTodo(id),
		onSuccess: (_, { id, projectId }) => {
			const queryKeys = [
				todosQueryKeys.filter(todosTableFilterQuery(projectId)),
				todosQueryKeys.filter(todosFilterQuery(projectId)),
			];

			queryKeys.forEach((queryKey) => {
				removeFromPaginatedCache({
					queryClient,
					queryKey,
					matchBy: (a: ITodo) => a.id === id,
				});
			});

			router.invalidate();
		},
	});
};
