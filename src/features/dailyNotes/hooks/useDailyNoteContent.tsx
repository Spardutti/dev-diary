import { useGetDailyNote } from '@/features/dailyNotes/api/dailyNotes';
import { useDailyNoteStore } from '@/store/useDailyNoteSlice';
import { useEffect, useState } from 'react';

export const useDailyNoteContent = (projectId: string, date?: string) => {
	const { setDailyNoteId, id } = useDailyNoteStore((state) => state);

	const { data: dailyNote, isPending: isLoadingDailyNote } = useGetDailyNote({
		projectId,
		date: date ?? 'today',
	});

	const [noteContent, setNoteContent] = useState<string | undefined>();

	useEffect(() => {
		if (dailyNote?.data && !noteContent) {
			setDailyNoteId(dailyNote.data.id);
			setNoteContent(dailyNote.data.note);
		}
	}, [dailyNote?.data]);

	return {
		noteContent,
		setNoteContent,
		id,
		isLoadingDailyNote,
	};
};
