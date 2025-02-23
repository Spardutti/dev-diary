import { menuItems } from '@/constants/navigation';
import ProjectSelectorDropDown from '@/features/projects/components/ProjectSelectorDropdown';
import { Link, useParams } from '@tanstack/react-router';

const Sidebar = () => {
	const { projectId } = useParams({ strict: false });

	return (
		<nav className="hidden w-64 border-r border-r-separator md:block flex-shrink-0">
			<div className="grid gap-2 p-4">
				<ProjectSelectorDropDown />
				{menuItems.map(({ path, label, icon: Icon }) => (
					<Link
						preload="intent"
						key={path}
						activeProps={{ className: 'bg-hover text-text' }}
						to={path}
						params={{ projectId: projectId! }}
						className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground"
					>
						<Icon className="h-4 w-4" />
						{label}
					</Link>
				))}
			</div>
		</nav>
	);
};

export default Sidebar;
