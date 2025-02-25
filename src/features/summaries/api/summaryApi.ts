import type { ISummary } from '@/features/summaries/types/ISummary';
import type { ITodo } from '@/features/todos/types/ITodo';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';

export const getSummary = (id: string) =>
	axiosHelper<IResponse<ISummary>>({ method: 'get', url: `/summary/show/${id}` });

export const getSummaries = (projectId: string) =>
	axiosHelper<IResponse<ISummary[]>>({ method: 'get', url: `/summary/list?projectId=${projectId}&orderBy=createdAt` });

export const createSummary = ({ date, projectId }: { date: string; projectId: string }) =>
	axiosHelper<IResponse<ISummary>>({ method: 'post', url: '/summary/create', data: { date, projectId } });

export const updateSummary = ({
	id,
	noteContent,
	completedTodos,
	createdTodos,
}: {
	id: string;
	noteContent: string;
	completedTodos: ITodo[];
	createdTodos: ITodo[];
}) =>
	axiosHelper<IResponse<ISummary>>({
		method: 'patch',
		url: `/summary/update/${id}`,
		data: { noteContent, completedTodos, createdTodos },
	});

export const deleteSummary = (id: string) =>
	axiosHelper<IResponse<ISummary>>({ method: 'delete', url: `/summary/delete/${id}` });

export const todaySummaryExist = (projectId: string) =>
	axiosHelper<{ exists: boolean }>({ method: 'get', url: `/summary/exists?projectId=${projectId}` });
