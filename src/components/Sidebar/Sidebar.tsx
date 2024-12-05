import { Link, useParams } from '@tanstack/react-router';
import { CalendarDays, CheckSquare } from 'lucide-react';

const Sidebar = () => {
	const { projectId } = useParams({ strict: false });

	return (
		<nav className="hidden w-64 border-r border-r-muted-teal md:block">
			<div className="grid gap-2 p-4">
				<Link
					to="/projects/$projectId/dashboard"
					params={{ projectId: projectId! }}
					className="flex items-center gap-2 rounded-lg  px-3 py-2 text-secondary-foreground"
					activeProps={{ className: 'bg-secondary text-text-dark' }}
				>
					<CalendarDays className="h-4 w-4" />
					Today
				</Link>
				<Link
					activeProps={{ className: 'bg-secondary text-text-dark' }}
					to="/projects/$projectId/daily-notes"
					params={{ projectId: projectId! }}
					className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground"
				>
					<CheckSquare className="h-4 w-4" />
					Daily Notes
				</Link>
			</div>
		</nav>
	);
};

export default Sidebar;
