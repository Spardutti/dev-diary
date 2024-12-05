import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/useAuth';
import ProjectSelector from '@/features/projects/components/ProjectSelector';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CalendarDays, CheckSquare, LogOut, Menu } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const Header = () => {
	const { profile, logout } = useAuth();

	return (
		<header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-muted-teal bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex items-center gap-2">
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
						>
							<Menu className="h-5 w-5" />
						</Button>
					</SheetTrigger>
					<SheetContent
						side="left"
						className="w-64"
					>
						<nav className="grid gap-2 py-4">
							<Link
								href="#"
								className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-secondary-foreground"
							>
								<CalendarDays className="h-4 w-4" />
								Today
							</Link>
							<Link
								href="#"
								className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground"
							>
								<CheckSquare className="h-4 w-4" />
								Daily Notes
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
				<Link
					href="#"
					className="text-lg font-semibold"
				>
					<ProjectSelector />
				</Link>
			</div>
			<div className="flex items-center gap-4">
				<Button
					variant="ghost"
					size="icon"
					onClick={logout}
				>
					<LogOut className="h-5 w-5" />
				</Button>
			</div>
		</header>
	);
};

export default Header;
