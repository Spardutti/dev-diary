import { createFileRoute } from '@tanstack/react-router';
import Todos from '@/features/todos/components/Todos';
import dayjs from 'dayjs';
import axios from 'axios';
import NoteDetail from '@/features/notes/components/NoteDetail';
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
		const { projectId } = params;
		const { queryClient } = context;

		try {
			return await queryClient.ensureQueryData({
				queryKey: noteQueryKeys.detail(dayjs().toISOString()),
				queryFn: () => getNote({ date: dayjs().toISOString(), projectId }),
			});
		} catch (error) {
			// Handle 404 errors gracefully
			if (axios.isAxiosError(error) && error.response?.status === 404) {
				return null;
			}

			throw error;
		}
	},
});
