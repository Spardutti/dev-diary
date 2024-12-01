import { useUpdateDailyNote } from '@/features/dailyNotes/api/dailyNotes';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect } from 'react';

export const useDebouncedDailyNoteUpdate = (id: string | undefined, noteContent: string | undefined) => {
	const debouncedContent = useDebounce(noteContent, 500);
	const { mutateAsync: updateDailyNote } = useUpdateDailyNote();

	// Automatically update the note when the debounced content changes

	useEffect(() => {
		if (debouncedContent) {
			updateDailyNote({ id, note: debouncedContent });
		}
	}, [debouncedContent]);
};
