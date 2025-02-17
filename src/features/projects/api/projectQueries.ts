import { createProject, getProject, getProjects, updateProject } from '@/features/projects/api/projectApi';
import type { IProject } from '@/features/projects/types/project';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';
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
	return useMutation({
		mutationFn: (data: Partial<IProject>) => createProject(data),
	});
};

export const useUpdateProject = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<IProject>) => updateProject(data),
		onSuccess: (response) => {
			queryClient.setQueryData<IResponse<IProject[]>>(projectQueryKeys.list(), (old) => {
				if (!old) {
					return;
				}
				return {
					...old,
					data: old.data.map((project) => (project.id === response.data.id ? response.data : project)),
				};
			});

			queryClient.setQueryData<IResponse<IProject>>(projectQueryKeys.detail(response.data.id), (old) => {
				if (!old) {
					return;
				}
				return {
					...old,
					data: response.data,
				};
			});
		},
	});
};

export const useDeleteProject = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) =>
			axiosHelper<IResponse<{ redirectTo: string }>>({ method: 'delete', url: `/projects/${id}/` }),
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
