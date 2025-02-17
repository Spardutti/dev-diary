import { createFileRoute } from '@tanstack/react-router';
import Todos from '@/features/todos/components/Todos';
import NoteDetail from '@/features/notes/components/NoteDetail';
import { noteQueryKeys } from '@/features/notes/api/noteQueries';
import { getNote } from '@/features/notes/api/noteApi';
import type { IUser } from '@/features/auth/types/IUser';
import { logout } from '@/features/auth/api/authApi';

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

	loader: async ({ context, parentMatchPromise }) => {
		const { queryClient } = context;

		const parentData = await parentMatchPromise;
		const parentLoaderData = parentData.loaderData as { profile: IUser };

		const user = parentLoaderData.profile;
		const noteId = user?.todayNoteId ?? '';

		try {
			return await queryClient.ensureQueryData({
				queryKey: noteQueryKeys.detail(noteId),
				queryFn: () => getNote({ noteId }),
			});
		} catch (error) {
			console.log('error:', error);
			await logout();
		}
	},
});
