import RichEditor from '@/components/RichTextEditor';
import { useParams } from '@tanstack/react-router';
import { useDailyNoteContent } from '@/features/dailyNotes/hooks/useDailyNoteContent';
import { useDebouncedDailyNoteUpdate } from '@/features/dailyNotes/hooks/useDebounceDailyNoteUpdate';
import { notesFrom } from '@/features/utils/notesFrom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DailyNotesProps {
	date?: string;
}

const NoteDetail = ({ date }: DailyNotesProps) => {
	const { projectId } = useParams({ strict: false });

	const { noteContent, setNoteContent, id } = useDailyNoteContent(projectId ?? '', date);

	useDebouncedDailyNoteUpdate(id, noteContent);

	return (
		<main className="flex-1">
			<div className="container mx-auto p-4 md:p-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-lg">{notesFrom(date)}</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[calc(100vh-16rem)]">
							<RichEditor
								setContent={setNoteContent}
								content={noteContent}
							/>
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default NoteDetail;
