import { createFileRoute } from '@tanstack/react-router';
import Todos from '@/components/Todos';
import NoteDetail from '@/features/dailyNotes/components/NoteDetail';

const Dashboard = () => {
	return (
		<div className="flex flex-grow">
			<NoteDetail />

			<Todos />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/dashboard')({
	component: Dashboard,
});
