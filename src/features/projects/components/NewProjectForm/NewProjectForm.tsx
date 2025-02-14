import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useCreateProject } from '@/features/projects/api/projectQueries';
import { router } from '@/App';

const formSchema = z.object({
	projectName: z.string().min(2, {
		message: 'Project Name must be at least 2 characters.',
	}),
});

const NewProjectForm = ({ closeDialog }: { closeDialog: () => void }) => {
	const { mutateAsync: createProject, isPending: isCreatingProject } = useCreateProject();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			projectName: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await createProject({ name: values.projectName });
		closeDialog();
		router.navigate({ to: '/projects/$projectId/dashboard', params: { projectId: response.data.id } });
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
					disabled={isCreatingProject}
					isLoading={isCreatingProject}
					type="submit"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};
export default NewProjectForm;
