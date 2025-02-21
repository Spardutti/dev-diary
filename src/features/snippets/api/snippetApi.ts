import type { ISnippet } from '@/features/snippets/types/ISnippet';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';

export const getSnippets = () => axiosHelper<IResponse<ISnippet[]>>({ method: 'get', url: '/snippet/list' });

export const getSnippet = (id: string) =>
	axiosHelper<IResponse<ISnippet>>({ method: 'get', url: `/snippet/show/${id}` });

export const createSnippet = (snippet: Partial<ISnippet>) =>
	axiosHelper<IResponse<ISnippet>>({ method: 'post', url: '/snippet/create', data: snippet });

export const updateSnippet = (id: string, snippet: Partial<ISnippet>) =>
	axiosHelper<IResponse<ISnippet>>({ method: 'put', url: `/snippet/update/${id}`, data: snippet });

export const deleteSnippet = (id: string) =>
	axiosHelper<IResponse<ISnippet>>({ method: 'delete', url: `/snippet/delete/${id}` });
