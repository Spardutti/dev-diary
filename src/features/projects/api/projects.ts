import type { IProject } from '@/features/projects/types/project';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetProjects = () =>
	useQuery({
		queryKey: ['projects'],
		queryFn: () => axiosHelper<IResponse<IProject[]>>({ method: 'get', url: '/projects/' }),
	});

export const useGetProject = (id: string) =>
	useQuery({
		queryKey: ['project', id],
		queryFn: () => axiosHelper<IResponse<IProject>>({ method: 'get', url: `/projects/${id}/` }),
		enabled: !!id,
	});

export const useCreateProject = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<IProject>) =>
			axiosHelper<IResponse<IProject>>({ method: 'post', url: '/projects/', data }),
		onSuccess: (response) => {
			queryClient.setQueryData<IResponse<IProject[]>>(['projects'], (old) => {
				if (!old) {
					return {
						status: response.status,
						data: [response.data],
					};
				}
				return {
					...old,
					data: [...old.data, response.data],
				};
			});
		},
	});
};

export const useUpdateProject = () => {
	const queryClient = useQueryClient();
	const queries = queryClient.getQueryCache().findAll();

	queries.forEach((query) => {
		console.log(`Query Key: ${query.queryKey}`, query.state.data);
	});
	return useMutation({
		mutationFn: (data: Partial<IProject>) =>
			axiosHelper<IResponse<IProject>>({ method: 'patch', url: `/projects/${data.id}/`, data }),
		onSuccess: (response) => {
			queryClient.setQueryData<IResponse<IProject[]>>(['projects'], (old) => {
				if (!old) {
					return;
				}
				return {
					...old,
					data: old.data.map((project) => (project.id === response.data.id ? response.data : project)),
				};
			});

			queryClient.setQueryData<IResponse<IProject>>(['project', response.data.id.toString()], (old) => {
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
