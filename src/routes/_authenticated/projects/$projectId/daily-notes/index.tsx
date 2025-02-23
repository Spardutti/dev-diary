import PageBreadcrumb from '@/components/PageBreadcrumb';
import DailyNotes from '@/features/notes/components/Notes';
import { createFileRoute } from '@tanstack/react-router';

const DailyNote = () => {
	return (
		<div className="flex flex-grow flex-col gap-6 p-4">
			<PageBreadcrumb />

			<h2 className="text-xl text-center">Daily Notes</h2>
			<DailyNotes />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/daily-notes/')({
	component: DailyNote,
	context: () => ({
		routeTitle: 'Notes',
	}),
});
