import { useCreateSnippet } from '@/features/snippets/api/snippetQueries';
import type { ISnippet } from '@/features/snippets/types/ISnippet';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CodeBlockDemo } from '@/features/snippets/components/SnippetCard/SnippetCard';
import { useNavigate, useParams } from '@tanstack/react-router';

const formSchema: z.ZodType<Partial<ISnippet>> = z.object({
	title: z.string({ message: 'title is required' }),
	description: z.string().optional(),
	code: z.string().optional(),
	language: z.string().optional(),
});

const NewSnippetForm = () => {
	const { mutateAsync: createSnippet, isPending: isCreatingSnippet } = useCreateSnippet();
	const navigate = useNavigate();
	const { projectId } = useParams({ from: '/_authenticated/projects/$projectId/snippets/new-snippet' });

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			code: '',
			language: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await createSnippet(values);
		navigate({ to: '/projects/$projectId/snippets', params: { projectId } });
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 w-[600px] overflow-hidden"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel> Name</FormLabel>
							<FormControl>
								<Input
									placeholder="snippet name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel> Description</FormLabel>
							<FormControl>
								<Input
									placeholder="snippet description"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code block</FormLabel>
							<FormControl>
								<Textarea
									placeholder="code"
									{...field}
								/>
							</FormControl>
							<p>Code Preview</p>
							<CodeBlockDemo code={field.value || ''} />
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Language</FormLabel>
							<FormControl>
								<Input
									placeholder="language..."
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={isCreatingSnippet}
					isLoading={isCreatingSnippet}
					type="submit"
				>
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default NewSnippetForm;
