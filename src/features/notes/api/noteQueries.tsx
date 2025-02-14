import { createNote, getNote, getNotes, updateNote } from '@/features/notes/api/noteApi';
import type { INote } from '@/features/notes/types/INote';
import { useMutation, useQuery } from '@tanstack/react-query';

export const noteQueryKeys = {
	all: ['notes'] as const,
	list: () => [...noteQueryKeys.all, 'list'] as const,
	filter: (filter: string) => [...noteQueryKeys.list(), filter] as const,
	details: () => [...noteQueryKeys.all, 'detail'] as const,
	detail: (id: string) => [...noteQueryKeys.details(), id] as const,
};

export const useCreateNote = () => {
	return useMutation({
		mutationFn: (data: Partial<INote>) => createNote(data),
	});
};

export const useGetNote = ({ createdAt, projectId }: { createdAt: string; projectId: string }) =>
	useQuery({
		queryKey: noteQueryKeys.detail(createdAt),
		queryFn: () => getNote({ date: createdAt, projectId }),
		select: (data) => data.data as INote,
	});

export const useGetDailyNotes = ({ projectId }: { projectId: string }) =>
	useQuery({
		queryKey: noteQueryKeys.list(),
		queryFn: () => getNotes({ projectId }),
		select: (data) => data.data as INote[],
	});

export const useUpdateDailyNote = () => {
	return useMutation({
		mutationFn: (data: Partial<INote>) => updateNote(data),
	});
};
