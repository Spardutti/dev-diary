import { LogOut } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';
import { useLogout } from '@/features/auth/api/authQueries';
import MobileNavigation from '@/components/MobileNavigation';
import ProjectSelectorDropDown from '@/features/projects/components/ProjectSelectorDropdown';

const Header = () => {
	const { mutateAsync: logout } = useLogout();
	const { projectId } = useParams({ strict: false });

	const onLogout = async () => {
		await logout();
	};

	return (
		// <header className="sticky top-0 z-50 flex h-16 flex-shrink-0 items-center text-green-400 border-separator bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-green-900/60 p-2   justify-between  ">
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
				<div
					onClick={onLogout}
					className="text-green-400 hover:text-green-300 transition-colors cursor-pointer"
				>
					<LogOut className="h-5 w-5" />
				</div>
			</div>
		</header>
	);
};

export default Header;
