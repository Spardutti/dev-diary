import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateProject } from '@/features/projects/api/projects';
import type { IProject } from '@/features/projects/types/project';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	name: z.string().min(2, {
		message: 'Project Name must be at least 2 characters.',
	}),
});

const UpdateProjectForm = ({ project, closeDialog }: { project: IProject; closeDialog: () => void }) => {
	const { mutateAsync: updateProject, isPending: isUpdatingProject } = useUpdateProject();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: project.name,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await updateProject({ ...values, id: project.id });
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
					name="name"
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
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default UpdateProjectForm;
