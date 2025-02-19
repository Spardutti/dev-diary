import type { IProject } from './../types/project';
import {
	createProject,
	deleteProject,
	getProject,
	getProjects,
	updateProject,
} from '@/features/projects/api/projectApi';
import type { IResponse } from '@/lib/axios';
import { appendToCache, updateCacheListItem } from '@/lib/query/queryCacheUtils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const projectQueryKeys = {
	all: ['projects'] as const,
	list: () => [...projectQueryKeys.all, 'list'] as const,
	detail: (id: string) => [...projectQueryKeys.all, id] as const,
	filter: (filters: string) => [...projectQueryKeys.all, filters] as const,
};

export const useGetProjects = () =>
	useQuery({
		queryKey: projectQueryKeys.list(),
		queryFn: getProjects,
		select: (data) => data.data as IProject[],
	});

export const useGetProject = (id: string) =>
	useQuery({
		queryKey: projectQueryKeys.detail(id),
		queryFn: () => getProject(id),
		enabled: !!id,
		select: (data) => data.data as { project: IProject; todayNoteId: string },
	});

export const useCreateProject = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<IProject>) => createProject(data),
		onSuccess: (response) => {
			appendToCache({ queryClient, queryKey: projectQueryKeys.list(), newItem: response.data });
		},
	});
};

export const useUpdateProject = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<IProject>) => updateProject(data),
		onSuccess: (response) => {
			queryClient.setQueryData<IResponse<{ project: IProject }>>(
				projectQueryKeys.detail(response.data.id),
				(oldData) => {
					if (!oldData) return;
					return {
						...oldData,
						data: {
							...oldData.data,
							project: response.data,
						},
					};
				},
			);

			updateCacheListItem({
				queryClient,
				queryKey: projectQueryKeys.list(),
				item: response.data,
				matchBy: (a: IProject, b: IProject) => a.id === b.id,
			});
		},
	});
};

export const useDeleteProject = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteProject(id),
		onSuccess: (_, id) => {
			queryClient.setQueryData<IResponse<IProject[]>>(['projects'], (old) => {
				if (!old) {
					return old;
				}
				return {
					...old,
					data: old.data.filter((project) => project.id !== id),
				};
			});
		},
	});
};
