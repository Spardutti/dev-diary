import { createFileRoute } from '@tanstack/react-router';
import Todos from '@/features/todos/components/Todos';
import NoteDetail from '@/features/notes/components/NoteDetail';
import { logout } from '@/features/auth/api/authApi';
import { projectQueryKeys } from '@/features/projects/api/projectQueries';
import { getProject } from '@/features/projects/api/projectApi';
import { noteQueryKeys } from '@/features/notes/api/noteQueries';
import { getNote } from '@/features/notes/api/noteApi';

const Dashboard = () => {
	return (
		<div className="flex flex-grow">
			<NoteDetail routeKey="/_authenticated/projects/$projectId/dashboard" />

			<Todos />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/dashboard')({
	component: Dashboard,

	loader: async ({ context, params }) => {
		const { queryClient } = context;

		const { projectId } = params;

		try {
			const project = await queryClient.ensureQueryData({
				queryKey: projectQueryKeys.detail(projectId),
				queryFn: () => getProject(projectId),
			});

			let note = null;
			if (project.data.todayNoteId) {
				note = await queryClient.ensureQueryData({
					queryKey: noteQueryKeys.detail(project.data.todayNoteId),
					queryFn: () => getNote({ noteId: project.data.todayNoteId }),
				});
			}

			return note;
		} catch (error) {
			console.log('error:', error);
			await logout();
		}
	},
});
