import { useDailyNoteStore } from '@/store/useDailyNoteSlice';
import { useEffect, useState } from 'react';

export const useDailyNoteContent = (content: string, noteId: string) => {
	const { setDailyNoteId } = useDailyNoteStore((state) => state);

	const [noteContent, setNoteContent] = useState<string | undefined>();

	useEffect(() => {
		if (content && !noteContent) {
			setDailyNoteId(noteId);
			setNoteContent(content);
		}
	}, [content, noteId]);

	return {
		noteContent,
		setNoteContent,
	};
};
