import { createNote, getNote, getNotes, updateNote } from '@/features/notes/api/noteApi';
import type { INote } from '@/features/notes/types/INote';
import { updateCacheItemDetail } from '@/lib/query/queryCacheUtils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const noteQueryKeys = {
	all: ['notes'] as const,
	list: (projectId: string) => [...noteQueryKeys.all, 'list', projectId] as const,
	filter: (filter: string, projectId: string) => [...noteQueryKeys.list(projectId), filter] as const,
	details: () => [...noteQueryKeys.all, 'detail'] as const,
	detail: (id: string) => [...noteQueryKeys.details(), id] as const,
};

export const useCreateNote = () => {
	return useMutation({
		mutationFn: (data: Partial<INote>) => createNote(data),
	});
};

export const useGetNote = ({ noteId }: { noteId: string }) =>
	useQuery({
		queryKey: noteQueryKeys.detail(noteId),
		queryFn: () => getNote({ noteId }),
		select: (data) => data.data as INote,
		enabled: !!noteId,
	});

export const useGetDailyNotes = ({ projectId }: { projectId: string }) =>
	useQuery({
		queryKey: noteQueryKeys.list(projectId),
		queryFn: () => getNotes({ projectId }),
		select: (data) => data.data as INote[],
	});

export const useUpdateDailyNote = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Partial<INote>) => updateNote(data),
		onSuccess: (response) => {
			updateCacheItemDetail({ queryClient, queryKey: noteQueryKeys.detail(response.data.id), item: response.data });
		},
	});
};
