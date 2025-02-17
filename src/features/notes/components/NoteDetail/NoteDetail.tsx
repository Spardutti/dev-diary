import RichEditor from '@/components/RichTextEditor';
import { getRouteApi } from '@tanstack/react-router';
import { notesFrom } from '@/features/utils/notesFrom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { INote } from '@/features/notes/types/INote';
import { useDebouncedDailyNoteUpdate } from '@/features/notes/hooks/useDebounceDailyNoteUpdate';
import { useDailyNoteContent } from '@/features/notes/hooks/useDailyNoteContent';
import type { IResponse } from '@/lib/axios';

interface DailyNotesProps {
	date?: string;
	routeKey: '/_authenticated/projects/$projectId/dashboard' | '/_authenticated/projects/$projectId/daily-notes/$noteId';
}

const NoteDetail = ({ date, routeKey }: DailyNotesProps) => {
	const routeApi = getRouteApi(routeKey);
	const note: IResponse<INote> = routeApi.useLoaderData();

	const { noteContent, setNoteContent } = useDailyNoteContent(note?.data?.content, note?.data?.id);

	const { isSavingNote } = useDebouncedDailyNoteUpdate(note?.data?.id, noteContent);

	return (
		<main className="flex-1">
			<div className="mx-auto p-4 md:p-6">
				<Card>
					<CardHeader className="flex flex-row items-center space-y-0">
						<CardTitle className="text-lg">{notesFrom(date)}</CardTitle>
						<SaveIndicator isSavingNote={isSavingNote} />
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-[calc(100vh-16rem)]">
							<RichEditor
								setContent={setNoteContent}
								content={note?.data?.content}
							/>
						</ScrollArea>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default NoteDetail;

const SaveIndicator = ({ isSavingNote }: { isSavingNote: boolean }) => {
	return <div className={cn('ml-auto 0 bg-green-500 w-2 h-2 rounded-full', isSavingNote && 'animate-pulse')} />;
};
