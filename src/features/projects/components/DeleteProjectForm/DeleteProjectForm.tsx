import { router } from '@/App';
import { Button } from '@/components/ui/button';
import { useDeleteProject } from '@/features/projects/api/projectQueries';

interface EditProjectFormProps {
	projectId: string;
	closeDialog: () => void;
}

const DeleteProjectForm = ({ projectId, closeDialog }: EditProjectFormProps) => {
	const { mutateAsync: deleteProject, isPending: isDeletingProject } = useDeleteProject();

	const onSubmit = async () => {
		const response = await deleteProject(projectId);
		router.navigate({ to: '/projects/$projectId/dashboard', params: { projectId: response.data.project.id } });
		closeDialog();
	};

	return (
		<div className="flex justify-end gap-2">
			<Button
				disabled={isDeletingProject}
				onClick={closeDialog}
			>
				No, Cancel
			</Button>

			<Button
				disabled={isDeletingProject}
				isLoading={isDeletingProject}
				type="button"
				onClick={onSubmit}
				variant="destructive"
			>
				Yes, Delete!
			</Button>
		</div>
	);
};

export default DeleteProjectForm;
