import type { IDailyNote } from '@/features/dailyNotes/types/IDailyNote';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateDailyNote = () => {
	return useMutation({
		mutationFn: (data: Partial<IDailyNote>) =>
			axiosHelper<IResponse<IDailyNote>>({ method: 'post', url: '/daily-notes/', data }),
	});
};

export const useGetDailyNote = ({ projectId, date }: { projectId: string; date: string }) =>
	useQuery({
		queryKey: ['daily-note', projectId, date],
		queryFn: () =>
			axiosHelper<IResponse<IDailyNote>>({ method: 'get', url: `/daily-notes/?project_id=${projectId}&date=${date}` }),
	});

export const useUpdateDailyNote = () => {
	return useMutation({
		mutationFn: (data: Partial<IDailyNote>) =>
			axiosHelper<IResponse<IDailyNote>>({ method: 'patch', url: `/daily-notes/${data.id}/`, data }),
	});
};
