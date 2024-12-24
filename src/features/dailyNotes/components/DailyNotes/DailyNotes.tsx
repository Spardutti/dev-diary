import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetDailyNotes } from '@/features/dailyNotes/api/dailyNotes';
import type { IDailyNote } from '@/features/dailyNotes/types/IDailyNote';
import { cleanHtml } from '@/features/utils/cleanHtml';
import { formatPaginationList } from '@/features/utils/formatPaginationList';
import { notesFrom } from '@/features/utils/notesFrom';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Link, useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useRef } from 'react';

const DailyNotes = () => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/daily-notes/' });
	const { data: dailyNotes, isLoading, hasNextPage, fetchNextPage } = useGetDailyNotes({ projectId });
	const observerRef = useRef<HTMLDivElement | null>(null);

	useInfiniteScroll({ hasNextPage, fetchNextPage, observerRef });

	if (isLoading || !dailyNotes) return null;

	const mergedNotesByMonth = () => {
		// Combine notes from all pages into a single object grouped by month
		const groupedData: Record<string, IDailyNote[]> = formatPaginationList(dailyNotes).reduce((acc, page) => {
			Object.entries(page).forEach(([month, notes]) => {
				if (!acc[month]) {
					acc[month] = [];
				}
				acc[month] = [...acc[month], ...notes]; // Merge notes for the same month
			});
			return acc;
		}, {});

		return groupedData;
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
							{value.map((note: IDailyNote) => {
								return (
									<Link
										className="h-28"
										key={note.id}
										to="/projects/$projectId/daily-notes/$noteId"
										params={{ noteId: note.id, projectId: projectId }}
									>
										<Card className="w-64 h-full hover:bg-background-alt/60">
											<CardHeader>
												<CardTitle className="text-secondary">{notesFrom(note.date)}</CardTitle>
											</CardHeader>
											<CardContent>
												<p className="line-clamp-1 text-text">{cleanHtml(note.note)}</p>
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
