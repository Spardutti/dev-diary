import type { ITodo } from '@/features/todos/types/ITodo';
import type { IPaginatedResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import {
	prependItemToPaginatedList,
	editItemInPaginatedList,
	removeItemFromPaginatedList,
} from '@/lib/query/onMutationSuccess';
import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';

export const useCreateTodo = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<ITodo>) => axiosHelper<ITodo>({ method: 'post', url: '/todos/', data }),
		onSuccess: (response) => {
			return prependItemToPaginatedList<ITodo>({
				queryKey: ['todos', response.project.toString()],
				queryClient,
				newItem: response,
				matchBy: null,
			});
		},
	});
};

export const useGetTodos = (
	projectId: string | undefined,
	query?: string,
	initialData?: InfiniteData<IPaginatedResponse<ITodo>>,
) =>
	useInfiniteQuery({
		queryKey: ['todos', projectId?.toString()],
		queryFn: ({ pageParam }) => {
			return axiosHelper<IPaginatedResponse<ITodo>>({
				method: 'get',
				url: `/todos/?project_id=${projectId}&${query}&cursor=${pageParam}`,
			});
		},
		placeholderData: initialData,
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
			const updatedList = editItemInPaginatedList({
				queryKey: ['todos', response.project.toString()],
				queryClient,
				newItem: response,
				matchBy: (item: ITodo) => item.id === response.id,
			});
			router.invalidate();
			return updatedList;
		},
	});
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: (data: Partial<ITodo>) => axiosHelper<ITodo>({ method: 'delete', url: `/todos/${data.id}/` }),
		onSuccess: (_, { id, project }) => {
			const updatedList = removeItemFromPaginatedList({
				queryKey: ['todos', project?.toString()],
				queryClient,
				matchBy: (item: ITodo) => item.id === id,
			});
			router.invalidate();
			return updatedList;
		},
	});
};
