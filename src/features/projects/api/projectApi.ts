import type { IProject } from '@/features/projects/types/project';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';

export const getProject = (id: string) =>
	axiosHelper<IResponse<IProject>>({ method: 'get', url: `/project/show/${id}` });

export const getProjects = () => axiosHelper<IResponse<IProject[]>>({ method: 'get', url: '/project/list' });

export const createProject = (data: Partial<IProject>) =>
	axiosHelper<IResponse<IProject>>({ method: 'post', url: '/project/create', data });

export const updateProject = (data: Partial<IProject>) =>
	axiosHelper<IResponse<IProject>>({ method: 'put', url: `/project/update/${data.id}`, data });
