import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDeleteGithubConfig } from '@/features/profile/api/githubConfigQueries';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

const DeleteGithubConfigModal = ({ id }: { id: string }) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogTrigger>
				<Button variant="destructive">Delete Config</Button>
			</DialogTrigger>
			<DeleteGithubConfigModalContent
				id={id}
				closeDialog={() => setOpen(false)}
			/>
		</Dialog>
	);
};
export default DeleteGithubConfigModal;

interface DeleteGithubConfigModalContentProps {
	id: string;
	closeDialog: () => void;
}

export const DeleteGithubConfigModalContent = ({ id, closeDialog }: DeleteGithubConfigModalContentProps) => {
	const { mutateAsync: deleteGithubConfig, isPending } = useDeleteGithubConfig();

	const { reset } = useFormContext();

	const onDelete = async () => {
		await deleteGithubConfig({ id });
		reset({
			owner: '',
			repo: '',
			author: '',
			installationId: '',
		});
		closeDialog();
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Delete Config</DialogTitle>
				<DialogDescription>
					Are you sure you want to delete your GitHub config ?{' '}
					<span className="font-bold">This action is permanent and cant be undone </span>
				</DialogDescription>
			</DialogHeader>

			<div className="flex justify-end gap-2">
				<DialogClose asChild>
					<Button
						disabled={isPending}
						variant="ghost"
					>
						Cancel
					</Button>
				</DialogClose>
				<Button
					isLoading={isPending}
					disabled={isPending}
					variant="destructive"
					onClick={onDelete}
				>
					Yes, Delete
				</Button>
			</div>
		</DialogContent>
	);
};
