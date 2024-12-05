import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetProjects } from '@/features/projects/api/projects';
import NewProjectForm from '@/features/projects/components/NewProjectForm/NewProjectForm';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { FaChevronDown, FaPlusCircle } from 'react-icons/fa';

const ProjectSelectorDropDown = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { data: projects } = useGetProjects();

	const closeDialog = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<FaChevronDown className="size-4" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="max-h-[400px] overflow-y-auto">
					<DropdownMenuItem>
						<DialogTrigger className="flex gap-2">
							<FaPlusCircle /> Create Project
						</DialogTrigger>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					{projects?.data.map((project) => (
						<DropdownMenuItem
							key={project.id}
							asChild
						>
							<Link
								className="w-full"
								to="/projects/$projectId/dashboard"
								params={{ projectId: project.id }}
							>
								{project.name}
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogBody closeDialog={closeDialog} />
		</Dialog>
	);
};

export default ProjectSelectorDropDown;

const DialogBody = ({ closeDialog }: { closeDialog: () => void }) => (
	<DialogContent>
		<DialogHeader>
			<DialogTitle>Create new project</DialogTitle>
			<DialogDescription>Create a new project to organize your activities</DialogDescription>
			<NewProjectForm closeDialog={closeDialog} />
		</DialogHeader>
	</DialogContent>
);
