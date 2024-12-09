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
import DeleteProjectForm from '@/features/projects/components/DeleteProjectForm';
import EditProjectForm from '@/features/projects/components/EditrProjectForm';
import NewProjectForm from '@/features/projects/components/NewProjectForm/NewProjectForm';
import { Link, useParams } from '@tanstack/react-router';
import { ChevronDown, Edit3, FolderPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ProjectSelectorDropDown = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [dialogType, setDialogType] = useState<'new' | 'edit' | 'delete'>('new');

	const { projectId } = useParams({ strict: false });

	const { data: project, isPending } = useGetProject(projectId!);
	const { data: projects } = useGetProjects();

	if (isPending || !project?.data) return <div className="animate-pulse h-8 w-[120px]" />;

	const closeDialog = () => {
		setOpen(false);
		setDialogType('new');
	};

	const handleDialog = (type: 'new' | 'edit' | 'delete') => setDialogType(type);

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<span className="text-2xl  font-semibold flex items-center gap-1 bg-clip-text">
						{project.data.name} <ChevronDown className="text-white size-4" />
					</span>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="min-w-[250px] max-h-[400px] shadow-lg ml-1">
					<DropdownMenuLabel>Project Actions</DropdownMenuLabel>

					<DropdownMenuSeparator className="bg-separator" />

					<DropdownMenuItem
						className="text-text focus:bg-hover focus:text-hover-text"
						onClick={() => handleDialog('edit')}
					>
						<DialogTrigger className="flex gap-2 items-center w-full">
							<Edit3 className="mr-2 size-4" /> Edit
						</DialogTrigger>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="text-danger focus:bg-hover focus:text-hover-danger-text"
						onClick={() => handleDialog('delete')}
					>
						<DialogTrigger className="flex gap-2 items-center w-full">
							<Trash2 className="size-4" /> Delete
						</DialogTrigger>
					</DropdownMenuItem>

					<DropdownMenuSeparator className="bg-separator" />

					<DropdownMenuItem
						className="text-text focus:bg-hover focus:text-hover-text"
						onClick={() => handleDialog('new')}
					>
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

			<DialogBody
				projectId={project.data.id}
				closeDialog={closeDialog}
				dialogType={dialogType}
				projectName={project.data.name}
			/>
		</Dialog>
	);
};

export default ProjectSelectorDropDown;

const DialogBody = ({
	closeDialog,
	dialogType,
	projectName,
	projectId,
}: {
	closeDialog: () => void;
	dialogType: 'new' | 'edit' | 'delete';
	projectName: string;
	projectId: string;
}) => (
	<DialogContent>
		{dialogType === 'edit' && (
			<>
				<DialogHeader>
					<DialogTitle>Edit {projectName}</DialogTitle>
				</DialogHeader>

				<DialogDescription>Edit your project name</DialogDescription>
				<EditProjectForm
					projectId={projectId}
					projectName={projectName}
					closeDialog={closeDialog}
				/>
			</>
		)}

		{dialogType === 'new' && (
			<>
				<DialogHeader>
					<DialogTitle>Create new project</DialogTitle>
				</DialogHeader>

				<DialogDescription>Create a new project to organize your activities</DialogDescription>
				<NewProjectForm closeDialog={closeDialog} />
			</>
		)}

		{dialogType === 'delete' && (
			<>
				<DialogHeader>Are you sure you want to Delete {projectName}</DialogHeader>
				<DialogDescription>
					This action cannot be undone. This will permanently delete your project and all data associated with it.
				</DialogDescription>
				<DeleteProjectForm
					projectId={projectId}
					closeDialog={closeDialog}
				/>
			</>
		)}
	</DialogContent>
);
