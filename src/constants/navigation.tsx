import { CalendarDays, CheckSquare, Code, NotebookPen } from 'lucide-react';

export const menuItems = [
	{
		label: 'Today',
		icon: CalendarDays,
		path: '/projects/$projectId/dashboard',
	},
	{
		label: 'Daily Notes',
		icon: CheckSquare,
		path: '/projects/$projectId/daily-notes',
	},
	{
		label: 'Todos',
		icon: NotebookPen,
		path: '/projects/$projectId/todos',
	},
	{
		label: 'Snippets',
		icon: Code,
		path: '/projects/$projectId/snippets',
	},
] as const;
