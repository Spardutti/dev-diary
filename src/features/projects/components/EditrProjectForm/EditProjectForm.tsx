import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateProject } from '@/features/projects/api/projectQueries';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface EditProjectFormProps {
	projectName: string;
	closeDialog: () => void;
	projectId: string;
}

const formSchema = z.object({
	projectName: z.string().min(2, {
		message: 'Project Name must be at least 2 characters.',
	}),
});

const EditProjectForm = ({ projectName, closeDialog, projectId }: EditProjectFormProps) => {
	const { mutateAsync: updateProject, isPending: isUpdatingProject } = useUpdateProject();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			projectName,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await updateProject({ name: values.projectName, id: projectId });
		closeDialog();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8"
			>
				<FormField
					control={form.control}
					name="projectName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Name</FormLabel>
							<FormControl>
								<Input
									placeholder="project name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={isUpdatingProject}
					isLoading={isUpdatingProject}
					type="submit"
				>
					Save
				</Button>
			</form>
		</Form>
	);
};

export default EditProjectForm;
