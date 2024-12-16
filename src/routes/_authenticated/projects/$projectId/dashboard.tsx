import { createFileRoute } from '@tanstack/react-router';
import Todos from '@/features/todos/components/Todos';
import NoteDetail from '@/features/dailyNotes/components/NoteDetail';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import type { IResponse } from '@/lib/axios';
import type { IDailyNote } from '@/features/dailyNotes/types/IDailyNote';

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
		const { projectId } = params;
		const { queryClient } = context;

		return await queryClient.ensureQueryData({
			queryKey: ['daily-note', projectId, 'today'],
			queryFn: () =>
				axiosHelper<IResponse<IDailyNote>>({
					method: 'get',
					url: `/daily-notes/?project_id=${projectId}&date=today`,
				}),
		});
	},
});
