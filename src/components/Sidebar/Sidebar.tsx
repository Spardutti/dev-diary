import { menuItems } from '@/constants/navigation';
import ProjectSelectorDropDown from '@/features/projects/components/ProjectSelectorDropdown';
import { Link, useParams } from '@tanstack/react-router';

const Sidebar = () => {
	const { projectId } = useParams({ strict: false });

	return (
		<nav className="hidden w-64 border-r border-r-green-900/60 md:block flex-shrink-0">
			<div className="grid gap-2 p-4">
				<ProjectSelectorDropDown />

				{menuItems.map(({ path, label, icon: Icon }) => (
					<Link
						preload="intent"
						key={path}
						activeProps={{ className: 'bg-green-900/30   border-l-4 border-green-500' }}
						to={path}
						params={{ projectId: projectId! }}
						className="flex items-center gap-3 px-4 py-2 hover:bg-green-900/20 transition-colors mb-1"
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
