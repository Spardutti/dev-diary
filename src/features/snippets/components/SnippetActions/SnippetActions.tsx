import { Dialog } from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DeleteSnippetModalContent } from '@/features/snippets/components/DeleteSnippetModal/DeleteSnippetModal';
import type { ISnippet } from '@/features/snippets/types/ISnippet';
import { useNavigate, useParams } from '@tanstack/react-router';
import { Edit, Trash } from 'lucide-react';
import React, { useState } from 'react';

interface SnippetActionsProps {
	trigger: React.ReactNode;
	snippet: ISnippet;
}

const SnippetActions = ({ trigger, snippet }: SnippetActionsProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState<'delete' | 'edit' | null>(null);

	const { projectId, snippetId } = useParams({ from: '/_authenticated/projects/$projectId/snippets/$snippetId/' });

	const navigate = useNavigate();

	const openDialog = (dialog: 'delete' | 'edit') => {
		setDialogOpen(dialog);
		setIsOpen(true);
	};

	const closeDialog = () => {
		setDialogOpen(null);
		setIsOpen(false);
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DropdownMenu>
				<DropdownMenuTrigger> {trigger} </DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						onClick={() =>
							navigate({ to: '/projects/$projectId/snippets/$snippetId/edit', params: { projectId, snippetId } })
						}
					>
						<Edit /> Edit
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => openDialog('delete')}
						className="w-full focus:bg-red-500 focus:text-text"
					>
						<Trash /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			{dialogOpen === 'delete' && (
				<DeleteSnippetModalContent
					snippet={snippet}
					closeDialog={closeDialog}
				/>
			)}
		</Dialog>
	);
};

export default SnippetActions;
