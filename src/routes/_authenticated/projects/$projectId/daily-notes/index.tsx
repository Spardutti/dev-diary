import DailyNotes from '@/features/dailyNotes/components/DailyNotes';
import { createFileRoute } from '@tanstack/react-router';

const DailyNote = () => {
	return (
		<div className="p-6 flex flex-grow flex-col gap-4">
			<h2 className="text-xl text-center">Daily Notes</h2>
			<DailyNotes />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/daily-notes/')({
	component: DailyNote,
});
