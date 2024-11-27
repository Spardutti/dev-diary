import { Button } from '@/components/ui/button';
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
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteProject } from '@/features/projects/api/projects';
import UpdateProjectForm from '@/features/projects/components/UpdateProjectForm';
import type { IProject } from '@/features/projects/types/project';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { FaCog, FaPen, FaTrash } from 'react-icons/fa';

const ProjectManagementDropdown = ({ project }: { project: IProject }) => {
	const [open, setOpen] = useState<boolean>(false);
	const [type, setType] = useState<'edit' | 'delete'>('edit');

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
					<FaCog />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="max-h-[400px] overflow-y-auto">
					<DropdownMenuItem>
						<DialogTrigger
							className="flex gap-2"
							onClick={() => {
								setType('edit');
								setOpen(true);
							}}
						>
							<FaPen /> Edit Project
						</DialogTrigger>
					</DropdownMenuItem>

					<DropdownMenuItem className="bg-red-500 text-white items-center">
						<DialogTrigger
							className="flex gap-2"
							onClick={() => {
								setType('delete');
								setOpen(true);
							}}
						>
							<FaTrash /> Delete
						</DialogTrigger>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogBody
				closeDialog={closeDialog}
				type={type}
				project={project}
			/>
		</Dialog>
	);
};

const DialogBody = ({
	closeDialog,
	type,
	project,
}: {
	closeDialog: () => void;
	type: 'edit' | 'delete';
	project: IProject;
}) => (
	<DialogContent>
		{type === 'edit' && (
			<Edit
				closeDialog={closeDialog}
				project={project}
			/>
		)}
		{type === 'delete' && (
			<Delete
				closeDialog={closeDialog}
				projectId={project.id}
			/>
		)}
	</DialogContent>
);

interface IProjectDialog {
	closeDialog: () => void;
	projectId: string;
}

const Edit = ({ closeDialog, project }: { closeDialog: () => void; project: IProject }) => {
	return (
		<DialogHeader>
			<DialogTitle>Edit Project</DialogTitle>
			<DialogDescription>Update name or description of your project</DialogDescription>
			<UpdateProjectForm
				project={project}
				closeDialog={closeDialog}
			/>
		</DialogHeader>
	);
};

const Delete = ({ closeDialog, projectId }: IProjectDialog) => {
	const { mutateAsync: deleteProject, isPending } = useDeleteProject();
	const navigate = useNavigate();

	const onSubmit = async () => {
		const response = await deleteProject(projectId);
		navigate({ to: '/projects/$projectId/dashboard', params: { projectId: response.data.redirectTo } });
		closeDialog();
	};

	return (
		<DialogHeader>
			<DialogTitle>Delete Project</DialogTitle>
			<DialogDescription>This action is permanent</DialogDescription>
			<div className="flex justify-end gap-2">
				<Button
					disabled={isPending}
					isLoading={isPending}
					onClick={onSubmit}
					type="submit"
					variant="destructive"
				>
					Delete
				</Button>
				<Button
					disabled={isPending}
					variant="ghost"
					onClick={closeDialog}
				>
					Cancel
				</Button>
			</div>
		</DialogHeader>
	);
};

export default ProjectManagementDropdown;
