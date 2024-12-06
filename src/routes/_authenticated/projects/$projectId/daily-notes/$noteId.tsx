import { router } from '@/App';
import NoteDetail from '@/features/dailyNotes/components/NoteDetail';
import type { IDailyNote } from '@/features/dailyNotes/types/IDailyNote';
import type { IResponse } from '@/lib/axios';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { createFileRoute } from '@tanstack/react-router';

const Note = () => {
	const note: IResponse<IDailyNote> = Route.useLoaderData();
	return <NoteDetail date={note.data.date} />;
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/daily-notes/$noteId')({
	component: Note,
	loader: async ({ params: { noteId }, context: { queryClient } }) => {
		try {
			const r = await queryClient.ensureQueryData({
				queryKey: ['daily-note', noteId],
				queryFn: () => axiosHelper<IResponse<IDailyNote>>({ method: 'get', url: `/daily-notes/${noteId}/` }),
			});

			return r;
		} catch (error) {
			router.navigate({ to: '/' });
			localStorage.removeItem('authToken');
			return error;
		}
	},
});
