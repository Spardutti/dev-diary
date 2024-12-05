import { createFileRoute } from '@tanstack/react-router';
import Todos from '@/components/Todos';
import TodayNotes from '@/features/dailyNotes/components/NoteDetail';

const Dashboard = () => {
	return (
		<div className="flex flex-grow">
			<TodayNotes />

			<Todos />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/dashboard')({
	component: Dashboard,
});
