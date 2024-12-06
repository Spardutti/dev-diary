import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/useAuth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CalendarDays, CheckSquare, LogOut, Menu, NotebookTabs } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const Header = () => {
	const { logout } = useAuth();

	return (
		<header className="sticky top-0 z-50 flex h-16 flex-shrink-0 items-center justify-between border-b border-separator bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex items-center gap-2 h-full">
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
					className="text-lg font-semibold flex gap-1 items-center"
				>
					<NotebookTabs /> DevDiary
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
