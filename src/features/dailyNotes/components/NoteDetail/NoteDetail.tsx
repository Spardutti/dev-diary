import RichEditor from '@/components/RichTextEditor';
import { useParams } from '@tanstack/react-router';
import { useDailyNoteContent } from '@/features/dailyNotes/hooks/useDailyNoteContent';
import { useDebouncedDailyNoteUpdate } from '@/features/dailyNotes/hooks/useDebounceDailyNoteUpdate';
import { notesFrom } from '@/features/utils/notesFrom';

interface DailyNotesProps {
	date?: string;
}

const NoteDetail = ({ date }: DailyNotesProps) => {
	const { projectId } = useParams({ strict: false });

	const { noteContent, setNoteContent, id, isLoadingDailyNote } = useDailyNoteContent(projectId ?? '', date);

	useDebouncedDailyNoteUpdate(id, noteContent);

	return (
		<div className="flex-grow flex h-full flex-col">
			<header className="flex justify-center py-4">
				<h1 className="text-xl font-semibold">{notesFrom(date)}</h1>
			</header>
			{isLoadingDailyNote ? (
				<div className="text-center mt-8">Loading...</div>
			) : (
				<RichEditor
					setContent={setNoteContent}
					content={noteContent}
				/>
			)}
		</div>
	);
};

export default NoteDetail;
