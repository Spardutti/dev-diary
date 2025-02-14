import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetDailyNotes } from '@/features/notes/api/noteQueries';
import type { INote } from '@/features/notes/types/INote';
import { cleanHtml } from '@/features/utils/cleanHtml';
import { notesFrom } from '@/features/utils/notesFrom';
import { Link, useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useRef } from 'react';

const DailyNotes = () => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/daily-notes/' });
	const { data: dailyNotes, isLoading } = useGetDailyNotes({ projectId });
	const observerRef = useRef<HTMLDivElement | null>(null);

	if (isLoading || !dailyNotes) return null;

	const mergedNotesByMonth = () => {
		const grouped = dailyNotes.reduce((acc: Record<string, INote[]>, note: INote) => {
			const month = dayjs(note.createdAt).startOf('month').format('YYYY-MM-DD');
			if (!acc[month]) {
				acc[month] = [];
			}
			acc[month].push(note);
			return acc;
		}, {});

		return grouped;
	};

	return (
		<ScrollArea
			className="flex flex-col gap-2 p-4 md:p-6 h-0 flex-grow"
			ref={observerRef}
		>
			{Object.entries(mergedNotesByMonth()).map(([key, value]) => {
				const month = dayjs(key).format('MMM YY');

				return (
					<div
						className="flex flex-col gap-2"
						key={key}
					>
						<p> {month}</p>
						<div className="flex flex-wrap gap-2">
							{value.map((note: INote) => {
								return (
									<Link
										className="h-28"
										key={note.id}
										to="/projects/$projectId/daily-notes/$noteId"
										params={{ noteId: note.id, projectId: projectId }}
									>
										<Card className="w-64 h-full hover:bg-background-alt/60">
											<CardHeader>
												<CardTitle className="text-secondary">{notesFrom(note.createdAt.toString())}</CardTitle>
											</CardHeader>
											<CardContent>
												<p className="line-clamp-1 text-text">{cleanHtml(note.content)}</p>
											</CardContent>
										</Card>
									</Link>
								);
							})}
						</div>
					</div>
				);
			})}
		</ScrollArea>
	);
};

export default DailyNotes;
