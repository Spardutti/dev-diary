import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteSnippet } from '@/features/snippets/api/snippetQueries';
import type { ISnippet } from '@/features/snippets/types/ISnippet';
import { useNavigate, useParams } from '@tanstack/react-router';
import React, { useState } from 'react';

interface DeleteSnippetModalProps {
	trigger: React.ReactNode;
	snippet: ISnippet;
}

const DeleteSnippetModal = ({ trigger, snippet }: DeleteSnippetModalProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogTrigger>{trigger}</DialogTrigger>
			<DeleteSnippetModalContent
				snippet={snippet}
				closeDialog={() => setOpen(false)}
			/>
		</Dialog>
	);
};

export default DeleteSnippetModal;

interface DeleteSnippetModalContentProps {
	snippet: ISnippet;
	closeDialog: () => void;
}

export const DeleteSnippetModalContent = ({ snippet, closeDialog }: DeleteSnippetModalContentProps) => {
	const { mutateAsync: deleteSnippet, isPending } = useDeleteSnippet();
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/snippets/$snippetId/' });

	const navigate = useNavigate();

	const onDelete = async () => {
		await deleteSnippet(snippet.id);
		closeDialog();
		navigate({ to: '/projects/$projectId/snippets', params: { projectId } });
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Delete Snippet</DialogTitle>
				<DialogDescription>This action is permanent and cant be undone</DialogDescription>
			</DialogHeader>
			<p>
				Are you sure you want to delete <span className="font-bold">{snippet.title}</span> ?
			</p>

			<div className="flex justify-end gap-2">
				<DialogClose asChild>
					<Button
						disabled={isPending}
						variant="outline"
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
