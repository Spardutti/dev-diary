import RichEditor from '@/components/RichTextEditor';
import { useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useDailyNoteContent } from '@/features/dailyNotes/hooks/useDailyNoteContent';
import { useDebouncedDailyNoteUpdate } from '@/features/dailyNotes/hooks/useDebounceDailyNoteUpdate';

interface DailyNotesProps {
	date?: string;
}

const notesOf = (date: string | undefined) => {
	const selectedDate = dayjs(date || dayjs());
	const day = selectedDate.format('ddd');
	const numericDate = selectedDate.date();
	const monthAndYear = selectedDate.format('MMM YYYY');

	return `Notes Of ${day} ${numericDate}, ${monthAndYear}`;
};

const DailyNotes = ({ date }: DailyNotesProps) => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/dashboard' });

	const { noteContent, setNoteContent, id, isLoadingDailyNote } = useDailyNoteContent(projectId, date);

	useDebouncedDailyNoteUpdate(id, noteContent);

	return (
		<div className="flex-grow flex h-full flex-col">
			<header className="flex justify-center py-4">
				<h1 className="text-xl font-semibold">{notesOf(date)}</h1>
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

export default DailyNotes;
