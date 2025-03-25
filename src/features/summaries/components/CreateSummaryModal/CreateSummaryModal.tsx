import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import CreateSummaryForm from '../CreateSummaryForm';
import { useState } from 'react';

const CreateSummaryModal = () => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Dialog
			onOpenChange={setOpen}
			open={open}
		>
			<DialogTrigger>
				<Button>Create Summary</Button>
			</DialogTrigger>
			<DialogContent className="flex flex-col gap-10">
				<DialogHeader>
					<DialogTitle> Create a summary </DialogTitle>
					<DialogDescription> You can create a daily summary of the date you choose</DialogDescription>
				</DialogHeader>
				<CreateSummaryForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
};

export default CreateSummaryModal;
