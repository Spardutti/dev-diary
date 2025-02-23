import PageBreadcrumb from '@/components/PageBreadcrumb';
import { getNote } from '@/features/notes/api/noteApi';
import { noteQueryKeys } from '@/features/notes/api/noteQueries';
import NoteDetail from '@/features/notes/components/NoteDetail';
import { createFileRoute } from '@tanstack/react-router';

const Note = () => {
	const note = Route.useLoaderData();

	return (
		<div className="flex flex-grow p-4 gap-6 flex-col">
			<PageBreadcrumb />

			<NoteDetail
				date={note.data.createdAt.toString()}
				routeKey="/_authenticated/projects/$projectId/daily-notes/$noteId"
			/>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/daily-notes/$noteId')({
	component: Note,
	loader: async ({ context, params: { noteId }, context: { queryClient } }) => {
		const response = await queryClient.ensureQueryData({
			queryKey: noteQueryKeys.detail(noteId),
			queryFn: () => getNote({ noteId }),
		});
		context.routeTitle = response.data.title;

		return response;
	},
	context: () => ({
		routeTitle: 'Note',
	}),
});
