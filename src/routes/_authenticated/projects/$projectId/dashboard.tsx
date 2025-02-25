import { createFileRoute, redirect } from '@tanstack/react-router';
import Todos from '@/features/todos/components/Todos';
import NoteDetail from '@/features/notes/components/NoteDetail';
import { projectQueryKeys } from '@/features/projects/api/projectQueries';
import { getProject } from '@/features/projects/api/projectApi';
import { noteQueryKeys } from '@/features/notes/api/noteQueries';
import { getNote } from '@/features/notes/api/noteApi';
import { useFeatureAnnouncement } from '@/hooks/useFeatureAnnouncement';
import { setDefaultHeaders } from '@/lib/axios';
import { Skeleton } from '@/components/ui/skeleton';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Button } from '@/components/ui/button';
import { useDailyRecap } from '@/features/summaries/hooks/useTodayRecap';
import { CheckCircle } from 'lucide-react';

const Dashboard = () => {
	useFeatureAnnouncement();

	const { createDailyRecap, isLoading, exists } = useDailyRecap();

	return (
		<div className="flex flex-grow  gap-4">
			<div className="flex flex-col flex-grow p-4 gap-6">
				<PageBreadcrumb />

				<div className="flex justify-end">
					<Button
						isLoading={isLoading}
						disabled={isLoading || exists}
						onClick={createDailyRecap}
					>
						{exists ? (
							<div className="flex flex-shrink-0 gap-2 items-center">
								<CheckCircle />
								Daily Recap Done
							</div>
						) : (
							'Daily Recap'
						)}
					</Button>
				</div>

				<NoteDetail routeKey="/_authenticated/projects/$projectId/dashboard" />
			</div>

			<Todos />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/dashboard')({
	component: Dashboard,
	pendingComponent: () => <Skeleton className="w-full h-full p-4" />,
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
