import type { IProject } from '@/features/projects/types/project';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useQuery } from '@tanstack/react-query';

export const useGetProjects = () =>
	useQuery({
		queryKey: ['projects'],
		queryFn: () => axiosHelper<IResponse<IProject[]>>({ method: 'get', url: '/projects' }),
	});
