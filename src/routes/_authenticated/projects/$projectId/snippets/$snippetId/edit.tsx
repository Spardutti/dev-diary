import PageBreadcrumb from '@/components/PageBreadcrumb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getSnippet } from '@/features/snippets/api/snippetApi';
import { snippetQueryKeys } from '@/features/snippets/api/snippetQueries';
import EditSnippetForm from '@/features/snippets/components/EditSnippetForm';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
	const snippet = Route.useLoaderData();

	return (
		<div className="p-4 flex flex-col flex-grow gap-6">
			<PageBreadcrumb />

			<h1>New Snippet</h1>
			<ScrollArea className="h-[700px]">
				<div className="flex justify-center">
					<EditSnippetForm snippet={snippet.data} />
				</div>
			</ScrollArea>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/snippets/$snippetId/edit')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { queryClient } = context;
		const { snippetId } = params;

		const response = queryClient.ensureQueryData({
			queryKey: snippetQueryKeys.detail(snippetId),
			queryFn: () => getSnippet(snippetId),
		});

		return response;
	},
});
