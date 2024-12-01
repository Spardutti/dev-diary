import { Link, useParams } from '@tanstack/react-router';

const Sidebar = () => {
	const { projectId } = useParams({ strict: false });

	return (
		<div className="w-44 border-r border-r-secondary flex flex-col gap-2 p-2">
			<Link
				className="rounded px-2 py-1 transition-colors hover:bg-background-alt"
				activeProps={{ className: 'bg-primary' }}
				to="/projects/$projectId/dashboard"
				params={{ projectId: projectId! }}
			>
				Dashboard
			</Link>
			<Link
				className="rounded px-2 py-1 transition-colors hover:bg-background-alt"
				activeProps={{ className: 'bg-primary' }}
				to="/projects/$projectId/daily-notes"
				params={{ projectId: projectId! }}
			>
				Daily Notes
			</Link>
		</div>
	);
};

export default Sidebar;
