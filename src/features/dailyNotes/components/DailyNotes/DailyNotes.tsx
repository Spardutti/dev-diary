import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDailyNotes } from '@/features/dailyNotes/api/dailyNotes';
import { cleanHtml } from '@/features/utils/cleanHtml';
import { notesFrom } from '@/features/utils/notesFrom';
import { Link, useParams } from '@tanstack/react-router';
import dayjs from 'dayjs';

const DailyNotes = () => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/daily-notes/' });
	const { data: dailyNotes } = useGetDailyNotes({ projectId });

	return (
		<div className="flex flex-col gap-2 p-4 md:p-6">
			{dailyNotes?.data &&
				Object.entries(dailyNotes.data).map(([key, value]) => {
					const month = dayjs(key).format('MMM YY');
					return (
						<div
							className="flex flex-col gap-2"
							key={key}
						>
							<p> {month}</p>
							<div className="flex flex-wrap gap-2">
								{value.map((note) => {
									return (
										<Link
											className="h-28"
											key={note.id}
											to="/projects/$projectId/daily-notes/$noteId"
											params={{ noteId: note.id, projectId: projectId }}
										>
											<Card className="w-64 h-full">
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
		</div>
	);
};

export default DailyNotes;
