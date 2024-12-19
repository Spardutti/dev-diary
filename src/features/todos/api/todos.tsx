import type { ITodo } from '@/features/todos/types/ITodo';
import type { IPaginatedResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import {
	prependItemToPaginatedList,
	editItemInPaginatedList,
	removeItemFromPaginatedList,
} from '@/lib/query/onMutationSuccess';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export const useCreateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<ITodo>) => axiosHelper<ITodo>({ method: 'post', url: '/todos/', data }),
		onSuccess: (response) => {
			prependItemToPaginatedList<ITodo>({
				queryKey: ['todos', response.project.toString()],
				queryClient,
				newItem: response,
				matchBy: null,
			});
			prependItemToPaginatedList<ITodo>({
				queryKey: ['todos', response.project.toString(), 'table'],
				queryClient,
				newItem: response,
				matchBy: null,
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
	const router = useRouter();

	return useMutation({
		mutationFn: (data: Partial<ITodo>) => axiosHelper<ITodo>({ method: 'patch', url: `/todos/${data.id}/`, data }),
		onSuccess: (response) => {
			router.invalidate();
			editItemInPaginatedList({
				queryKey: ['todos', response.project.toString()],
				queryClient,
				newItem: response,
				matchBy: (item: ITodo) => item.id === response.id,
			});
			editItemInPaginatedList({
				queryKey: ['todos', response.project.toString(), 'table'],
				queryClient,
				newItem: response,
				matchBy: (item: ITodo) => item.id === response.id,
			});
		},
	});
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: (data: Partial<ITodo>) => axiosHelper<ITodo>({ method: 'delete', url: `/todos/${data.id}/` }),
		onSuccess: (_, { id, project }) => {
			router.invalidate();
			removeItemFromPaginatedList({
				queryKey: ['todos', project?.toString()],
				queryClient,
				matchBy: (item: ITodo) => item.id === id,
			});
			removeItemFromPaginatedList({
				queryKey: ['todos', project?.toString(), 'table'],
				queryClient,
				matchBy: (item: ITodo) => item.id === id,
			});
		},
	});
};
