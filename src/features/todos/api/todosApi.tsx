import type { ITodo } from '@/features/todos/types/ITodo';
import type { IPaginatedResponse, IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';

export const getTodos = ({ filters, page }: { filters?: string; page: number }) => {
	const url = filters ? `/todo/list?${filters}&page=${page}` : `/todo/list?page=${page}`;
	return axiosHelper<IPaginatedResponse<ITodo[]>>({
		method: 'get',
		url,
	});
};

export const createTodo = (data: Partial<ITodo>) =>
	axiosHelper<IResponse<ITodo>>({ method: 'post', url: '/todo/create', data });

export const updateTodo = (data: Partial<ITodo>) =>
	axiosHelper<IResponse<ITodo>>({ method: 'put', url: `/todo/update/${data.id}/`, data });

export const deleteTodo = (id: string) => axiosHelper<ITodo>({ method: 'delete', url: `/todo/delete/${id}/` });
