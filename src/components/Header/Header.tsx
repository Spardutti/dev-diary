import { Button } from '@/components/ui/button';
import { LogOut, NotebookTabs } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';
import { useLogout } from '@/features/auth/api/authQueries';
import MobileNavigation from '@/components/MobileNavigation';

const Header = () => {
	const { mutateAsync: logout } = useLogout();
	const { projectId } = useParams({ strict: false });

	const onLogout = async () => {
		await logout();
	};

	return (
		<header className="sticky top-0 z-50 flex h-16 flex-shrink-0 items-center justify-between border-b border-separator bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex items-center gap-2 h-full">
				<MobileNavigation />
				<Link
					to="/projects/$projectId/dashboard"
					className="text-lg font-semibold flex gap-1 items-center"
					params={{ projectId: projectId! }}
				>
					<NotebookTabs /> DevDiary
				</Link>
			</div>
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={onLogout}
				>
					<LogOut className="h-5 w-5" />
				</Button>
			</div>
		</header>
	);
};

export default Header;
