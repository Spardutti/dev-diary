import { getNote } from '@/features/notes/api/noteApi';
import { noteQueryKeys } from '@/features/notes/api/noteQueries';
import NoteDetail from '@/features/notes/components/NoteDetail';
import { createFileRoute } from '@tanstack/react-router';

const Note = () => {
	const note = Route.useLoaderData();

	return (
		<NoteDetail
			date={note.data.createdAt.toString()}
			routeKey="/_authenticated/projects/$projectId/daily-notes/$noteId"
		/>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/daily-notes/$noteId')({
	component: Note,
	loader: async ({ params: { noteId }, context: { queryClient } }) => {
		return await queryClient.ensureQueryData({
			queryKey: noteQueryKeys.detail(noteId),
			queryFn: () => getNote({ noteId }),
		});
	},
});
