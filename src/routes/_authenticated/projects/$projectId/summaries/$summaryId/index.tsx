import CopyToClipboard from '@/components/CopyIcon';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import RichEditor from '@/components/RichTextEditor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getSummary } from '@/features/summaries/api/summaryApi';
import { summaryQueryKeys } from '@/features/summaries/api/summaryQueries';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useState } from 'react';
const RouteComponent = () => {
	const summary = Route.useLoaderData();
	const [noteContent, setNoteContent] = useState<string | undefined>(summary.data.noteContent);

	const completedTodosToString = summary.data.completedTodos.map((todo) => `- ${todo.title}`).join('\n');

	const createdTodosToString = summary.data.createdTodos.map((todo) => `- ${todo.title}`).join('\n');

	return (
		<div className="p-4 flex flex-col w-full gap-6">
			<PageBreadcrumb />
			<h1>Summary of {dayjs(summary.data.createdAt).format('dddd DD, MMM YYYY')}</h1>

			<div className="relative max-h-[400px]">
				<ScrollArea className="h-full">
					<RichEditor
						content={noteContent}
						setContent={setNoteContent}
					/>
					<div className="absolute right-5 top-2 bg-background-alt p-1 rounded">
						<CopyToClipboard
							size={20}
							value={noteContent ?? ''}
						/>
					</div>
				</ScrollArea>
			</div>

			<div className="grid grid-cols-2 gap-2">
				<div className="relative">
					<div className="flex gap-2 items-center">
						<h2>Completed Tasks</h2>
						<p>{summary.data.completedTodos.length}</p>
						<CopyToClipboard
							value={completedTodosToString}
							size={18}
						/>
					</div>
					<div className="flex flex-col gap-4">
						{summary.data.completedTodos.map((todo) => (
							<div
								key={todo.id}
								className="flex items-center gap-2"
							>
								<div className="w-4 h-4 rounded-full bg-green-500" />
								<p>{todo.title}</p>
							</div>
						))}
					</div>
				</div>

				<div>
					<div className="flex gap-2 items-center">
						<h2>Pending Tasks</h2>
						<p>{summary.data.createdTodos.length}</p>
						<CopyToClipboard
							value={createdTodosToString}
							size={18}
						/>
					</div>
					<div className="flex flex-col gap-4">
						{summary.data.createdTodos.map((todo) => (
							<div
								key={todo.id}
								className="flex items-center gap-2"
							>
								<div className="w-4 h-4 rounded-full bg-yellow-500" />
								<p>{todo.title}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const Route = createFileRoute('/_authenticated/projects/$projectId/summaries/$summaryId/')({
	component: RouteComponent,
	context: () => ({
		routeTitle: 'Summary',
	}),
	loader: async ({ context, params: { summaryId } }) => {
		const { queryClient } = context;
		const response = await queryClient.ensureQueryData({
			queryKey: summaryQueryKeys.detail(summaryId),
			queryFn: () => getSummary(summaryId),
		});

		context.routeTitle = dayjs(response.data.createdAt).format('dddd DD MMM, YYYY ');

		return response;
	},
});
