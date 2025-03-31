import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { INote } from '@/features/notes/types/INote';
import { cleanHtml } from '@/features/utils/cleanHtml';
import { notesFrom } from '@/features/utils/notesFrom';
import { Link, useLoaderData, useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useRef } from 'react';

const DailyNotes = () => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/daily-notes/' });
	const notes = useLoaderData({ from: '/_authenticated/projects/$projectId/daily-notes/' });
	const observerRef = useRef<HTMLDivElement | null>(null);

	const mergedNotesByMonth = () => {
		const grouped = notes.data.reduce((acc: Record<string, INote[]>, note: INote) => {
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
			className="flex flex-col gap-2 h-0 flex-grow"
			ref={observerRef}
		>
			{Object.entries(mergedNotesByMonth()).map(([key, value]) => {
				const month = dayjs(key).format('MMMM YYYY');

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
										className="h-40"
										key={note.id}
										to="/projects/$projectId/daily-notes/$noteId"
										params={{ noteId: note.id, projectId: projectId }}
									>
										<Card className="w-64 h-full ">
											<CardHeader>
												<CardTitle className="text-primary">{notesFrom(note.createdAt.toString())}</CardTitle>
											</CardHeader>
											<CardContent>
												<p className="line-clamp-2">{cleanHtml(note.content)}</p>
												<div className="flex items-center text-xs text-green-400/50 pt-2 group-hover:text-green-400/70 transition-colors">
													<span>{'>'}</span>
													<span className="h-4 w-2 bg-green-400/50 group-hover:bg-green-400 animate-pulse ml-1 group-hover:animate-blink transition-colors" />
												</div>
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
