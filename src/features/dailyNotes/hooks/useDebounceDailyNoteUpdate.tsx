import { useCreateDailyNote, useUpdateDailyNote } from '@/features/dailyNotes/api/dailyNotes';
import { useParams, useRouter } from '@tanstack/react-router';
import { useDebounce } from '@uidotdev/usehooks';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const useDebouncedDailyNoteUpdate = (id: string | undefined, noteContent: string | undefined) => {
	const { projectId } = useParams({ strict: false });
	const debouncedContent = useDebounce(noteContent, 500);
	const { mutateAsync: updateDailyNote, isPending: isSavingNote } = useUpdateDailyNote();
	const { mutateAsync: createDailyNote, isPending: isCreatingNote } = useCreateDailyNote();
	const router = useRouter();

	const createNote = async () => {
		if (debouncedContent && !id) {
			await createDailyNote({ note: debouncedContent, date: dayjs().format('YYYY-MM-DD'), projectId });
			router.invalidate();
		}
	};
	
	// Automatically update the note when the debounced content changes
	useEffect(() => {
		if (debouncedContent && !id) {
			createNote();
		}
		if (debouncedContent && id) {
			updateDailyNote({ id, note: debouncedContent });
		}
	}, [debouncedContent]);

	return { isSavingNote: isCreatingNote || isSavingNote };
};
