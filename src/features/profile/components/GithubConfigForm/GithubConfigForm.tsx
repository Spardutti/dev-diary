import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCreateGithubConfig, useUpdateGithubConfig } from '@/features/profile/api/githubConfigQueries';
import DeleteGithubConfigModal from '@/features/profile/components/DeleteGithubConfigModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from '@tanstack/react-router';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
	owner: z.string({ message: 'Owner is required' }).min(1, { message: 'Owner is required' }),
	repo: z
		.string({ message: 'Please specify a repository name' })
		.min(1, { message: 'Please specify a repository name' }),
	author: z.string({ message: 'Author is required' }).min(1, 'Author is required'),
	installationId: z.string({ message: 'Installation ID is required' }).min(1, 'Installation ID is required'),
});

type GithubConfigFormProps = z.infer<typeof formSchema>;

const GithubConfigForm = ({ owner, repo, author, installationId, id }: GithubConfigFormProps & { id: string }) => {
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/profile' });

	const { mutateAsync, isPending } = useCreateGithubConfig();
	const { mutateAsync: mutateAsyncUpdate, isPending: isPendingUpdate } = useUpdateGithubConfig();

	const form = useForm<GithubConfigFormProps>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			owner,
			repo,
			author,
			installationId,
		},
	});

	const onSubmit = async (values: GithubConfigFormProps) => {
		if (owner) {
			await mutateAsyncUpdate({ ...values, projectId, id });
		} else {
			await mutateAsync({
				...values,
				projectId,
			});
		}
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			<Card className="border hover:border-green-900/60  bg-black/60 backdrop-blur-sm">
				<CardHeader>
					<CardTitle className="text-green-400">GitHub Repository Configuration</CardTitle>
					<CardDescription className="text-green-500/70">
						{owner
							? 'Update or delete your GitHub repository details.'
							: 'Enter your GitHub repository details to connect with your project'}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<RepositoryConfigForm
								form={form}
								isPending={isPendingUpdate || isPending}
								owner={owner}
								id={id}
								projectId={projectId}
							/>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default GithubConfigForm;
interface RepositoryConfigFormProps {
	form: UseFormReturn<GithubConfigFormProps>;
	isPending: boolean;
	owner: string;
	id: string;
	projectId: string;
}

const RepositoryConfigForm = ({ form, isPending, owner, id, projectId }: RepositoryConfigFormProps) => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<FormField
				control={form.control}
				name="owner"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Repository Owner</FormLabel>
						<FormControl>
							<Input
								placeholder="Repo owner.."
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="repo"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Repo name</FormLabel>
						<FormControl>
							<Input
								placeholder="Repo name..."
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="author"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Commit author</FormLabel>
						<FormControl>
							<Input
								placeholder="Commit author..."
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="installationId"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Github App installation ID</FormLabel>
						<FormControl>
							<Input
								placeholder="Installation ID..."
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="flex gap-2 justify-end">
				<Button
					isLoading={isPending}
					disabled={isPending}
					type="submit"
				>
					{owner ? 'Update' : 'Save'}
				</Button>
			</div>
			{owner ? (
				<div className="flex gap-2 justify-start">
					<DeleteGithubConfigModal
						id={id}
						projectId={projectId}
					/>
				</div>
			) : null}
		</div>
	);
};
