import { ScrollArea } from '@/components/ui/scroll-area';
import NewSnippetForm from '@/features/snippets/components/NewSnippetForm';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
	return (
		<div className="p-4 flex flex-col flex-grow">
			<h1>New Snippet</h1>
			<ScrollArea className="h-[700px]">
				<div className="flex justify-center">
					<NewSnippetForm />
				</div>
			</ScrollArea>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/snippets/new-snippet')({
	component: RouteComponent,
});
