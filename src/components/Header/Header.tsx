import { Link, useParams } from '@tanstack/react-router';
import MobileNavigation from '@/components/MobileNavigation';
import ProjectSelectorDropDown from '@/features/projects/components/ProjectSelectorDropdown';

import AvatarDropdown from '@/features/dashboard/components/AvatarDropdown';

const Header = () => {
	const { projectId } = useParams({ strict: false });

	return (
		<header className="border-b border-green-900/60 h-16 p-2 flex justify-between items-center">
			<div className="flex items-center gap-2 h-full">
				<MobileNavigation />
				<Link
					to="/projects/$projectId/dashboard"
					className="text-xl font-semibold  gap-1 items-center hidden md:flex text-glow"
					params={{ projectId: projectId! }}
				>
					<div className="flex items-center gap-2">
						<span className="text-xl font-bold tracking-wide glow-text">[</span>
						<span className="text-xl font-bold tracking-wide glow-text">DevDiary</span>
						<span className="text-xl font-bold tracking-wide glow-text">]</span>
					</div>
				</Link>

				<div className="md:hidden flex">
					<ProjectSelectorDropDown />
				</div>
			</div>
			<div className="flex items-center gap-4">
				<AvatarDropdown />
			</div>
		</header>
	);
};

export default Header;
