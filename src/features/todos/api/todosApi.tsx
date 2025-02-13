import type { ITodo } from '@/features/todos/types/ITodo';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';

export const getTodos = (filters?: string) => {
	const url = filters ? `/todo/list?${filters}` : '/todo/list';
	return axiosHelper<IResponse<ITodo[]>>({
		method: 'get',
		url,
	});
};

export const createTodo = (data: Partial<ITodo>) => axiosHelper<ITodo>({ method: 'post', url: '/todo/create', data });

export const updateTodo = (data: Partial<ITodo>) =>
	axiosHelper<ITodo>({ method: 'put', url: `/todo/update/${data.id}/`, data });

export const deleteTodo = (id: string) => axiosHelper<ITodo>({ method: 'delete', url: `/todo/delete/${id}/` });
