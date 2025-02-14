import { useCreateNote, useUpdateDailyNote } from '@/features/notes/api/noteQueries';
import { notesFrom } from '@/features/utils/notesFrom';
import { useParams, useRouter } from '@tanstack/react-router';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect } from 'react';

export const useDebouncedDailyNoteUpdate = (id: string | undefined, noteContent: string | undefined) => {
	const { projectId } = useParams({ strict: false });
	const debouncedContent = useDebounce(noteContent, 500);
	const { mutateAsync: updateDailyNote, isPending: isSavingNote } = useUpdateDailyNote();
	const { mutateAsync: createDailyNote, isPending: isCreatingNote } = useCreateNote();
	const router = useRouter();

	const createNote = async () => {
		if (debouncedContent && !id) {
			await createDailyNote({
				content: debouncedContent,
				projectId,
				title: notesFrom(''),
			});
			router.invalidate();
		}
	};

	// Automatically update the note when the debounced content changes
	useEffect(() => {
		if (debouncedContent && !id) {
			createNote();
		}
		if (debouncedContent && id) {
			updateDailyNote({ id, content: debouncedContent, title: notesFrom('') });
		}
	}, [debouncedContent]);

	return { isSavingNote: isCreatingNote || isSavingNote };
};
