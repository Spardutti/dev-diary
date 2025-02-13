import { createTodo, deleteTodo, getTodos, updateTodo } from '@/features/todos/api/todosApi';
import type { ITodo } from '@/features/todos/types/ITodo';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export const todosQueryKeys = {
	all: ['todos'] as const,
	list: () => [...todosQueryKeys.all, 'list'] as const,
	detail: (id: string) => [...todosQueryKeys.all, id] as const,
	filter: (filters: string) => [...todosQueryKeys.all, filters] as const,
};

export const useCreateTodo = () => {
	return useMutation({
		mutationFn: (data: Partial<ITodo>) => createTodo(data),
		onSuccess: () => {},
	});
};

export const useGetTodos = (filters: string) =>
	useQuery({
		queryKey: todosQueryKeys.filter(filters),
		queryFn: () => getTodos(filters),
	});

export const useUpdateTodo = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: (data: Partial<ITodo>) => updateTodo(data),
		onSuccess: () => {
			router.invalidate();
		},
	});
};

export const useDeleteTodo = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: (id: string) => deleteTodo(id),
		onSuccess: () => {
			router.invalidate();
		},
	});
};
