import NoteDetail from '@/features/dailyNotes/components/NoteDetail';
import type { IDailyNote } from '@/features/dailyNotes/types/IDailyNote';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { createFileRoute } from '@tanstack/react-router';

const Note = () => {
	const note = Route.useLoaderData();
	
	return (
		<NoteDetail
			date={note.date}
			routeKey="/_authenticated/projects/$projectId/daily-notes/$noteId"
		/>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/daily-notes/$noteId')({
	component: Note,
	loader: async ({ params: { noteId }, context: { queryClient } }) => {
		return await queryClient.ensureQueryData({
			queryKey: ['daily-note', noteId],
			queryFn: () => axiosHelper<IDailyNote>({ method: 'get', url: `/daily-notes/${noteId}/` }),
		});
	},
});
