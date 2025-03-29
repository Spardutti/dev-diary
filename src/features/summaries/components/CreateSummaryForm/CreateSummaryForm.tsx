import DateSelector from '@/components/Common/DateSelector';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpsertSummary } from '../../api/summaryQueries';
import { toast } from 'react-toastify';
import { DialogClose } from '@/components/ui/dialog';

interface CreateSummaryFormProps {
	setOpen: (open: boolean) => void;
}

const formSchema = z.object({
	date: z.date({ message: 'please select a date' }),
});

const CreateSummaryForm = ({ setOpen }: CreateSummaryFormProps) => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/summaries' });
	const { mutateAsync: upsertSummary, isPending: isCreatingSummary } = useUpsertSummary();

	const createSummary = async (data: z.infer<typeof formSchema>) => {
		const response = await upsertSummary({
			date: data.date.toString(),
			projectId,
		});
		if ('message' in response) {
			toast.info(response.message);
		} else {
			setOpen(false);
		}
	};
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: undefined,
		},
	});

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		createSummary(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex justify-between"
			>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<DateSelector
									date={field.value}
									setDate={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-2">
					<DialogClose>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
					<Button
						type="submit"
						isLoading={isCreatingSummary}
						disabled={isCreatingSummary}
					>
						Create
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default CreateSummaryForm;
