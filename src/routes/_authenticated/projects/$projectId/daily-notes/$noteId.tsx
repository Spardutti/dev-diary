import NoteDetail from '@/features/notes/components/NoteDetail';
import type { INote } from '@/features/notes/types/INote';
import { axiosHelper } from '@/lib/axios/axiosHelper';
import { createFileRoute } from '@tanstack/react-router';

const Note = () => {
	const note = Route.useLoaderData();

	return (
		<NoteDetail
			date={note.createdAt.toString()}
			routeKey="/_authenticated/projects/$projectId/daily-notes/$noteId"
		/>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/daily-notes/$noteId')({
	component: Note,
	loader: async ({ params: { noteId }, context: { queryClient } }) => {
		return await queryClient.ensureQueryData({
			queryKey: ['daily-note', noteId],
			queryFn: () => axiosHelper<INote>({ method: 'get', url: `/daily-notes/${noteId}/` }),
		});
	},
});
