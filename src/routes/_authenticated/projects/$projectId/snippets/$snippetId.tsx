import { Badge } from '@/components/ui/badge';
import { getSnippet } from '@/features/snippets/api/snippetApi';
import { snippetQueryKeys } from '@/features/snippets/api/snippetQueries';
import CodeBlock from '@/features/snippets/components/CodeBlock';
import SnippetActions from '@/features/snippets/components/SnippetActions';
import { createFileRoute } from '@tanstack/react-router';
import { MoreVertical } from 'lucide-react';

const RouteComponent = () => {
	const snippet = Route.useLoaderData();
	return (
		<div className="p-4 flex flex-col gap-2 flex-grow">
			<div className="flex gap-2 w-full justify-between">
				<div>
					<h1>{snippet.data.title}</h1>
					<Badge
						className="w-fit"
						variant="secondary"
					>
						{snippet.data.language}
					</Badge>
				</div>

				<SnippetActions
					trigger={<MoreVertical />}
					snippet={snippet.data}
				/>
			</div>
			<p>{snippet.data.description}</p>

			<div className="flex flex-grow">
				<CodeBlock
					showCopyIcon
					maxHeight="600"
					code={snippet.data.code}
					language={snippet.data.language}
				/>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/snippets/$snippetId')({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { queryClient } = context;
		const { snippetId } = params;
		const snippets = queryClient.ensureQueryData({
			queryKey: snippetQueryKeys.detail(snippetId),
			queryFn: () => getSnippet(snippetId),
		});

		return snippets;
	},
});
