import { Button } from '@/components/ui/button';
import { getSnippets } from '@/features/snippets/api/snippetApi';
import { snippetQueryKeys } from '@/features/snippets/api/snippetQueries';
import SnippetList from '@/features/snippets/components/SnippetList';
import { createFileRoute } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { toast } from 'react-toastify';

const RouteComponent = () => {
	return (
		<div className="p-4 flex flex-col w-full gap-6">
			<div className="flex w-full justify-between">
				<h1>Snippets Vault</h1>
				{/* <Button onClick={() => navigate({ to: '/projects/$projectId/snippets/new-snippet', params: { projectId } })}> */}
				<Button onClick={() => toast.info('Snippets coming soon!')}>
					<div className="flex gap-1 items-center">
						<PlusIcon />
						New Snippet
					</div>
				</Button>
			</div>

			<SnippetList />
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/snippets/')({
	component: RouteComponent,
	loader: async ({ context }) => {
		const { queryClient } = context;

		const snippets = queryClient.ensureQueryData({
			queryKey: snippetQueryKeys.list(),
			queryFn: () => getSnippets(),
		});

		return snippets;
	},
});
