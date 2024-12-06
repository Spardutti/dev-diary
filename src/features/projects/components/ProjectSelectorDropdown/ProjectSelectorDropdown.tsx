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
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetProject, useGetProjects } from '@/features/projects/api/projects';
import NewProjectForm from '@/features/projects/components/NewProjectForm/NewProjectForm';
import { Link, useParams } from '@tanstack/react-router';
import { ChevronDown, Edit3, FolderPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ProjectSelectorDropDown = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { projectId } = useParams({ strict: false });

	const { data: project, isPending } = useGetProject(projectId!);
	const { data: projects } = useGetProjects();

	if (isPending || !project?.data) return <div className="animate-pulse h-8 w-[120px]" />;

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
					<span className="text-2xl font-semibold flex items-center gap-1 bg-clip-text">
						{project.data.name} <ChevronDown className="text-white size-4" />
					</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-[250px] max-h-[400px] shadow-lg ml-1">
					<DropdownMenuLabel>Project Actions</DropdownMenuLabel>

					<DropdownMenuSeparator className="bg-separator" />

					<DropdownMenuItem className="text-text focus:bg-hover focus:text-hover-text">
						<DialogTrigger className="flex gap-2 items-center w-full">
							<Edit3 className="mr-2 size-4" /> Edit
						</DialogTrigger>
					</DropdownMenuItem>
					<DropdownMenuItem className="text-danger focus:bg-hover focus:text-hover-danger-text">
						<DialogTrigger className="flex gap-2 items-center w-full">
							<Trash2 className="size-4" /> Delete
						</DialogTrigger>
					</DropdownMenuItem>

					<DropdownMenuSeparator className="bg-separator" />

					<DropdownMenuItem className="text-text focus:bg-hover focus:text-hover-text">
						<DialogTrigger className="flex gap-2 items-center w-full">
							<FolderPlus className="mr-2 h-4 w-4" />
							<span>Create New Project</span>
						</DialogTrigger>
					</DropdownMenuItem>

					<DropdownMenuSeparator className="bg-separator" />

					<ScrollArea className="h-48">
						<DropdownMenuLabel className="text-sm font-medium text-gray-400">Switch Projects</DropdownMenuLabel>
						{projects?.data.map((project) => (
							<DropdownMenuItem
								className="focus:bg-hover focus:text-hover-text"
								key={project.id}
								asChild
							>
								<Link
									className="w-full cursor-pointer"
									to="/projects/$projectId/dashboard"
									params={{ projectId: project.id }}
								>
									{project.name}
								</Link>
							</DropdownMenuItem>
						))}
					</ScrollArea>
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
