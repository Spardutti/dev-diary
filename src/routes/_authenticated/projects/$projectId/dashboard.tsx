import { createFileRoute, redirect } from '@tanstack/react-router';
import Todos from '@/features/todos/components/Todos';
import NoteDetail from '@/features/notes/components/NoteDetail';
import { projectQueryKeys } from '@/features/projects/api/projectQueries';
import { getProject } from '@/features/projects/api/projectApi';
import { noteQueryKeys } from '@/features/notes/api/noteQueries';
import { getNote } from '@/features/notes/api/noteApi';
import { useFeatureAnnouncement } from '@/hooks/useFeatureAnnouncement';
import { setDefaultHeaders } from '@/lib/axios';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import DailyRecap from '@/features/dashboard/components/DailyRecap';
import RetroLoadingOverlay from '@/components/RetroLoadingOverlay';

const Dashboard = () => {
	useFeatureAnnouncement();

	return (
		<div className="flex flex-grow md:flex-row flex-col  gap-4 overflow-auto">
			<div className="flex flex-col flex-grow p-4 gap-6">
				<PageBreadcrumb />

				<DailyRecap />

				<NoteDetail routeKey="/_authenticated/projects/$projectId/dashboard" />
			</div>
			<Todos />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/dashboard')({
	component: Dashboard,
	pendingComponent: () => <RetroLoadingOverlay isLoading />,
	context: () => ({
		routeTitle: 'Dashboard',
	}),
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
			localStorage.removeItem('authToken');
			setDefaultHeaders(null);
			return redirect({ to: '/' });
		}
	},
});
