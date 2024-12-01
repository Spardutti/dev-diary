import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/projects/$projectId/daily-notes')({
	component: RouteComponent,
});

function RouteComponent() {
	return 'Hello /_authenticated/projects/$projectId/daily-notes!';
}
