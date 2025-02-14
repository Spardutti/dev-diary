import type { INote } from '@/features/notes/types/INote';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';

export const getNote = ({ date, projectId }: { date: string; projectId: string }) =>
	axiosHelper<IResponse<INote>>({ method: 'get', url: `/note/show/${date}/${projectId}` });

export const createNote = (data: Partial<INote>) =>
	axiosHelper<IResponse<INote>>({ method: 'post', url: '/note/create', data });

export const updateNote = (data: Partial<INote>) =>
	axiosHelper<IResponse<INote>>({ method: 'put', url: `/note/update/${data.id}/`, data });

export const getNotes = ({ projectId }: { projectId: string }) =>
	axiosHelper<IResponse<INote[]>>({ method: 'get', url: `/note/list?projectId=${projectId}` });
