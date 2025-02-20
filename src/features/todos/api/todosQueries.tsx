import { createTodo, deleteTodo, getTodos, updateTodo } from '@/features/todos/api/todosApi';
import { todosFilterQuery } from '@/features/todos/components/Todos/Todos';
import type { ITodo } from '@/features/todos/types/ITodo';
import {
	prependToCache,
	removeFromCacheList,
	sortedInsertToCache,
	updateAndSortCacheListItem,
	updateCacheListItem,
} from '@/lib/query/queryCacheUtils';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export const todosQueryKeys = {
	all: ['todos'] as const,
	list: () => [...todosQueryKeys.all, 'list'] as const,
	detail: (id: string) => [...todosQueryKeys.all, id] as const,
	filter: (filters: string) => [...todosQueryKeys.all, filters] as const,
};

export const useCreateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<ITodo>) => createTodo(data),
		onSuccess: (response) => {
			prependToCache({
				queryClient,
				newItem: response.data,
				queryKey: todosQueryKeys.filter(`projectId=${response.data.projectId}`),
			});
			sortedInsertToCache({
				queryClient,
				newItem: response.data,
				queryKey: todosQueryKeys.filter(todosFilterQuery(response.data.projectId)),
				sortBy: 'priority,createdAt',
			});
		},
	});
};

export const useGetTodos = (filters: string) =>
	useQuery({
		queryKey: todosQueryKeys.filter(filters),
		queryFn: () => getTodos(filters),
		select: (data) => data.data as ITodo[],
	});

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<ITodo>) => updateTodo(data),
		onSuccess: (response) => {
			updateCacheListItem({
				queryClient,
				item: response.data,
				queryKey: todosQueryKeys.filter(`projectId=${response.data.projectId}`),
				matchBy: (a: ITodo) => a.id === response.data.id,
			});
			updateAndSortCacheListItem({
				queryClient,
				item: response.data,
				queryKey: todosQueryKeys.filter(todosFilterQuery(response.data.projectId)),
				sortBy: 'priority,createdAt',
				matchBy: (a: ITodo) => a.id === response.data.id,
			});
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
				todosQueryKeys.filter(`projectId=${projectId}`),
				todosQueryKeys.filter(todosFilterQuery(projectId)),
			];

			queryKeys.forEach((queryKey) => {
				removeFromCacheList({
					queryClient,
					queryKey,
					matchBy: (a: ITodo) => a.id === id,
				});
			});

			router.invalidate();
		},
	});
};
