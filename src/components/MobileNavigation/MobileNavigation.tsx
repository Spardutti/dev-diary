import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link, useParams } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { menuItems } from '@/constants/navigation';
import { useState } from 'react';

const MobileNavigation = () => {
	const { projectId } = useParams({ strict: false });
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Sheet
			open={isOpen}
			onOpenChange={setIsOpen}
		>
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
					{menuItems.map(({ path, label, icon: Icon }) => (
						<Link
							key={path}
							activeProps={{ className: 'bg-hover text-text' }}
							to={path}
							params={{ projectId: projectId! }}
							className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground"
							onClick={() => setIsOpen(false)}
						>
							<Icon className="h-4 w-4" />
							{label}
						</Link>
					))}
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNavigation;
