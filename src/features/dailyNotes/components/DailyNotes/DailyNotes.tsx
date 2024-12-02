import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetDailyNotes } from '@/features/dailyNotes/api/dailyNotes';
import { cleanHtml } from '@/features/utils/cleanHtml';
import { notesFrom } from '@/features/utils/notesFrom';
import { useParams } from '@tanstack/react-router';

const DailyNotes = () => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/daily-notes/' });
	const { data: dailyNotes } = useGetDailyNotes({ projectId });

	return (
		<div className="flex flex-wrap gap-2">
			{dailyNotes?.data?.map((note) => {
				return (
					<Card
						key={note.id}
						className="w-64"
					>
						<CardHeader>
							<CardTitle className="text-secondary">{notesFrom(note.date)}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="line-clamp-1 text-text">{cleanHtml(note.note)}</p>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};

export default DailyNotes;
