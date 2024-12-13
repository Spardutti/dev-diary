import type { ITodo } from '@/features/todos/types/ITodo';
import type { IPaginatedResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<ITodo>) => axiosHelper<ITodo>({ method: 'post', url: '/todos/', data }),
		onSuccess: (response) => {
			return queryClient.setQueryData(['todos', response.project.toString()], (oldData: ITodo[]) => {
				return [response, ...(oldData || [])];
			});
		},
	});
};

export const useGetTodos = (projectId: string | undefined, query?: string) =>
	useInfiniteQuery({
		queryKey: ['todos', projectId?.toString()],
		queryFn: ({ pageParam }) => {
			return axiosHelper<IPaginatedResponse<ITodo>>({
				method: 'get',
				url: `/todos/?project_id=${projectId}&${query}&cursor=${pageParam}`,
			});
		},
		enabled: !!projectId,
		initialPageParam: '',
		getNextPageParam: (lastPage) => {
			if (lastPage.next) {
				return lastPage.next;
			}
		},
	});

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<ITodo>) => axiosHelper<ITodo>({ method: 'patch', url: `/todos/${data.id}/`, data }),
		onSuccess: (response) => {
			console.log('response:', response);
			return queryClient.setQueryData(['todos', response.project.toString()], (oldData: ITodo[]) => {
				return oldData.map((todo) => (todo.id === response.id ? response : todo));
			});
		},
	});
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<ITodo>) => axiosHelper<ITodo>({ method: 'delete', url: `/todos/${data.id}/` }),
		onSuccess: (_, { id, project }) => {
			return queryClient.setQueryData(['todos', project?.toString()], (oldData: ITodo[]) => {
				return oldData.filter((todo) => todo.id !== id);
			});
		},
	});
};
