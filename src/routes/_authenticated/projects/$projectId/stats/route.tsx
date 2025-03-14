import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/projects/$projectId/stats')({
	context: () => ({
		routeTitle: 'Stats',
	}),
});
