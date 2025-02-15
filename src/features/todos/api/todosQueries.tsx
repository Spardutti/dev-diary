import { createTodo, deleteTodo, getTodos, updateTodo } from '@/features/todos/api/todosApi';
import type { ITodo } from '@/features/todos/types/ITodo';
import { prependToCache, removeFromCacheList, updateCacheList } from '@/lib/query/queryCacheUtils';

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
			const queryKeys = [
				todosQueryKeys.filter(`projectId=${response.data.projectId}`),
				todosQueryKeys.filter(`status=false&projectId=${response.data.projectId}`),
			];

			queryKeys.forEach((queryKey) => {
				prependToCache({
					queryClient,
					newItem: response.data,
					queryKey,
				});
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
			const queryKeys = [
				todosQueryKeys.filter(`projectId=${response.data.projectId}`),
				todosQueryKeys.filter(`status=false&projectId=${response.data.projectId}`),
			];

			queryKeys.forEach((queryKey) => {
				updateCacheList({
					queryClient,
					item: response.data,
					queryKey,
					matchBy: (a: ITodo, b: ITodo) => a.id === b.id,
				});
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
				todosQueryKeys.filter(`status=false&projectId=${projectId}`),
			];

			queryKeys.forEach((queryKey) => {
				removeFromCacheList({
					queryClient,
					id,
					queryKey,
					matchBy: (a: ITodo, b) => a.id === b,
				});
			});

			router.clearCache({
				filter: (root) => root.id === '/_authenticated/projects/a642a836-37b8-464c-9db0-48df4048730b/todos/',
			});
		},
	});
};
